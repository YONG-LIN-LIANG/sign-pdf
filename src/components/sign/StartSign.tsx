import MySign from "@/components/sign/MySign"
import { useRef, useState, useEffect } from "react"
import LastIcon from "@/components/svg/Last"
import NextIcon from "@/components/svg/Next"
import ArrowIcon from "@/components/svg/Arrow"
import FabricPage from "@/components/sign/FabricPage"
import { useAtom } from "jotai"
import { pdfAtom, stepAtom } from '@/store/index'
import { fabric } from "fabric"
const StartSign = () => {
  const [pdf] = useAtom(pdfAtom)
  const [step] = useAtom(stepAtom)
  // const [canvasList, setCanvasList] = useState<(fabric.Canvas | null)[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const mainRef = useRef<HTMLCanvasElement | null>(null)
  const fabricContainerRef = useRef<HTMLDivElement | null>(null)
  // 順序
  // 1. 顯示pdf頁
  // 2. 點擊新增簽名，將pdf轉圖給fabric當基底
  // useEffect(() => {
  //   handleRenderPdfPage()
  // }, [pdf, currentPage])
  // 建立主要的canvas
  useEffect(() => {
    if(mainRef !== null) {
      console.log("ppp", mainRef)
    }
  }, [mainRef])

  // useEffect(() => {
  //   console.log("yyy", canvasList)
  // }, [canvasList])

  const handleSelectSign = (imageUrl: string) => {
    console.log("current image", imageUrl)
  }
  const handleRenderPdfPage = () => {
    console.log('pdf instance', pdf)
    if(pdf) {
      console.log("pdf info", pdf)
      const totalPage = pdf._pdfInfo.numPages

      // pdf.getPage(currentPage).then(function (page) {
      //   console.log('page loaded')
      //   const scale = 0.5
      //   const viewport = page.getViewport({ scale: scale})
      //   // console.log(canvas, ctx, canvas && ctx)
      //   // Prepare canvas using PDF dimensions
      //   if(canvas && ctx) {
      //     console.log('check viewport', viewport)
      //     canvas.height = viewport.height
      //     canvas.width = viewport.width
      //     // Render PDF page into canvas context
      //     const renderContext = {
      //       canvasContext: ctx,
      //       viewport
      //     }
      //     const renderTask = page.render(renderContext)
      //     renderTask.promise.then(function () {
      //       console.log('page rendered')
      //       setPdfLoading(false)
      //     })
      //   }
      // })
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
    <section className="flex flex-col lg:flex-row lg:justify-center mx-auto mt-[40px] w-[80%] max-w-[586px] lg:max-w-[1000px]">
      <MySign type="allowSelect" onSelectSign={handleSelectSign} />
      <div className="flex-grow ml-[40px]">
        <h4 className="text-[#4F4F4F]">簽署文件</h4>
        <span className="text-[#828282]">將左方簽名檔拖移置簽署文件中並調整位置與大小</span>
        <div className="flex flex-col w-full h-[780px] pt-[16px] px-[42px] pb-[22px] mt-[20px] bg-white rounded-[5px]">
          <div className="flex-none flex justify-end h-[32px] mb-[12px]">
            <button className={`flex-center w-[32px] h-[32px] rounded-[5px] text-[#BDBDBD] bg-[#F2F2F2]`}><LastIcon /></button>
            <button className={`flex-center w-[32px] h-[32px] ml-[12px] rounded-[5px] text-[#BDBDBD]`}><NextIcon /></button>
            <button className={`flex-center w-[60px] h-[32px] ml-[12px] text-[14px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]`}>清除</button>
          </div>
          <div ref={fabricContainerRef} className="flex-grow w-full h-full border border-[#E0E0E0]">
            {/* 每個頁面做成fabric.js的component，然後在最外層做隱藏或顯示 */}
            {/* <canvas ref={}></canvas> */}
            {Array.from(Array(pdf?._pdfInfo.numPages).keys()).map(i => (
              <div className={currentPage === i+1 ? '' : 'hiddenSection'}>

                <FabricPage page={i+1} />
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