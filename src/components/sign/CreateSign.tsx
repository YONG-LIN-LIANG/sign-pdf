import Pencil from "@/components/svg/Pencil"
import UploadIcon from "@/components/svg/Upload"
import LastIcon from "@/components/svg/Last"
import NextIcon from "@/components/svg/Next"
import TrashcanIcon from "@/components/svg/Trashcan"
import { useState } from "react"
const CreateSign = () => {
  const [isCreateSign, setIsCreateSign] = useState(false)
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
  const [signName, setSignName] = useState('')
  const tabStyle = "flex items-center px-[20px] py-[8px] rounded-full cursor-pointer"
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
        <div className="flex-none w-[188px]">
          <h4 className="text-[#4F4F4F]">我的簽名檔</h4>
          <div className="mt-[20px] pt-[12px] pr-[4px] border border-[#FFFFFF] rounded-[5px]">
            <ul className="ctr-scrollbar overflow-y-auto flex flex-col items-center h-[500px]">
              {
                signList.length 
                ? signList.map(sign => (
                  <li className="signCard w-[160px] p-[8px] bg-[#FFFFFF80]">
                    <h5 className="mb-[8px] text-[14px]">{ sign.name }</h5>
                    <img src={ sign.image } alt="" />
                  </li>
                ))
                : <div>目前無簽名</div> 
              }
              
            </ul>
          </div>
        </div>
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
              <div>
                <div className="relative w-[586px] h-[340px] bg-[#fff] rounded-[5px]">
                    <div className="flex absolute top-[14px] right-[14px]">
                      <button className={`flex-center w-[32px] h-[32px] rounded-[5px]`}><LastIcon /></button>
                      <button className={`flex-center w-[32px] h-[32px] ml-[12px] rounded-[5px]`}><NextIcon /></button>
                      <button className={`flex-center w-[60px] h-[32px] ml-[12px] text-[14px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]`}>清楚</button>
                    </div>
                </div>
                <button className="flex-center w-[104px] h-[32px] mx-auto mt-[20px] text-[14px] text-[#fff] bg-[#595ED3] rounded-[5px]">建立簽名檔</button>
              </div>
            ):(
              <div>
                <div className="flex flex-col justify-center items-center w-full h-[245px] border border-[#fff] bg-[#FFFFFF80] rounded-[5px]">
                  <div className="text-[#787CDA]">
                    <UploadIcon />
                  </div>
                  <span className="mt-[12px] mb-[8px]">拖曳至此上傳</span>
                  <span>或</span>
                  <button className="w-[86px] h-[32px] mt-[8px] mb-[20px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]">選擇檔案</button>
                  <div className="flex flex-col text-[12px] text-[#595ED3]">
                    <span>檔案格式png／jpg</span>
                    <span>檔案大小＜1MB</span>
                  </div>
                </div>

                <h4 className="mt-[32px] mb-[20px] text-[#4F4F4F]">預覽簽名檔</h4>
                <div className="flex-center">
                  <div className="flex flex-col items-center text-[#595ED3]">
                    <TrashcanIcon />
                    <span className="mt-[12px]">請上傳檔案</span>
                  </div>
                  
                </div>
                <button className="flex-center w-[104px] h-[32px] mx-auto mt-[70px] text-[14px] text-[#fff] bg-[#595ED3] rounded-[5px]">建立簽名檔</button>
              </div>
            )
          }
          
        </div>
      </div>

      <button className="flex-center w-[180px] h-[40px] mt-[60px] mx-auto text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full">下一步</button>
    </section>
  )
}

export default CreateSign