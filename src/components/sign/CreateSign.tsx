import Pencil from "@/components/svg/Pencil"
import UploadIcon from "@/components/svg/Upload"
import LastIcon from "@/components/svg/Last"
import NextIcon from "@/components/svg/Next"
import UploadArea from "@/components/sign/UploadArea"
import MySign from "@/components/sign/MySign"
import ColorPickerIcon from "@/components/svg/ColorPicker"
import ActiveColorPickerIcon from "@/components/svg/ActiveColorPicker"
import getTouchPos from "../../utils/getTouchPos"
import getMousePos from "../../utils/getMousePos"
import { useAtom } from "jotai"
import { displayMessageBox, addSign, stepAtom } from '@/store/index'
import React, { useState, useRef, useEffect } from "react"
const CreateSign = () => {
  const [, setMessageBox] = useAtom(displayMessageBox)
  const [step] = useAtom(stepAtom)
  const [, setAddSign] = useAtom(addSign)
  const [isCreateSign, setIsCreateSign] = useState<boolean>(true)
  const [drawingBoard, setDrawingBoard] = useState<{width: number, height: number}>({
    width: 0,
    height: 0
  })
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [imgSrc, setImgSrc] = useState<string>('')
  const [colorPicker, setColorPicker] = useState({
    activeStyle: 'text-[#000]',
    activeColor: '#000',
    list : [
      {
        style: 'text-[#000]',
        color: '#000'
      },
      {
        style: 'text-[#0400C0]',
        color: '#0400C0'
      },
      {
        style: 'text-[#C00000]',
        color: '#C00000'
      },
    ]
  })
  const [drawing, setDrawing] = useState<boolean>(false)
  const drawingBoardRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [recordDrawPath, setRecordDrawPath] = useState<any[]>([])
  const [recordIndex, setRecordIndex] = useState<number>(0)
  const [isClearUploadFile, setIsClearUploadFile] = useState<boolean>(false)
  const [formError, setFormError] = useState({
    signName: false,
    drawingBoard: false,
    uploadArea: false
  })
  const [isButtonClick, setIsButtonClick] = useState({
    drawingArea: false,
    uploadArea: false
  })
  useEffect(() => {
    if(drawingBoardRef.current !== null && canvasRef !== null) {
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
  useEffect(() => {
    if(ctx) {
      const newDraw = ctx?.getImageData(0, 0, drawingBoard?.width, drawingBoard?.height)
      setRecordDrawPath((oldRecordArr: any[]) => [...oldRecordArr, newDraw])
      setRecordIndex(0)
    }
  }, [ctx])
  useEffect(() => {
    ctx?.putImageData(recordDrawPath[recordIndex], 0, 0)
    console.log(recordDrawPath.length === 1 && !signName)
  }, [recordIndex])
  const [signName, setSignName] = useState('')
  const tabStyle = "relative z-[5] flex items-center px-[20px] py-[8px] rounded-full cursor-pointer"

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true)
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
      ctx.strokeStyle = colorPicker.activeColor
      ctx.lineTo(touchPos.x, touchPos.y)
      ctx.stroke()
    }
  }
  const handleTouchEnd = () => {
    setDrawing(false)
    console.log(drawing)
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true)
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
      ctx.strokeStyle = colorPicker.activeColor
      ctx.lineTo(mousePos.x, mousePos.y)
      ctx.stroke()
    }
  }
  const handleMouseUp = () => {
    setDrawing(false)
    const width = drawingBoard?.width
    const newDraw = ctx?.getImageData(0, 0, width, drawingBoard?.height)
    if(recordIndex === recordDrawPath.length - 1) {
      setRecordDrawPath((oldRecordArr: any[]) => [...oldRecordArr, newDraw])
    } else {
      // 如果在index 1畫的化，會把recordDrawPath 2,3的資料清掉再填入新畫的進陣列，index再+1
      let newArr = recordDrawPath.filter((element, index) => index < recordIndex + 1)
      newArr.push(newDraw)
      setRecordDrawPath(newArr)
    }
    setRecordIndex(recordIndex + 1)
  }

  const handleClear = () => {
    if(ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height)
    setRecordDrawPath([recordDrawPath[0]])
    setRecordIndex(0)
  }
  const handleGoLastStep = () => {
    // 如果recordPath只有一筆就不能觸發
    if(recordIndex === 0) return
    setRecordIndex(recordIndex - 1)
    // ctx?.putImageData(recordDrawPath[recordIndex], 0, 0)
  }
  const handleGoNextStep = () => {
    if(recordDrawPath.length > 1 && recordIndex < recordDrawPath.length - 1) {
      setRecordIndex(recordIndex + 1)
    }
  }
  const handleSaveSign = () => {
    setFormError((prevState) => ({...prevState, signName: Boolean(signName), drawingBoard: recordDrawPath.length > 1}))
    setIsButtonClick((prevState) => ({...prevState, drawingArea: true}))
    const timer = setTimeout(() => {
      console.log('run timer')
      setIsButtonClick((prevState) => ({...prevState, drawingArea: false}))
      clearTimeout(timer)
    }, 3000)
    if(!(recordDrawPath.length > 1 && signName)) {
      setMessageBox({isDisplay: true, isMask: false, dialogName: 'alert', content: '請完成必填欄位！', basicStyle: 'w-[200px] text-[#333333] bg-[#FF7070] shadow-[0_4px_12px_rgba(0,0,0,0.1)]', logoStyle: 'text-[#fff]'})
    } else {
      const imageURL = canvas?.toDataURL()
      if(imageURL) {
        // 呼叫jotai方法存到簽名檔清單，並存在localStorage
        const newSignElement = {id: Date.now(), title: signName, image: imageURL}
        setAddSign(newSignElement)
        handleClear()
        setSignName('')
        // 存到localStorage
        setMessageBox({isDisplay: true, isMask: false, dialogName: 'success', content: '建立成功！', basicStyle: 'w-[140px] bg-[#E3FEC7] shadow-[0_4px_12px_rgba(0,0,0,0.1)]'})
      }
    }
    
  }
  const handleUploadSign = (img: string) => {
    setIsClearUploadFile(false)
    setImgSrc(img)
  }
  const handleUploadSaveSign = () => {
    setFormError((prevState) => ({...prevState, signName: Boolean(signName), uploadArea: Boolean(imgSrc)}))
    setIsButtonClick((prevState) => ({...prevState, uploadArea: true}))
    const timer = setTimeout(() => {
      console.log('run timer')
      setIsButtonClick((prevState) => ({...prevState, uploadArea: false}))
      clearTimeout(timer)
    }, 3000)
    if(!(signName && imgSrc)) {
      setMessageBox({isDisplay: true, isMask: false, dialogName: 'alert', content: '請完成必填欄位！', basicStyle: 'w-[200px] text-[#333333] bg-[#FF7070] shadow-[0_4px_12px_rgba(0,0,0,0.1)]', logoStyle: 'text-[#fff]'})
    } else {
      const newSignElement = {id: Date.now(), title: signName, image: imgSrc}
      setAddSign(newSignElement)
      setSignName('')
      setIsClearUploadFile(true)
      setImgSrc('')
      setMessageBox({isDisplay: true, isMask: false, dialogName: 'success', content: '建立成功！', basicStyle: 'w-[140px] bg-[#E3FEC7] shadow-[0_4px_12px_rgba(0,0,0,0.1)]'})
    }
  }
  return (
    <section className="max-w-[546px] lg:w-[820px] lg:max-w-[1000px] mx-auto">
      <ul className="relative flex w-max mx-auto bg-[#FFFFFF80] rounded-full px-[10px] py-[8.5px]">
        <li 
          className={
            `${tabStyle} animation ${isCreateSign ? 'text-[#fff]' : 'text-[#828282]'}`
          } 
          onClick={() => setIsCreateSign(true)}
        >
          <div className={isCreateSign ? '#E5E6F2' : ''}><Pencil /></div>
          <span className="ml-[8px]">手寫簽名</span>
        </li>
        <li 
          className={
            `${tabStyle} animation ${!isCreateSign ? 'text-[#fff]' : 'text-[#828282]'}`
          } 
          onClick={() => setIsCreateSign(false)}
        >
          <div className={!isCreateSign ? '#E5E6F2' : ''}><UploadIcon /></div>
          <span className="ml-[8px]">上傳簽名檔</span>
        </li>
        {/* 移動背景塊 */}
        <div className={`animation absolute ${isCreateSign ? 'left-[10px] z-[2] w-[132px]' : 'left-[142px] z-[2] w-[144px]'} top-[8.5px] h-[40px] bg-[#595ED3] rounded-full`}></div>
      </ul>

      <div className="flex flex-col lg:flex-row lg:justify-center mx-auto mt-[40px] w-[80%] mmd:w-full lg:max-w-[1000px]">
        {/* 我的簽名檔(左側) */}
        <MySign />
        {/* 右側 */}
        <div className="flex-grow mt-[40px] lg:mt-0 lg:ml-[40px]">
          <div>
            <h4 className="text-[#4F4F4F]">簽名檔名稱<span className="ml-[4px] text-[#FF7070]">*</span></h4>
            <div className="relative max-w-[360px] h-[40px] mt-[20px]">
              <input 
                type="text" 
                className={`
                  signInput w-full h-full pr-[70px] rounded-[5px] 
                  ${(isCreateSign && !formError.signName && isButtonClick.drawingArea) || 
                  (!isCreateSign && !formError.signName && isButtonClick.uploadArea) 
                  ? 'border border-[#f00]' 
                  : ''
                  }`
                } placeholder="輸入簽名檔名稱" value={signName} name="firstName" maxLength={18} onChange={(e) => setSignName(e.target.value)}  />
              <span className="absolute right-0 top-0 bottom-0 my-auto pr-[10px] text-[#BDBDBD] leading-[40px]">{signName.length}／18</span>
            </div>
          </div>

          <h4 className="mt-[32px] mb-[20px] text-[#4F4F4F]">簽名圖樣<span className="ml-[4px] text-[#FF7070]">*</span></h4>
          {/* 手寫簽名 */}
          <div className={isCreateSign ? '' : 'invisible absolute -z-[10]'}>
            <div ref={drawingBoardRef} className={`relative w-full h-[340px] bg-[#fff] rounded-[5px] overflow-hidden ${!formError.drawingBoard && isButtonClick.drawingArea ? 'border border-[#f00]' : ''}`}>
                <canvas
                className="bg-[#fff]"
                ref={canvasRef}
                width={drawingBoard.width}
                height={drawingBoard.height}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                >
                </canvas>
                {
                  !drawing && <div className="flex absolute top-[14px] right-[14px]">
                  <button onClick={handleGoLastStep} className={`flex-center w-[32px] h-[32px] rounded-[5px] ${recordIndex === 0 ? 'text-[#BDBDBD] bg-[#F2F2F2]' : 'text-[#787CDA] bg-[#E9E1FF]'}`}><LastIcon /></button>
                  <button onClick={handleGoNextStep} className={`flex-center w-[32px] h-[32px] ml-[12px] rounded-[5px] ${!(recordDrawPath.length > 1 && recordIndex < recordDrawPath.length - 1) ? 'text-[#BDBDBD] bg-[#F2F2F2]' : 'text-[#787CDA] bg-[#E9E1FF]'}`}><NextIcon /></button>
                  <button className={`flex-center w-[60px] h-[32px] ml-[12px] text-[14px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]`} onClick={() => handleClear()}>清除</button>
                </div>
                }
                {
                  !drawing && 
                  <div className="flex absolute left-[20px] top-[14px]">
                    {colorPicker.list.map((picker,idx) => (
                    <div key={idx} className="colorPicker flex-center relative w-[36px] h-[32px] cursor-pointer" onClick={() => setColorPicker({...colorPicker, activeStyle: picker.style, activeColor: picker.color})}>
                        {picker.style === colorPicker.activeStyle && <div className="absolute"><ActiveColorPickerIcon /></div>}
                        <div className={`relative z-[10] ${picker.style}`}><ColorPickerIcon /></div>
                      </div>
                    ))}
                  </div>
                }
            </div>
            <button onClick={handleSaveSign} className={`flex-center w-[104px] h-[32px] mx-auto mt-[20px] text-[14px] rounded-[5px] ${recordDrawPath.length > 1 && signName ? 'text-[#fff] bg-[#595ED3]' : 'text-[#E0E0E0] bg-[#BDBDBD]'}`}>建立簽名檔</button>
          </div>
        
          <div className={isCreateSign ? 'hidden' : ''}>
            <UploadArea uploadType={step === 1 ? "png／jpg" : "pdf"} onUploadSign={handleUploadSign} isClearUploadFile={isClearUploadFile} formError={formError} isButtonClick={isButtonClick.uploadArea} />
            <button onClick={handleUploadSaveSign} className={`flex-center w-[104px] h-[32px] mx-auto mt-[70px] text-[14px] rounded-[5px] ${imgSrc && signName ? 'text-[#fff] bg-[#595ED3]' : 'text-[#E0E0E0] bg-[#BDBDBD]'}`}>建立簽名檔</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateSign