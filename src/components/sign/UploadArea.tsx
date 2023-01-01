import TrashcanIcon from "@/components/svg/Trashcan"
import UploadIcon from "@/components/svg/Upload"
import { useRef, useState, useEffect, createContext } from "react"
import { pdfjs } from "react-pdf"
import { PDFDocumentProxy } from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
interface FormError {
  signName?: boolean;
  drawingBoard?: boolean;
  uploadArea?: boolean;
}
interface Props {
  uploadType: string
  onUploadSign: Function, 
  isClearUploadFile: boolean, 
  formError: FormError, 
  isButtonClick: boolean
}

const UploadArea = ({ uploadType, onUploadSign, isClearUploadFile, formError, isButtonClick }: Props) => {
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileDivRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const thumbnailRef = useRef<HTMLImageElement | null>(null)
  const [draggingFile, setDraggingFile] = useState<boolean>(false)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [uploadFileType, setUploadFileType] = useState('')
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pdfLoading, setPdfLoading] = useState<boolean>(false)
  useEffect(() => {
    console.log('latest pdf', pdf)
    setPdfLoading(true)
    handleRenderPdfPage()
  }, [pdf, currentPage]);

  useEffect(() => {
    if(uploadFileType.includes('pdf') || pdfCanvasRef !== null) {
      const c = pdfCanvasRef.current
      setCanvas(c)
      if(c) setCtx(c.getContext("2d"))
    }
  }, [uploadFileType, pdfCanvasRef]);

  useEffect(() => {
    console.log('fff', formError)
  }, [formError])
  useEffect(() => {
    console.log('iii', isClearUploadFile)
    if(isClearUploadFile) {
      setUploadFileType('')
      if(thumbnailRef.current) {
        thumbnailRef.current.src = ""
      }
    }
  }, [isClearUploadFile])
  const onDragEnter = () => {
    if(fileDivRef !== null) {
      setDraggingFile(true)
      fileDivRef.current?.classList.add('dragover')
    }
  }
  const onDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const onDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('leave')
    if(fileDivRef !== null) {
      setDraggingFile(false)
      fileDivRef.current?.classList.remove('dragover')
    }
  }
  const onDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const allowExtension = ['png', 'jpg', 'pdf']
    console.log('drop', e.dataTransfer.files)
    const extensionArr = e.dataTransfer.files[0].name.split(".")
    const extension = extensionArr[extensionArr.length - 1]
    console.log(extension)
    if(!allowExtension.includes(extension)) {
      setDraggingFile(false)
      fileDivRef.current?.classList.remove('dragover')
      alert("只允許使用png, jpg, pdf圖檔")
      return
    }
    if(fileInputRef.current !== null) {
      fileInputRef.current.files = e.dataTransfer.files
      console.log(fileInputRef.current.files)
      setUploadFileType(e.dataTransfer.files[0].type)
      handleFileImage(e.dataTransfer.files[0])
    }
    if(fileDivRef !== null) {
      setDraggingFile(false)
      fileDivRef.current?.classList.remove('dragover')
    }
  }
  const onFileDrop = (e: any) => {
    e.preventDefault()
    console.log('get file')
    const newFile = e.target.files[0]
    console.log('newfileee', newFile)
    handleFileImage(newFile)
  }

  const handleRenderPdfPage = () => {
    console.log('pdf instance', pdf)
    if(pdf) {
      pdf.getPage(currentPage).then(function (page) {
        console.log('page loaded')
        const scale = 0.5
        const viewport = page.getViewport({ scale: scale})
        console.log(canvas, ctx, canvas && ctx)
        // Prepare canvas using PDF dimensions
        if(canvas && ctx) {
          console.log('check viewport', viewport)
          canvas.height = viewport.height
          canvas.width = viewport.width
          // Render PDF page into canvas context
          const renderContext = {
            canvasContext: ctx,
            viewport
          }
          const renderTask = page.render(renderContext)
          renderTask.promise.then(function () {
            console.log('page rendered')
            setPdfLoading(false)
          })
        }
      })
    }
  }

  const handleFileImage = (file: any) => {
    console.log('deal file image', file)
    const fileReader = new FileReader()
    file.type.includes("pdf") ? fileReader.readAsArrayBuffer(file) : fileReader.readAsDataURL(file)
    fileReader.onload = function () {
      console.log('check', this.result, thumbnailRef.current, file.type.includes("image"))
      if(this.result) {
        setUploadFileType(file.type)
        if(file.type.includes("pdf")) {
          console.log('lll', typeof(this.result))
          // 這個型別搞很久
          const pdfData = new Uint8Array(this.result as ArrayBuffer)
          console.log('uuu', pdfData)
          const loadingTask = pdfjs.getDocument(pdfData)
          console.log('xxx', loadingTask)
          loadingTask.promise.then(
            function (pdf) {
              console.log("PDF loaded", pdf)
              setPdf(pdf)
              setCurrentPage(1)
            },
            function (reason) {
              // PDF loading error
              console.log(reason)
            }
          )
        }
        else if(file.type.includes("image") && thumbnailRef.current) {
          thumbnailRef.current.src = this.result.toString()
          onUploadSign(this.result.toString())
          console.log('urll', this.result.toString())
        }
      }
    }
  }
  const handleSwitchPage = (direction: string) => {
    const totalPage = pdf?._pdfInfo.numPages
    if(direction === 'next' && currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1)
    } else if(direction === 'last' && (currentPage > 1 && totalPage !== 1)){
      setCurrentPage((prevState) => prevState - 1)
    }
  }
  return (
    <>
      <div 
        ref={fileDivRef} 
        className={`flex flex-col justify-center items-center w-full h-[245px] border bg-[#FFFFFF80] rounded-[5px] select-none ${!formError.uploadArea && isButtonClick ? 'border-[#f00]' : 'border-[#fff]'}`}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="text-[#787CDA]">
          <UploadIcon />
        </div>
        <span className="mt-[12px] mb-[8px]">拖曳至此上傳</span>
        { !draggingFile && <span>或</span>}
        { !draggingFile && <button onClick={() => fileInputRef.current?.click()} className="w-[86px] h-[32px] mt-[8px] mb-[20px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]">選擇檔案</button> }
        <div className="flex flex-col text-[12px] text-[#595ED3]">
          <span>檔案格式 {uploadType}</span>
          <span>檔案大小 ＜1MB</span>
        </div>
        <input ref={fileInputRef} type="file" accept=".png, .jpg, application/pdf" className="absolute -z-[10]" onChange={onFileDrop} />
      </div>

      <h4 className="mt-[32px] mb-[20px] text-[#4F4F4F]">{uploadType === 'pdf' ? '預覽文件' : '預覽簽名檔'}</h4>
      <div className="flex-center">
        <div  className={uploadFileType.includes('pdf') ? '' : 'invisible absolute -z-[10]'}>
          {currentPage ?<div className="mb-[10px] text-center">{currentPage} / {pdf && pdf._pdfInfo.numPages}</div> : ''}
          <div className="flex items-center">
            {currentPage ? <button onClick={() => handleSwitchPage('last')}>Left</button> : ''}
            <div className="flex-center w-full h-full max-w-[500px] min-h-[400px] mx-[20px]">
              <canvas className={!pdfLoading ? '' : 'invisible absolute -z-[10]'} ref={pdfCanvasRef} width="500" height="500"></canvas>
              {pdfLoading && <div className="w-full h-full">Loading...</div>}
            </div>
            {currentPage ? <button onClick={() => handleSwitchPage('next')}>Right</button> : ''}
          </div>
        </div>

        <div className={uploadFileType.includes('image') ? 'flex-center w-[200px] h-[120px] border' : 'invisible absolute -z-[10]'}>
          <img ref={thumbnailRef} src="" className="object-contain w-full h-full" />
        </div>
        
        {
          !uploadFileType && (
            <div className="flex flex-col items-center text-[#595ED3]">
            <TrashcanIcon />
            <span className="mt-[12px]">請上傳檔案</span>
            </div>
          )
        }
      </div>
    </>
  )
}

export default UploadArea