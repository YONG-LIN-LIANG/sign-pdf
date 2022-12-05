import MySign from "@/components/sign/MySign"
import { useState } from "react"
const StartSign = () => {
  // 之後這要從全局狀態管理拿資料
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

  return (
    <section className="flex text-[14px]">
      <MySign />
      <div className="flex-grow ml-[40px]">
        <h4 className="text-[#4F4F4F]">簽署文件</h4>
        <span className="text-[#828282]">將左方簽名檔拖移置簽署文件中並調整位置與大小</span>
      </div>
    </section>
  )
}

export default StartSign