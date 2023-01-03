import MySign from "@/components/sign/MySign"
import { useRef, useState, useEffect } from "react"
import LastIcon from "@/components/svg/Last"
import NextIcon from "@/components/svg/Next"
import { useAtom } from "jotai"
import { pdfAtom } from '@/store/index'
import { fabric } from "fabric"
const StartSign = () => {
  const [pdf] = useAtom(pdfAtom)
  const [canvasList, setCanvasList] = useState<fabric.Canvas | null[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const mainRef = useRef<(HTMLCanvasElement | null)[]>([])
  // 填上pdf圖到canvas裡，所以每次換頁時都會填一次，應該可以直接在handleRenderPdfPage function處理
  useEffect(() => {
    handleRenderPdfPage()
  }, [pdf, currentPage])
  // 建立主要的canvas
  useEffect(() => {
    if(mainRef !== null) {
      // const c = new fabric.Canvas(mainRef.current)
      // setCanvas(c)
    }
  }, [mainRef])

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
  return (
    <section className="flex flex-col lg:flex-row lg:justify-center mx-auto mt-[40px] w-[80%] max-w-[586px] lg:max-w-[1000px]">
      <MySign type="allowSelect" onSelectSign={handleSelectSign} />
      <div className="flex-grow ml-[40px]">
        <h4 className="text-[#4F4F4F]">簽署文件</h4>
        <span className="text-[#828282]">將左方簽名檔拖移置簽署文件中並調整位置與大小</span>
        <div className="w-full h-[780px] mt-[20px] bg-white rounded-[5px]">
          <div>
          {
            <div className="flex absolute top-[14px] right-[14px]">
              {/* <button className={`flex-center w-[32px] h-[32px] rounded-[5px] ${recordIndex === 0 ? 'text-[#BDBDBD] bg-[#F2F2F2]' : 'text-[#787CDA] bg-[#E9E1FF]'}`}><LastIcon /></button>
              <button className={`flex-center w-[32px] h-[32px] ml-[12px] rounded-[5px] ${!(recordDrawPath.length > 1 && recordIndex < recordDrawPath.length - 1) ? 'text-[#BDBDBD] bg-[#F2F2F2]' : 'text-[#787CDA] bg-[#E9E1FF]'}`}><NextIcon /></button>
              <button className={`flex-center w-[60px] h-[32px] ml-[12px] text-[14px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]`} onClick={() => handleClear()}>清除</button> */}
            </div>
          }
          </div>
          {Array.from(Array(pdf?._pdfInfo.numPages).keys()).map((v, i) => (
            <canvas ref={el => (mainRef.current[i] = el)} width="300" height="300" className="bg-[#f00]"></canvas>
          ))}
          
        </div>
      </div>
    </section>
  )
}

export default StartSign