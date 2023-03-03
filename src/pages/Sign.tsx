import { jsPDF } from "jspdf";
import ProgressBarIcon from "@/components/svg/ProgressBar"
import CreateSign from "@/components/sign/CreateSign"
import UploadDocument from "@/components/sign/UploadDocument"
import StartSign from "@/components/sign/StartSign"
import DownloadResult from "@/components/sign/DownloadResult"
import { useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { 
  displayMessageBox, 
  signListAtom, 
  setSignList, 
  pdfAtom, stepAtom, 
  setCurrentStep, 
  outputInfoAtom, 
  setOutputInfo, 
  outputDocumentArr,
  setStepDirection,
  setOutputDocumentArr
} from '@/store/index'
import { useTranslation } from "react-i18next"
const Sign = () => {
  const { t } = useTranslation()
  const [signList] = useAtom(signListAtom)
  const [outputInfo] = useAtom(outputInfoAtom)
  const [, displaySignList] = useAtom(setSignList)
  const [, setMessageBox] = useAtom(displayMessageBox)
  const [currentStep] = useAtom(stepAtom)
  const [, displayStepDirection] = useAtom(setStepDirection)
  const [, displayStep] = useAtom(setCurrentStep)
  const [, displayOutputInfo] = useAtom(setOutputInfo)
  const [, displayOutputDocumentArr] = useAtom(setOutputDocumentArr)
  const [outputArr] = useAtom(outputDocumentArr)
  const [pdf] = useAtom(pdfAtom)
  const progressBarRef = useRef<any>(null)
  const alertMessage = {isDisplay: true, isMask: false, dialogName: 'alert', content: '', basicStyle: 'w-[200px] text-[#333333] bg-[#FF7070] shadow-[0_4px_12px_rgba(0,0,0,0.1)]', logoStyle: 'text-[#fff]'}

  useEffect(() => {
    displaySignList()
    if(progressBarRef) {
      const pathLength = progressBarRef.current.getTotalLength()
      progressBarRef.current.style.strokeDasharray = pathLength;
      progressBarRef.current.style.animation = `zeroToStep${currentStep} ${currentStep/2}s linear forwards`
    }
  },[])
  const handleSwitchStep = (nextStep: number) => {
    if(currentStep === 1 && !signList.length) {
      // 檢查有沒有簽名
      setMessageBox({...alertMessage, content: '請建立簽名檔'})
      return
    } else if(currentStep === 2 && !pdf && nextStep === 3) {
      setMessageBox({...alertMessage, content: '請上傳簽署文件'})
      return
    } else if(currentStep === 4 && nextStep === 2) {
      displayOutputDocumentArr({document: null})
      displayOutputInfo({
        isSubmit: false,
        docName: "",
        extension: "pdf"
      })
    }
    scrollTo(0, 0)
    // setCurrentStep(step)
    displayStep({step: nextStep})
    displayStepDirection({from: currentStep, to: nextStep})
    progressBarRef.current.style.animation = `step${currentStep}ToStep${nextStep} 1s linear forwards`
  }
  const stepList = [
    {
      id: 1,
      name: `${t('sign.signature_step1')}`,
      style: 'left-[-17px]'
    },
    {
      id: 2,
      name: `${t('sign.signature_step2')}`,
      style: 'left-[-22px]'
    },
    {
      id: 3,
      name: `${t('sign.signature_step3')}`,
      style: ''
    },
    {
      id: 4,
      name: `${t('sign.signature_step4')}`,
      style: 'right-[-25px]'
    },
  ]
  const handleDownloadDocument = () => {
    displayOutputInfo({isSubmit: true})
    const {docName, extension} = outputInfo
    if(!docName || !extension) {
      setMessageBox({...alertMessage, content: '請填寫文件名稱'})
      return
    }
    // 處理下載
    if(extension === "jpg") {
      for(let item of outputArr) {
        // const dataURL = canvas.toDataURL({ format: "png" });
        const link = document.createElement("a");
        link.download = `${docName}${item?.page}.jpg`;
        if(item) {
          link.href = item?.imageUrl;
        }
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        if(link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }
    } else if(extension === "pdf") {
      // 設定第一張pdf尺寸
      if(outputArr[0]) {
        const firstPage = outputArr[0]
        const {width, height} = firstPage
        let pdf = new jsPDF('p', 'px', [width, height]);
        for(const [index, item] of outputArr.entries()) {
          if(item) {
            const {width , height} = item
            pdf.addImage(item?.imageUrl, "JPEG", 0, 0, width, height);
            if(item.page < outputArr.length) {
              // 設定第一張之外的pdf頁面尺寸
              pdf.addPage([width, height])
            }
          }
        }
        pdf.save(`${docName}.pdf`);
      }
    }
  }
  return (
    <section className="w-full mx-auto overflow-x-hidden">
      <div className="w-[300px] xs:w-[400px] mmd:w-[620px] mx-auto">
        <div className={`
          relative flex justify-center mt-[50px] mx-auto w-[543px] animation 
          ${currentStep === 1 
            ? 'left-[40%] xs:left-[41%] mmd:left-[39%]' 
            : currentStep === 2 
            ? 'left-[-13%] xs:left-[2%] mmd:left-[13%]' 
            : currentStep === 3 
            ? 'left-[-66%] xs:left-[-38%] mmd:left-[-13%]'    
            : currentStep === 4
            ? 'left-[-120%] xs:left-[-77%] mmd:left-[-40%]'
            : ''
          }
          md:left-0
        `}>
          <div className="w-full mb-[68px]">
            {/* 背景 */}
            <div className="absolute text-[#F2F2F2] z-[5]">
              <ProgressBarIcon />
            </div>
            {/* 目前進度 */}
            <div className="relative z-[10]">
              <svg width="543" height="63" viewBox="0 0 543 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path ref={progressBarRef} d="M539.817 58.801C523.388 49.5565 509.817 37.917 508.483 22.1103C507.15 6.3036 511.817 3.33386 514.245 3.33386C516.674 3.33386 521.483 7.74058 521.579 21.0086C521.674 34.2767 517.579 47.9279 490.341 55.1606C463.102 62.3934 395.96 58.8489 379.674 55.7833C360.722 52.1909 343.864 40.6472 344.626 20.6254C345.531 -2.12663 359.531 3.62126 359.436 20.6254C359.388 29.7741 356.007 40.9825 338.198 50.227C319.055 60.1421 271.341 59.6632 271.341 59.6632C271.341 59.6632 223.817 60.1421 204.722 50.227C186.96 40.9825 183.579 29.822 183.579 20.6254C183.483 3.62126 197.483 -2.12663 198.341 20.6254C199.102 40.6472 182.293 52.1909 163.436 55.7833C147.198 58.8489 80.293 62.3934 53.1501 55.1606C26.0073 47.9279 21.912 34.3246 22.0072 21.0086C22.1025 7.69268 26.8644 3.33386 29.293 3.33386C31.7215 3.33386 36.3882 6.3036 35.0549 22.1103C33.7215 37.917 20.2453 49.5565 3.81677 58.801" stroke="#787CDA" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex justify-between">
              {
                stepList.map((step, index) => (
                  <div key={index} className={`${step.style} relative flex flex-col items-center ${currentStep === step.id ? 'text-[#333333]' : currentStep > step.id ? 'text-[#787CDA]' : 'text-[#BDBDBD]'}`}>
                    <span className="text-[12px]">step{step.id}</span>
                    <div className="relative">
                      <h3 className="relative z-[3] text-[18px] font-medium">{step.name}</h3>
                      {
                        currentStep === step.id && <div className="absolute left-[10px] right-[10px] top-0 bottom-0 m-auto h-[8px] bg-[#E3FEC7]"></div>
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={currentStep === 1 ? '' : 'hiddenSection'}>
        <CreateSign />
      </div>
      <div className={currentStep === 2 ? '' : 'hiddenSection'}>
        <UploadDocument />
      </div>
      <div className={currentStep === 3 ? '' : 'hiddenSection'}>
        <StartSign />
      </div>
      <div className={currentStep === 4 ? '' : 'hiddenSection'}>
        <DownloadResult />
      </div>

      {/* step也用全局狀態管理 */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-[60px]">
        {
          currentStep !== 1 && <button className="flex-center w-[180px] h-[40px] text-[14px] text-[#4F4F4F] border border-[#E3FEC7] rounded-full" onClick={() => handleSwitchStep(currentStep - 1)}>{t('sign.signature_last')}</button>
        }
        {
          currentStep === 1 && <button className={`flex-center w-[180px] h-[40px] ${currentStep === 1 && !signList.length ? 'text-[#fff] bg-[#BDBDBD]' : ''} ${currentStep !== 1 ? 'ml-[20px]' : ''} text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full`} onClick={() => handleSwitchStep(currentStep + 1)}>{t('sign.signature_next')}</button>
        }
        {
          currentStep === 2
          ? <button className={`flex-center w-[180px] h-[40px] mt-[20px] sm:mt-0 sm:ml-[20px] text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full ${!pdf ? 'text-[#fff] bg-[#BDBDBD]' : ''}`} onClick={() => handleSwitchStep(3)}>{t('sign.signature_head_to_sign')}</button>
          : currentStep === 3
          ? <button className="flex-center w-[180px] h-[40px] mt-[20px] sm:mt-0 sm:ml-[20px] text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full" onClick={() => handleSwitchStep(4)}>{t('sign.signature_head_to_download')}</button>
          : currentStep === 4
          ? <button onClick={handleDownloadDocument} className="flex-center w-[180px] h-[40px] mt-[20px] sm:mt-0 sm:ml-[20px] text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full">{t('sign.signature_download')}<span className="ml-[6px]">{outputInfo.extension}</span></button>
          : null
        }
        {
          currentStep === 4 && <button onClick={() => handleSwitchStep(2)} className="flex-center w-[180px] h-[40px] mt-[20px] sm:mt-0 sm:ml-[20px] text-[14px] text-[#4F4F4F] border border-[#E3FEC7] rounded-full">{t('sign.signature_sign_new_doc')}</button>
        }
      </div>
    </section>
  )
}

export default Sign