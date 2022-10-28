import { useEffect, useRef, useState } from "react";
import getTouchPos from "../../utils/getTouchPos"
import getMousePos from "../../utils/getMousePos"

import { useAtom } from "jotai"
import { signAtom } from "../../data/index"

const canvasSize = 500;

const SignFile = (): any => {
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState<any>(null)
  const [ctx, setCtx] = useState<any>(null)
  const [src, setSrc] = useState<any>(null)

  const [drawing, setDrawing] = useState(false)
  const [_, setSignData] = useAtom(signAtom)
  
  useEffect(() => {
    const c:any = canvasRef.current;
    setCanvas(c)
    if(c) setCtx(c.getContext("2d"));
  }, [canvasRef])

  // 點下去的起始點
  const handleTouchStart = (e: any) => {
    setDrawing(true)
    const touchPos = getTouchPos(canvas, e)
    ctx.beginPath(touchPos.x, touchPos.y)
    ctx.moveTo(touchPos.x, touchPos.y)
    e.preventDefault()
  }

  const handleMouseDown = (e: any) => {
    setDrawing(true)
    const mousePos = getMousePos(canvas, e)
    ctx.beginPath()
    ctx.moveTo(mousePos.x, mousePos.y)
    e.preventDefault()
  }

  const handleTouchMove = (e: any) => {
    if(!drawing) return
    const touchPos = getTouchPos(canvas, e)
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.shadowColor = "black"
    ctx.lineTo(touchPos.x, touchPos.y)
    ctx.stroke()
  }
  const handleMouseMove = (e: any) => {
    if(!drawing) return
    const mousePos = getMousePos(canvas, e)
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.shadowColor = "black"
    ctx.lineTo(mousePos.x, mousePos.y)
    ctx.stroke()
  }

  const handleTouchEnd = (e: any) => {
    setDrawing(false)
  }

  const handleMouseUp = (e: any) => {
    setDrawing(false)
  }

  const handleClear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  // 轉換成圖片: 利用canvas的toDataURL()把畫布轉圖片，圖片URL格式: "data:image/png;base64,iVBORw0KG...
  const handleConvertToImage = () => {
    const image = canvas.toDataURL()
    setSignData(image)
    setSrc(image)
  }

  return (
    <div>
      <canvas
        style={{ background: "#EEE" }}
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
      </canvas>
      <div>
        <button onClick={handleClear}>清除</button>
        <button onClick={handleConvertToImage}>轉圖</button>
      </div>
      {
        src && (
          <img 
            src={src}
            alt="signImage"
            style={{ color: "#FFF", border: "none" }}
          />
        )
      }
    </div>
  )
}

export default SignFile