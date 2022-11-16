import Pencil from "@/components/svg/Pencil"
import UploadIcon from "@/components/svg/Upload"
import LastIcon from "@/components/svg/Last"
import NextIcon from "@/components/svg/Next"
import UploadArea from "@/components/sign/UploadArea"
import MySign from "@/components/sign/MySign"
import getTouchPos from "../../utils/getTouchPos"
import getMousePos from "../../utils/getMousePos"
import React, { useState, useRef, useEffect } from "react"
const CreateSign = () => {
  interface HandleCanvasInterface {
    target: HTMLCanvasElement;
    preventDefault: any
  }

  const [isCreateSign, setIsCreateSign] = useState<boolean>(true)
  const [drawingBoard, setDrawingBoard] = useState<{width: number | undefined, height: number | undefined}>({
    width: 0,
    height: 0
  })
  const [boardEditBtn, setBoardEditBtn] = useState<boolean>(true)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [src, setSrc] = useState(null)
  const [drawing, setDrawing] = useState<boolean>(false)
  const drawingBoardRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // const [restoreArray
  const [signList, setSignList] = useState([
    {
      name: '正楷正楷正楷正楷正楷正楷正楷正楷2020',
      image: '/src/assets/image/mockSign1.png'
    },
    {
      name: '正楷正楷正楷正楷正楷正楷正楷正楷2019',
      image: '/src/assets/image/mockSign1.png'
    },
    {
      name: '正楷正楷正楷正楷正楷正楷正楷正楷2020',
      image: '/src/assets/image/mockSign1.png'
    },
    {
      name: '正楷正楷正楷正楷正楷正楷正楷正楷2019',
      image: '/src/assets/image/mockSign1.png'
    },
    {
      name: '正楷正楷正楷正楷正楷正楷正楷正楷2020',
      image: '/src/assets/image/mockSign1.png'
    },
    {
      name: '正楷正楷正楷正楷正楷正楷正楷正楷2019',
      image: '/src/assets/image/mockSign1.png'
    },
  ])

  useEffect(() => {
    if(drawingBoardRef !== null && canvasRef !== null) {
      setDrawingBoard({
        ...drawingBoard,
        width: drawingBoardRef.current?.offsetWidth,
        height: drawingBoardRef.current?.offsetHeight
      })
      const c = canvasRef.current
      setCanvas(c)
      if(c) setCtx(c.getContext("2d"))
    }
  }, [drawingBoardRef, canvasRef])
  const [signName, setSignName] = useState('')
  const tabStyle = "flex items-center px-[20px] py-[8px] rounded-full cursor-pointer"

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true)
    setBoardEditBtn(false)
    console.log(drawing)
    const touchPos = getTouchPos(canvas, e)
    ctx?.beginPath()
    ctx?.moveTo(touchPos.x, touchPos.y)
    e.preventDefault()
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if(!drawing) return
    const touchPos = getTouchPos(canvas, e)
    if(ctx !== null) {
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.shadowColor = "black"
      ctx.lineTo(touchPos.x, touchPos.y)
      ctx.stroke()
    }
  }
  const handleTouchEnd = () => {
    setDrawing(false)
    setBoardEditBtn(true)
    console.log(drawing)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true)
    setBoardEditBtn(false)
    console.log(drawing)
    const mousePos = getMousePos(canvas, e)
    if(ctx !== null) {
      ctx.beginPath()
      ctx.moveTo(mousePos.x, mousePos.y)
      e.preventDefault()
    }
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if(!drawing) return
    const mousePos = getMousePos(canvas, e)
    if(ctx !== null) {
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.shadowColor = "black"
      ctx.lineTo(mousePos.x, mousePos.y)
      ctx.stroke()
    }
  }
  const handleMouseUp = () => {
    setDrawing(false)
    setBoardEditBtn(true)
  }

  const handleClear = () => {
    if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  return (
    <section className="w-[820px]">
      <ul className="flex w-max mx-auto bg-[#FFFFFF80] rounded-full px-[10px] py-[8.5px]">
        <li 
          className={
            `${tabStyle} ${isCreateSign ? 'text-[#fff] bg-[#595ED3]' : 'text-[#828282]'}`
          } 
          onClick={() => setIsCreateSign(true)}
        >
          <div className={isCreateSign ? '#E5E6F2' : ''}><Pencil /></div>
          <span className="ml-[8px]">手寫簽名</span>
        </li>
        <li 
          className={
            `${tabStyle} ${!isCreateSign ? 'text-[#fff] bg-[#595ED3]' : 'text-[#828282]'}`
          } 
          onClick={() => setIsCreateSign(false)}
        >
          <div className={!isCreateSign ? '#E5E6F2' : ''}><UploadIcon /></div>
          <span className="ml-[8px]">上傳簽名檔</span>
        </li>
      </ul>

      <div className="flex mt-[40px]">
        {/* 我的簽名檔(左側) */}
        <MySign signList={signList} />
        {/* 右側 */}
        <div className="flex-grow ml-[40px]">
          <div>
            <h4 className="text-[#4F4F4F]">簽名檔名稱<span className="ml-[4px] text-[#FF7070]">*</span></h4>
            <div className="relative w-[360px] h-[40px] mt-[20px]">
              <input type="text" className="signInput w-full h-full pr-[70px] rounded-[5px]" placeholder="輸入簽名檔名稱" value={signName} name="firstName" maxLength={18} onChange={(e) => setSignName(e.target.value)}  />
              <span className="absolute right-0 top-0 bottom-0 my-auto pr-[10px] text-[#BDBDBD] leading-[40px]">{signName.length}／18</span>
            </div>
          </div>

          <h4 className="mt-[32px] mb-[20px] text-[#4F4F4F]">簽名圖樣<span className="ml-[4px] text-[#FF7070]">*</span></h4>
          {/* 手寫簽名 */}
          {
            isCreateSign 
            ?(
              <div ref={drawingBoardRef}>
                <div className="relative w-[586px] h-[340px] bg-[#fff] rounded-[5px]">
                    <canvas
                    className="bg-[#fff]"
                    ref={canvasRef}
                    width={drawingBoard.width}
                    height={drawingBoard.height}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    >
                    </canvas>
                    {
                      boardEditBtn && <div className="flex absolute top-[14px] right-[14px]">
                      <button className={`flex-center w-[32px] h-[32px] rounded-[5px]`}><LastIcon /></button>
                      <button className={`flex-center w-[32px] h-[32px] ml-[12px] rounded-[5px]`}><NextIcon /></button>
                      <button className={`flex-center w-[60px] h-[32px] ml-[12px] text-[14px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]`} onClick={() => handleClear()}>清除</button>
                    </div>
                    }
                    
                </div>
                <button className="flex-center w-[104px] h-[32px] mx-auto mt-[20px] text-[14px] text-[#fff] bg-[#595ED3] rounded-[5px]">建立簽名檔</button>
              </div>
            ):(
              <div>
                <UploadArea />
                <button className="flex-center w-[104px] h-[32px] mx-auto mt-[70px] text-[14px] text-[#fff] bg-[#595ED3] rounded-[5px]">建立簽名檔</button>
              </div>
            )
          }
          
        </div>
      </div>
    </section>
  )
}

export default CreateSign