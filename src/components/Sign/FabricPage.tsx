import { fabric } from "fabric"
import { useRef, useState, useEffect } from "react"
import { useAtom } from "jotai"
import { stepAtom } from '@/store/index'
const FabricPage = ({page}:{page:number}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const fabricRef = useRef<HTMLCanvasElement | null>(null)
  const [step] = useAtom(stepAtom)
  useEffect(() => {
    const c = new fabric.Canvas(fabricRef.current);
    c.setWidth(688)
    c.setHeight(639)
    setCanvas(c);
  }, [step, page, fabricRef])
  return (
    <canvas ref={fabricRef}></canvas>
  )
}

export default FabricPage