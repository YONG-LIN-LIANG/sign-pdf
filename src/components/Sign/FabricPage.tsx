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

  // 目前到第幾階段
  const [step] = useAtom(stepAtom)
  useEffect(() => {
    if(canvas) {
      canvas.on('path:created', function(event) {
        //log the svg path  info
       console.log(event);
    })
    }
  }, [canvas])
  // 建立fabric canvas
  useEffect(() => {
    setCanvas(
      new fabric.Canvas(fabricRef.current, { preserveObjectStacking:true })
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
    console.log("rrrrrr", signToPdf?.page, page)
    if(signToPdf?.page === page) {
      const { imageUrl } = signToPdf
      console.log("imageUrl", imageUrl)
      if(canvas) {
        // 新增簽名至fabric canvas
        fabric.Image.fromURL(imageUrl, (img) => {
          img.scaleToWidth(200)
          img.scaleToHeight(200)
          img.on('mouseup', function() {
            console.log('mouse up');
            handleUpdateDocumentArr()
          });
          canvas.add(img)
          canvas.renderAll();
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
    console.log("here??????")
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
    <canvas ref={fabricRef} className="w-full h-full"></canvas>
  )
}

export default FabricPage