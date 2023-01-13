import { useRef, useState, useEffect } from "react"
import { useAtom } from "jotai"
import { pdfAtom, outputDocumentArr, stepAtom, setPdfCombinePage, signToPdfAtom, setOutputDocumentArr } from '@/store/index'

const CanvasPreview = ({page, currentPage}:{page:number, currentPage:number}) => {
  const [pdf] = useAtom(pdfAtom)
  const [outputArr] = useAtom(outputDocumentArr)
  const [, displayOutputDocumentArr] = useAtom(setOutputDocumentArr)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  useEffect(() => {
    if(previewCanvasRef !== null) {
      const c = previewCanvasRef.current
      setCanvas(c)
      if(c) setCtx(c.getContext("2d"))
    }
  }, [previewCanvasRef])
  useEffect(() => {
    // console.log('test', page, currentPage)
    if(page === currentPage) handleRenderPdfPage()
  }, [currentPage])

  const handleRenderPdfPage = () => {
    if(pdf) {
      const realPage = page
      pdf.getPage(realPage).then(function (page) {
        // console.log('page loaded', realPage)
        const scale = 1
        const viewport = page.getViewport({ scale })
        // Prepare canvas using PDF dimensions
        if(canvas && ctx) {
          // console.log('check viewport', viewport)
          canvas.height = viewport.height
          canvas.width = viewport.width
          const renderContext = {
            canvasContext: ctx,
            viewport
          }
          page.render(renderContext).promise.then(function() {
            const bg = canvas.toDataURL("image/png")
            // console.log("ppp", realPage)
            if(outputArr.length !== pdf?._pdfInfo.numPages) {
              // console.log("eeee", realPage, pdf?._pdfInfo.numPages)
              const outputObj = {
                page: realPage,
                isEdit: false,
                imageUrl: bg
              }
              displayOutputDocumentArr({document: outputObj})
            }
          })
        }
      })
    }
  }

  return <canvas ref={previewCanvasRef}></canvas>
}

export default CanvasPreview