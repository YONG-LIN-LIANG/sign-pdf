import { useAtom } from "jotai"
import { outputDocumentArr, pdfAtom, outputInfoAtom, setOutputInfo } from "@/store/index"
import ArrowIcon from "@/components/svg/Arrow"
import { useState, useEffect } from "react"
const DownloadResult = () => {
  const [pdf] = useAtom(pdfAtom)
  const [outputInfo] = useAtom(outputInfoAtom)
  const [, displayOutputInfo] = useAtom(setOutputInfo)
  const [outputArr] = useAtom(outputDocumentArr)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const handleSwitchPage = (direction: string) => {
    const totalPage = pdf?._pdfInfo.numPages
    if(direction === 'next' && currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1)
    } else if(direction === 'last' && (currentPage > 1 && totalPage !== 1)){
      setCurrentPage((prevState) => prevState - 1)
    }
  }

  const handleSelectExtension = (extension: string) => {
    displayOutputInfo({ extension })
  }
  return (
    <section className="flex flex-col w-[586px] mx-auto">
      <div className="flex flex-col mb-[32px]">
        <h4 className="mb-[21px] text-[#4F4F4F]">文件名稱<span className="ml-[4px] text-[#FF7070]">*</span></h4>
        <div className="flex justify-between">
          <input 
            onChange={(e) => displayOutputInfo({docName: e.target.value, isSubmit: false})} 
            type="text" 
            placeholder="輸入文件名稱" 
            className={`signInput w-full max-w-[353px] h-[40px] pr-[70px] rounded-[5px] ${outputInfo.isSubmit && !outputInfo.docName ? 'border border-[#f00]' : ''}`} 
          />
          <ul className="flex">
            {
              ["pdf", "jpg"].map(i => (
                <li onClick={() => handleSelectExtension(i)} className="extension-selector flex items-center cursor-pointer">
                  <div className="w-[21px] h-[21px] mr-[14px] p-[4px] border rounded-full border-[#595ED3]">
                    <div className={`w-full h-full bg-[#595ED3] rounded-full ${i === outputInfo.extension ? "block" : "hidden"}`}></div>
                  </div>
                  <span>.{i}</span>
                </li>
              ))
            }
          </ul>
        </div>
        
      </div>
      <div>
      <h4 className="mb-[21px] text-[#4F4F4F]">預覽文件</h4>
        <div className="flex flex-col items-center  pt-[20px] px-[42.5px] bg-white">
          <div className="flex-none flex-center w-full h-[664px] border border-[#E0E0E0] overflow-auto">
            {outputArr.length && outputArr.map(i => (
              <img src={i?.imageUrl} alt="" className={currentPage === i?.page ? '' : 'hiddenSection'} />
            ))}
          </div>
          <div className="flex-none flex justify-center py-[10px]">
            {currentPage ? <button onClick={() => handleSwitchPage('last')} className={`${(currentPage > 1 && pdf?._pdfInfo.numPages !== 1) ? 'text-[#787CDA]' : 'text-[#BDBDBD]'}`}><ArrowIcon/></button> : ''}
            <div className="h-[31px] mb-[10px] mx-[24px] leading-[38px] text-[14px] text-[#828282]">
              {`${currentPage} / ${pdf?._pdfInfo.numPages}`}
            </div>
            {currentPage ? <button onClick={() => handleSwitchPage('next')} className={`${currentPage < pdf?._pdfInfo.numPages ? 'text-[#787CDA]' : 'text-[#BDBDBD]'} rotate-180`}><ArrowIcon/></button> : ''}
          </div>
        </div>
      </div>
    </section>
  )
  
}

export default DownloadResult