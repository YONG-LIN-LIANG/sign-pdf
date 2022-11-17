import TrashcanIcon from "@/components/svg/Trashcan"
import UploadIcon from "@/components/svg/Upload"
import { useRef, useState } from "react"
const UploadArea = () => {
  const fileDivRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const thumbnailRef = useRef<HTMLImageElement | null>(null)
  const [draggingFile, setDraggingFile] = useState<boolean>(false)
  const [uploadFile, setUploadFile] = useState(null)
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | ArrayBuffer>('')
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
    const allowExtension = ['png', 'jpg']
    console.log('drop', e.dataTransfer.files)
    const extensionArr = e.dataTransfer.files[0].name.split(".")
    const extension = extensionArr[extensionArr.length - 1]
    console.log(extension)
    if(!allowExtension.includes(extension)) {
      setDraggingFile(false)
      fileDivRef.current?.classList.remove('dragover')
      alert("只允許使用png, jpg圖檔")
      return
    }
    if(fileInputRef.current !== null) {
      fileInputRef.current.files = e.dataTransfer.files
      console.log(fileInputRef.current.files)
      setUploadFile(e.dataTransfer.files[0])
      handleFileImage(e.dataTransfer.files[0])
    }
    if(fileDivRef !== null) {
      setDraggingFile(false)
      fileDivRef.current?.classList.remove('dragover')
    }
  }
  const onFileDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('get file')
    const newFile = e.target.files[0]
    setUploadFile(newFile)
    handleFileImage(newFile)
    console.log(newFile)
  }
  const handleFileImage = (file: any) => {
    console.log('deal file image')
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      if(fileReader.result) {
        setFilePreviewUrl(fileReader.result)
        if(thumbnailRef.current) thumbnailRef.current.src = fileReader.result.toString()
      }
    }
    console.log('hhh', file)
    if (file) {
      fileReader.readAsDataURL(file)
    }
    
    if(thumbnailRef !== null) {
      console.log(thumbnailRef, fileReader.result)
      // thumbnailRef.current.src = fileReader.result
    }
  }
  return (
    <>
      <div 
        ref={fileDivRef} 
        className="flex flex-col justify-center items-center w-full h-[245px] border border-[#fff] bg-[#FFFFFF80] rounded-[5px] select-none"
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
          <span>檔案格式png／jpg</span>
          <span>檔案大小＜1MB</span>
        </div>
        <input ref={fileInputRef} type="file" accept=".png, .jpg" className="absolute -z-[10]" onChange={onFileDrop} />
      </div>

      <h4 className="mt-[32px] mb-[20px] text-[#4F4F4F]">預覽簽名檔</h4>
      <div className="flex-center">
        {
          uploadFile 
          ? <div className="flex-center w-[200px] h-[120px] border">
            <img ref={thumbnailRef} src="" className="object-contain w-full h-full" />
          </div>
          : <div className="flex flex-col items-center text-[#595ED3]">
          <TrashcanIcon />
          <span className="mt-[12px]">請上傳檔案</span>
        </div>
        }
        
      </div>
    </>
  )
}

export default UploadArea