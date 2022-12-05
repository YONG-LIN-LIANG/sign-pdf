import ProgressBarIcon from "@/components/svg/ProgressBar"
import CreateSign from "@/components/sign/CreateSign"
import UploadDocument from "@/components/sign/UploadDocument"
import StartSign from "@/components/sign/StartSign"
import DownloadResult from "@/components/sign/DownloadResult"
import { useState, useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { setSignList } from '@/store/index'
const Sign = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [, displaySignList] = useAtom(setSignList)
  const progressBarRef = useRef<any>(null)
  useEffect(() => {
    displaySignList()
    if(progressBarRef) {
      const pathLength = progressBarRef.current.getTotalLength()
      console.log('hhh', pathLength, pathLength/2, progressBarRef.current.class)
      progressBarRef.current.style.strokeDasharray = pathLength;
      progressBarRef.current.style.animation = `zeroToStep${currentStep} ${currentStep/2}s linear forwards`
    }
  },[])
  const handleSwitchStep = (step: number) => {
    scrollTo(0, 0)
    setCurrentStep(step)
    progressBarRef.current.style.animation = `step${step-1}ToStep${step} 1s linear forwards`
  }
  const stepList = [
    {
      id: 1,
      name: '建立簽名檔',
      style: 'left-[-17px]'
    },
    {
      id: 2,
      name: '上傳簽署文件',
      style: 'left-[-22px]'
    },
    {
      id: 3,
      name: '簽名',
      style: ''
    },
    {
      id: 4,
      name: '下載簽署文件',
      style: 'right-[-25px]'
    },
  ]
  return (
    <section className="mx-auto">
      <div className="w-[546px] mx-auto mb-[68px]">
        <div className="flex items-end">
          {/* 背景 */}
          <div className="absolute text-[#F2F2F2] z-[5]">
            <ProgressBarIcon />
          </div>
          {/* 目前進度 */}
          <div className="relative z-[10]">
            <svg width="543" height="63" viewBox="0 0 543 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path ref={progressBarRef} d="M539.817 58.801C523.388 49.5565 509.817 37.917 508.483 22.1103C507.15 6.3036 511.817 3.33386 514.245 3.33386C516.674 3.33386 521.483 7.74058 521.579 21.0086C521.674 34.2767 517.579 47.9279 490.341 55.1606C463.102 62.3934 395.96 58.8489 379.674 55.7833C360.722 52.1909 343.864 40.6472 344.626 20.6254C345.531 -2.12663 359.531 3.62126 359.436 20.6254C359.388 29.7741 356.007 40.9825 338.198 50.227C319.055 60.1421 271.341 59.6632 271.341 59.6632C271.341 59.6632 223.817 60.1421 204.722 50.227C186.96 40.9825 183.579 29.822 183.579 20.6254C183.483 3.62126 197.483 -2.12663 198.341 20.6254C199.102 40.6472 182.293 52.1909 163.436 55.7833C147.198 58.8489 80.293 62.3934 53.1501 55.1606C26.0073 47.9279 21.912 34.3246 22.0072 21.0086C22.1025 7.69268 26.8644 3.33386 29.293 3.33386C31.7215 3.33386 36.3882 6.3036 35.0549 22.1103C33.7215 37.917 20.2453 49.5565 3.81677 58.801" stroke="#787CDA" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
          </div>
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
      {
        currentStep === 1 
        ? <CreateSign />
        : currentStep === 2
        ? <UploadDocument />
        : currentStep === 3
        ? <StartSign />
        : currentStep === 4
        ? <DownloadResult />
        : null
      }

      {/* step也用全局狀態管理 */}
      <div className="flex justify-center mt-[60px]">
        {
          currentStep !== 1 && <button className="flex-center w-[180px] h-[40px] text-[14px] text-[#4F4F4F] border border-[#E3FEC7] rounded-full" onClick={() => handleSwitchStep(currentStep - 1)}>上一步</button>
        }
        {
          currentStep === 1 && <button className="flex-center w-[180px] h-[40px] ml-[20px] text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full" onClick={() => handleSwitchStep(currentStep + 1)}>下一步</button>
        }
        {
          currentStep === 2
          ? <button className="flex-center w-[180px] h-[40px] ml-[20px] text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full" onClick={() => handleSwitchStep(3)}>前往簽名</button>
          : currentStep === 3
          ? <button className="flex-center w-[180px] h-[40px] ml-[20px] text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full" onClick={() => handleSwitchStep(4)}>前往下載</button>
          : currentStep === 4
          ? <button className="flex-center w-[180px] h-[40px] ml-[20px] text-[14px] text-[#4F4F4F] bg-[#E3FEC7] rounded-full">下載pdf</button>
          : null
        }
        {
          currentStep === 4 && <button className="flex-center w-[180px] h-[40px] ml-[20px] text-[14px] text-[#4F4F4F] border border-[#E3FEC7] rounded-full">再簽一份</button>
        }
      </div>
    </section>
  )
}

export default Sign