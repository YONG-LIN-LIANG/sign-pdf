import { fabric } from "fabric"
import { useRef, useState, useEffect } from "react"
import { useAtom } from "jotai"
import { stepAtom, signToPdfAtom } from '@/store/index'
import { KeyboardEvent } from "@/utils/type"
const FabricPage = ({page, bgImage}:{page:number, bgImage: string | undefined}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const fabricRef = useRef<HTMLCanvasElement | null>(null)
  // 目前要新增的簽名
  const [signToPdf] = useAtom(signToPdfAtom)
  // 目前到第幾階段
  const [step] = useAtom(stepAtom)

  const canvasOriginalHeight = 800;
  const canvasOriginalWidth = 800;
  
  // 建立fabric canvas
  useEffect(() => {
    setCanvas(
      new fabric.Canvas(fabricRef.current)
    )
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
      console.log("kkk", imageUrl)
      handleAddSign(imageUrl)
    }
  }, [signToPdf])
  const handleAddSign = (url: string) => {
    if(canvas) {
      fabric.Image.fromURL(url, (img) => {
        img.scaleToWidth(200)
        img.scaleToHeight(200)
        canvas.add(img)
      })
    }
  }
  // useEffect(() => {
  //   console.log("000", signToPdf, page)
  //   if(signToPdf !== null && signToPdf.page === page) {
  //     const { imageUrl } = signToPdf
  //     const c = new fabric.Canvas(fabricRef.current, {
  //       width:600,
  //       height: 600,
  //       selection: false
  //     });
  //     // c.setWidth(619)
  //     // c.setHeight(639)
  //     fabric.Image.fromURL(imageUrl, (img) => {
  //       img.scaleToWidth(200);
  //       img.scaleToHeight(200);
  //       // canvas.defaultCursor = 'move'; 
  //       // canvas.on()
  //       c.add(img).renderAll();
  //       // img.centerH();
        
  //     });
  //     setCanvas(c);
  //   }
    
  // }, [step, fabricRef, signToPdf])



  // useEffect(() => {
  //   if(signToPdf !== null &&　signToPdf.page === page && canvas && bgImage) {
  //     fabric.Image.fromURL(bgImage, (img) => {
  //       if(img) {
  //           canvas.setBackgroundImage(bgImage, function (img1: any) {
  //           canvas.setWidth(img1.width)
  //           canvas.setHeight(img1.height)
  //           console.log("111")
  //         })
  //         // handleScaleAndPositionImage(img)
  //       } 
  //     })
  //     // console.log("bg imageeee", bgImage)
  //     // console.log("sign image", signToPdf.imageUrl)
  //   }
  // }, [bgImage])

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  })

  const setCanvasZoom = () => {
    let canvasWidth = canvasOriginalWidth * 1;
    let canvasHeight = canvasOriginalHeight * 1;
    
    canvas?.setWidth(canvasWidth);
    canvas?.setHeight(canvasHeight);
    return { canvasWidth, canvasHeight };
  }

  // 放置背景圖
  const handleScaleAndPositionImage = (bgImage: any) => {
    const { canvasWidth, canvasHeight } = setCanvasZoom()
    const canvasAspect = canvasWidth / canvasHeight
    const imgAspect = bgImage.width / bgImage.height
    let left, top, scaleFactor
    if(canvasAspect >= imgAspect) {
      scaleFactor = canvasWidth / bgImage.width
      left = 0
      top = -(bgImage.height * scaleFactor - canvasHeight) / 2
    } else {
      scaleFactor = canvasHeight / bgImage.height
      top = 0
      left = -(bgImage.width * scaleFactor - canvasWidth) / 2
    }
  }

  const handleDeleteObject = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      // const activeGroup = canvas.getActiveObjects()

      console.log("activeObject", activeObject);
      // console.log("activeGroup", activeGroup);

      if(activeObject) {
        canvas.remove(activeObject)
      } 
      // else if (activeGroup) {
      //   const objectsInGroup = activeGroup.getObjects()
      // }
    }
  }
  
  const handleUserKeyPress = (e: KeyboardEvent) => {
    console.log(e, e.keyCode)
    if(e.keyCode === 8) {
      handleDeleteObject()
    }
  }

  return (
    <canvas ref={fabricRef} className="w-full h-full"></canvas>
  )
}

export default FabricPage