import MySign from "@/components/sign/MySign"
import { useState, useEffect } from "react"
import CanvasPreview from "@/components/sign/CanvasPreview"
// import LastIcon from "@/components/svg/Last"
// import NextIcon from "@/components/svg/Next"
import ArrowIcon from "@/components/svg/Arrow"
import FabricPage from "@/components/sign/FabricPage"
import { useAtom } from "jotai"
import { pdfAtom, outputDocumentArr, stepAtom, setPdfCombinePage, signToPdfAtom, setOutputDocumentArr } from '@/store/index'
const StartSign = () => {
  const [pdf] = useAtom(pdfAtom)
  const [outputArr] = useAtom(outputDocumentArr)
  const [step] = useAtom(stepAtom)
  const [signToPdf] = useAtom(signToPdfAtom)
  const [, displayPdfCombinePage] = useAtom(setPdfCombinePage)
  const [, displayOutputDocumentArr] = useAtom(setOutputDocumentArr)
  
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [isDeleteClick, setIsDeleteClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(step === 3) {
      
      console.log("check", currentPage, pdf?._pdfInfo.numPages)
      if(outputArr.length + 1 < pdf?._pdfInfo.numPages) {
        const timer = setTimeout(() => {
          setIsLoading(true)
          setCurrentPage(prev => prev+1)
        },500)
        return () => clearTimeout(timer);
      } else {
        setIsLoading(false)
      }
    }
  }, [step, currentPage])
  useEffect(() => {
    console.log("isLoading", isLoading)
    if(!isLoading && step === 3) {
      console.log("checkkkk")
      setCurrentPage(1)
      displayPdfCombinePage({page: 1})
      console.log("result", outputArr)
    }
  }, [isLoading])
  // 順序
  // 1. 顯示pdf頁
  // 2. 點擊新增簽名，將pdf轉圖給fabric當基底
  // useEffect(() => {
  //   handleRenderPdfPage()
  // }, [pdf, currentPage])
  // 建立主要的canvas
  
  useEffect(() => {
    const isEdit = outputArr.find(i => i?.page === signToPdf?.page)?.isEdit
    console.log("isEdit", isEdit)
    if(signToPdf !== null && signToPdf.page !== 0 && !isEdit) {
      console.log("signtopdf", signToPdf)
      // 更新pdfArr的page為編輯過
      // 到fabric component把背景還有sign都渲染出來
      const bgImage = outputArr.find(i => i?.page === signToPdf.page)?.imageUrl
      // const newPdfArr = pdfArr.map((v, i) => {
      //   if(v.page === signToPdf.page) {
      //     v.isEdit = true
      //   }
      //   return v
      // })
      // setPdfArr(newPdfArr)

      const outputObj = {
        page: signToPdf.page,
        isEdit: true,
        imageUrl: bgImage
      }
      console.log("outputObj", outputObj)
      displayOutputDocumentArr({document: outputObj})
    }
  }, [signToPdf])

  // useEffect(() => {
  //   // 每次換頁渲染一次canvas
  //   if(step === 3 && pdfArr.length === pdf?._pdfInfo.numPages) {
  //     console.log("rwrwrw")
  //     if(!currentPage)setCurrentPage((prev) => prev + 1)
  //     handleRenderPdfPage(currentPage)
  //   }
  //   displayPdfCombinePage({page: currentPage})
  // }, [step, currentPage, isLoading])

  // useEffect(() => {
  //   if(step === 3 && !pdfArr.length) {
  //     // setIsLoading(true)
  //     // 把全部渲染出來
  //     for(let page = 1 ; page <= pdf?._pdfInfo.numPages; page++) {
  //       console.log("yyy", isRenderPdfArrLoading)
  //       if(!isRenderPdfArrLoading) {
  //         handleRenderPdfPage(page)
  //       }
  //     }
  //   }
  // }, [step])

  const handleSwitchPage = (direction: string) => {
    if(isLoading) return
    const totalPage = pdf?._pdfInfo.numPages
    if(direction === 'next' && currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1)
      displayPdfCombinePage({page: currentPage + 1})
    } else if(direction === 'last' && (currentPage > 1 && totalPage !== 1)){
      setCurrentPage((prevState) => prevState - 1)
      displayPdfCombinePage({page: currentPage - 1})
    }
  }

  const handleDeleteSign = (canvas: any) => {
    setIsDeleteClick(true)
    const timer = setTimeout(() => {
      setIsDeleteClick(false)
      clearTimeout(timer)
    },2000)
  }
  return (
    <section className="flex flex-col lg:flex-row lg:justify-center mx-auto mt-[40px] w-[80%] max-w-[586px] lg:max-w-[1000px]">
      <MySign type="allowSelect" />
      <div className="flex-grow ml-[40px]">
        <h4 className="text-[#4F4F4F]">簽署文件</h4>
        <span className="text-[#828282]">將左方簽名檔拖移置簽署文件中並調整位置與大小</span>
        <div className="flex flex-col w-full h-[780px] pt-[16px] px-[42px] pb-[22px] mt-[20px] bg-white rounded-[5px]">
          <div className="flex-none flex justify-end h-[32px] mb-[12px]">
            {/* <button className={`flex-center w-[32px] h-[32px] rounded-[5px] text-[#BDBDBD] bg-[#F2F2F2]`}><LastIcon /></button>
            <button className={`flex-center w-[32px] h-[32px] ml-[12px] rounded-[5px] text-[#BDBDBD]`}><NextIcon /></button> */}
            <button onClick={handleDeleteSign} className={`flex-center w-[60px] h-[32px] ml-[12px] text-[14px] text-[#595ED3] bg-[#E9E1FF] rounded-[5px]`}>清除</button>
          </div>
          <div className={`relative flex-grow w-full h-full border border-[#E0E0E0] ${isLoading ? 'overflow-hidden' : 'overflow-auto'}`}>
            {/* 每個頁面做成fabric.js的component，然後在最外層做隱藏或顯示 */}
            {Array.from(Array(pdf?._pdfInfo.numPages).keys()).map((i, key) => (
              // 先全部顯示出來，並確實存到outputArr
              <div className={outputArr.find(v => v?.page === key+1)?.isEdit === false && currentPage === key+1 && !isLoading ? '' : isLoading && (key + 1) ? '' : 'hiddenSection'}>
                <CanvasPreview page={key+1} currentPage={currentPage} />
              </div>
            ))}
            
            
            {Array.from(Array(pdf?._pdfInfo.numPages).keys()).map(i => (
              <div className={outputArr.find(v => v?.page === i+1)?.isEdit === true && currentPage === i+1 ? '' : 'hiddenSection'}>
                <FabricPage 
                  isDeleteClick={isDeleteClick} 
                  page={i+1} 
                  bgImage={outputArr.find(v => v?.page === i+1 && v.isEdit)?.imageUrl} 
                  isEdit={outputArr.find(v => v?.page === i+1)?.isEdit}
                />
              </div>
            ))}
            <div className={`absolute left-0 top-0 w-full h-full ${isLoading ? 'bg-[#fff] loadingAnimation z-[30]' : '-z-[20]'}`}></div>
          </div>
          <div className="flex-none flex justify-center mt-[18px]">
            {currentPage ? <button onClick={() => handleSwitchPage('last')} className={`${(currentPage > 1 && pdf?._pdfInfo.numPages !== 1) && !isLoading ? 'text-[#787CDA]' : 'text-[#BDBDBD]'}`}><ArrowIcon/></button> : ''}
            {currentPage ?<div className="h-[31px] mb-[10px] mx-[24px] leading-[38px] text-[14px] text-[#828282]">
              {!isLoading ? `${currentPage} / ${pdf?._pdfInfo.numPages}` : 'loading...'}
            </div> : ''}
            {currentPage ? <button onClick={() => handleSwitchPage('next')} className={`${currentPage < pdf?._pdfInfo.numPages && !isLoading ? 'text-[#787CDA]' : 'text-[#BDBDBD]'} rotate-180`}><ArrowIcon/></button> : ''}
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default StartSign