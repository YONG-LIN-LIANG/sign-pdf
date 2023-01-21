import { fabric } from "fabric"
import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react"
import { useAtom } from "jotai"
import { stepAtom, signToPdfAtom, setOutputDocumentArr } from '@/store/index'

const FabricPage = ({isDeleteClick, page, bgImage, isEdit}:{isDeleteClick:boolean, page:number, bgImage: string | undefined, isEdit: boolean | undefined}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const fabricRef = useRef<HTMLCanvasElement | null>(null)
  const [originalBgImage, setOriginalBgImage] = useState<string>("")
  // 目前要新增的簽名
  const [signToPdf] = useAtom(signToPdfAtom)
  const [, displayOutputDocumentArr] = useAtom(setOutputDocumentArr)

  // 建立fabric canvas
  useEffect(() => {
    setCanvas(
      new fabric.Canvas(fabricRef.current, { containerClass: "myClass" })
    )
  }, [fabricRef])

  // 當fabric canvas及文件圖載入後把文件背景圖放到canvas中並設定canvas尺寸為文件圖片尺寸
  useEffect(() => {
    // 設定isEdit為true時，第一時間的bgImage暫存起來
    if(isEdit && bgImage && !originalBgImage) {
      setOriginalBgImage(bgImage)
    }
    if(originalBgImage) {
      fabric.Image.fromURL(originalBgImage, (img: fabric.Image) => {
        canvas?.setBackgroundImage(originalBgImage, () => canvas.renderAll())
        const width = img.width
        const height = img.height
        if(width && height) {
          // 設定canvas尺寸
          canvas?.setDimensions({width, height})
        }
      })
    }
  }, [canvas, originalBgImage, bgImage])

  // 新增簽名到fabric canvas
  useEffect(() => {
    if(signToPdf?.page === page) {
      const { imageUrl } = signToPdf
      if(canvas) {
        // 新增簽名至fabric canvas
        // const canvasCenter = canvas.getCenter()
        fabric.Image.fromURL(imageUrl, (img) => {
          img.scaleToWidth(200)
          img.scaleToHeight(200)
          img.set({
            // left: canvasCenter.left,
            // top: canvasCenter.top,
            // selectable: true,
            // hasBorders: false,
            // originX: 'center',
            // originY: 'center'
            
          })
          img.on('mouseup', function() {
            handleUpdateDocumentArr()
          });
          canvas.add(img).renderAll()
        })
      }
    }
  }, [signToPdf])

  useEffect(() => {
    if(isDeleteClick) {
      handleDeleteSign()
    }
  }, [isDeleteClick])
  
  const handleDeleteSign = () => {
    const selectedObj = canvas?.getActiveObject()
    selectedObj && canvas?.remove(selectedObj)
  }
  
  const handleUpdateDocumentArr = () => {
    if(canvas) {
      const imageUrl = canvas.toDataURL({format: "jpg"})
      // 每 mouseup 就將canvas輸出成圖片放到陣列裡找到page
      const outputObj = {
        page,
        isEdit: true,
        imageUrl 
      }
      displayOutputDocumentArr({document: outputObj})
    }
    
  }
  return (
    <canvas ref={fabricRef}></canvas>
  )
}

export default FabricPage