import MySign from "@/components/sign/MySign"
import { useRef, useState, useEffect } from "react"
// import LastIcon from "@/components/svg/Last"
// import NextIcon from "@/components/svg/Next"
import ArrowIcon from "@/components/svg/Arrow"
import FabricPage from "@/components/sign/FabricPage"
import { useAtom } from "jotai"
import { pdfAtom, stepAtom, setPdfCombinePage, signToPdfAtom, setOutputDocumentArr } from '@/store/index'
const StartSign = () => {
  const [pdf] = useAtom(pdfAtom)
  const [step] = useAtom(stepAtom)
  const [signToPdf] = useAtom(signToPdfAtom)
  const [, displayOutputDocumentArr] = useAtom(setOutputDocumentArr)
  const [, displayPdfCombinePage] = useAtom(setPdfCombinePage)
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const fabricContainerRef = useRef<HTMLDivElement | null>(null)
  const [pdfArr, setPdfArr] = useState<{page: number, imageUrl: string, isEdit: boolean}[]>([])
  const [isDeleteClick, setIsDeleteClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  let isRenderPdfArrLoading = false
  // 順序
  // 1. 顯示pdf頁
  // 2. 點擊新增簽名，將pdf轉圖給fabric當基底
  // useEffect(() => {
  //   handleRenderPdfPage()
  // }, [pdf, currentPage])
  // 建立主要的canvas
  
  useEffect(() => {
    if(signToPdf !== null && signToPdf.page !== 0) {
      console.log("signtopdf", signToPdf)
      // 更新pdfArr的page為編輯過
      // 到fabric component把背景還有sign都渲染出來
      const newPdfArr = pdfArr.map((v, i) => {
        if(v.page === signToPdf.page) {
          v.isEdit = true
        }
        return v
      })
      setPdfArr(newPdfArr)
    }
  }, [signToPdf])
  useEffect(() => {
    if(pdfCanvasRef !== null) {
      const c = pdfCanvasRef.current
      setCanvas(c)
      if(c) setCtx(c.getContext("2d"))
    }
  }, [pdfCanvasRef])

  useEffect(() => {
    // 每次換頁渲染一次canvas
    if(step === 3 && pdfArr.length === pdf?._pdfInfo.numPages) {
      console.log("rwrwrw")
      if(!currentPage)setCurrentPage((prev) => prev + 1)
      handleRenderPdfPage(currentPage)
    }
    displayPdfCombinePage({page: currentPage})
  }, [step, currentPage, isLoading])

  useEffect(() => {
    if(step === 3 && !pdfArr.length) {
      // setIsLoading(true)
      // 把全部渲染出來
      for(let page = 1 ; page <= pdf?._pdfInfo.numPages; page++) {
        console.log("yyy", isRenderPdfArrLoading)
        if(!isRenderPdfArrLoading) {
          handleRenderPdfPage(page)
        }
      }
    }
  }, [step])

  // 跑完渲染pdfArr，把頁面賦歸到第一頁
  useEffect(() => {
    if(pdfArr.length === pdf?._pdfInfo.numPages) {
      handleRenderPdfPage(1)
      console.log("finish render", pdfArr)
    }
  }, [pdfArr])

  const handleRenderPdfPage = (page: number) => {
    if(pdf) {
      console.log("pdf info", pdf)
      const realPage = page ? page : currentPage
      pdf.getPage(realPage).then(function (page) {
        setIsLoading(true)
        isRenderPdfArrLoading = true
        console.log('page loaded', realPage)
        const scale = 1
        const viewport = page.getViewport({ scale })
        // Prepare canvas using PDF dimensions
        if(canvas && ctx) {
          console.log('check viewport', viewport)
          canvas.height = viewport.height
          canvas.width = viewport.width
          const renderContext = {
            canvasContext: ctx,
            viewport
          }
          page.render(renderContext).promise.then(function() {
            const bg = canvas.toDataURL("image/png")
            const isPageExist = pdfArr.find(i => i.page === currentPage)
            console.log("ppp", realPage && !isPageExist)
            // 還要檢查如果到最後一步時沒有翻頁到後面頁數，要把他加進outputDocumentArr
            // 感覺一開始全部加進去表較省事
            if(pdfArr.length !== pdf?._pdfInfo.numPages) {
              console.log("eeee", realPage, pdf?._pdfInfo.numPages)
              const outputObj = {
                page: realPage,
                imageUrl: bg
              }
              displayOutputDocumentArr({document: outputObj})
              setPdfArr((prev) => (
                [
                  ...prev,
                  {
                    page: realPage,
                    imageUrl: bg,
                    isEdit: false
                  }
                ]
              ))
              setIsLoading(false)
              isRenderPdfArrLoading = false
            }
          })
        }
      })
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

  const handleDeleteSign = (canvas: any) => {
    setIsDeleteClick(true)
    const timer = setTimeout(() => {
      setIsDeleteClick(false)
      clearTimeout(timer)
    },100)
  }
  return (
    <section className="flex flex-col lg:flex-row lg:justify-center mx-auto mt-[40px] w-[80%] max-w-[586px] lg:max-w-[1000px]">
      <MySign type="allowSelect" />
      <div className="flex-grow ml-[40px]">
        <h4 className="text-[#4F4F4F]">簽署文件</h4>
        <span className="text-[#828282]">將左方簽名檔拖移置簽署文件中並調整位置與大小</span>
        <div className="flex flex-col w-full h-[780px] pt-[16px] px-[42px] pb-[22px] mt-[20px] bg-white rounded-[5px]">
          <div className="flex-none flex justify-end h-[32px] mb-[12px]">
            {/* <button className={`flex-center w-[32px] h-[32px] rounded-[5px] text-[#BDBDBD] bg-[#F2F2F2]`}><LastIcon /></button>
            <button className={`flex-center w-[32px] h-[32px] ml-[12px] rounded-[5px] text-[#BDBDBD]`}><NextIcon /></button> */}
            <button onClick={handleDeleteSign} className={`flex-center w-[60px] h-[32px] ml-[12px] text-[14px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]`}>清除</button>
          </div>
          <div ref={fabricContainerRef} className="flex-grow w-full h-full border border-[#E0E0E0] overflow-auto">
            {/* 每個頁面做成fabric.js的component，然後在最外層做隱藏或顯示 */}
            <canvas className={pdfArr.find(v => v.page === currentPage)?.isEdit === true ? 'hiddenSection' : ''} ref={pdfCanvasRef}></canvas>
            {Array.from(Array(pdf?._pdfInfo.numPages).keys()).map(i => (
              <div className={pdfArr.find(v => v.page === i+1)?.isEdit === true && currentPage === i+1 ? '' : 'hiddenSection'}>
                <FabricPage 
                  isDeleteClick={isDeleteClick} 
                  page={i+1} 
                  bgImage={pdfArr.find(v => v.page === i+1 && v.isEdit)?.imageUrl} 
                  isEdit={pdfArr.find(v => v.page === i+1)?.isEdit}
                />
              </div>
            ))}
          </div>
          <div className="flex-none flex justify-center mt-[18px]">
          {currentPage ? <button onClick={() => handleSwitchPage('last')} className={`${(currentPage > 1 && pdf?._pdfInfo.numPages !== 1) ? 'text-[#787CDA]' : 'text-[#BDBDBD]'}`}><ArrowIcon/></button> : ''}
              {currentPage ?<div className="h-[31px] mb-[10px] mx-[24px] leading-[38px] text-[14px] text-[#828282]">{currentPage} / {pdf && pdf._pdfInfo.numPages}</div> : ''}
              {currentPage ? <button onClick={() => handleSwitchPage('next')} className={`${currentPage < pdf?._pdfInfo.numPages ? 'text-[#787CDA]' : 'text-[#BDBDBD]'} rotate-180`}><ArrowIcon/></button> : ''}
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default StartSign