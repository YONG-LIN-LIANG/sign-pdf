import TrashcanIcon from "@/components/svg/Trashcan"
import UploadIcon from "@/components/svg/Upload"
const UploadArea = () => {
  return (
    <>
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
  </>
  )
}

export default UploadArea