import { fabric } from "fabric"
import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react"
import { useAtom } from "jotai"
import { stepAtom, signToPdfAtom, setOutputDocumentArr } from '@/store/index'
import { KeyboardEvent } from "@/utils/type"
const FabricPage = ({isDeleteClick, page, bgImage, isEdit}:{isDeleteClick:boolean, page:number, bgImage: string | undefined, isEdit: boolean | undefined}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const fabricRef = useRef<HTMLCanvasElement | null>(null)
  // 目前要新增的簽名
  const [signToPdf] = useAtom(signToPdfAtom)
  const [, displayOutputDocumentArr] = useAtom(setOutputDocumentArr)
  useEffect(() => {
    if(isEdit) {
      handleUpdateDocumentArr()
    }
  }, [isEdit, bgImage])
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
    // displayCanvas(
    //   {canvas: new fabric.Canvas(fabricRef.current, { preserveObjectStacking:true })}
    // )
  }, [fabricRef])
  // 當fabric canvas及文件圖載入後把文件背景圖放到canvas中並設定canvas尺寸為文件圖片尺寸
  useEffect(() => {
    if(bgImage) {
      fabric.Image.fromURL(bgImage, (img: fabric.Image) => {
        canvas?.setBackgroundImage(bgImage, () => canvas.renderAll())
        const width = img.width
        const height = img.height
        if(width && height) {
          // 設定canvas尺寸
          canvas?.setDimensions({width, height})
        }
      })
    }
  }, [canvas, bgImage])

  // 新增簽名到fabric canvas
  useEffect(() => {
    if(signToPdf?.page === page) {
      const { imageUrl } = signToPdf
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
    if(canvas) {
      const imageUrl = canvas.toDataURL()
      // 每 mouseup 就將canvas輸出成圖片放到陣列裡找到page
      const outputObj = {
        page,
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