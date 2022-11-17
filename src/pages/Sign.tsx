import ProgressBar1 from "@/components/svg/ProgressBar1"
import ProgressBar2 from "@/components/svg/ProgressBar2"
import ProgressBar3 from "@/components/svg/ProgressBar3"
import ProgressBar4 from "@/components/svg/ProgressBar4"
import CreateSign from "@/components/sign/CreateSign"
import UploadDocument from "@/components/sign/UploadDocument"
import StartSign from "@/components/sign/StartSign"
import DownloadResult from "@/components/sign/DownloadResult"
import { useState } from "react"
const Sign = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const handleSwitchStep = (step: number) => {
    setCurrentStep(step)
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
      <div className="w-[535px] mx-auto mb-[68px]">
        <div className="flex items-end">
          <div className="text-[#787CDA]">
            <ProgressBar1/>
          </div>
          <div className={`${ currentStep > 1 ? 'text-[#787CDA]' : 'text-[#F2F2F2]' } relative left-[-12px]`}>
            <ProgressBar2/>
          </div>
          <div className={`${ currentStep > 2 ? 'text-[#787CDA]' : 'text-[#F2F2F2]' } relative left-[-25px]`}>
            <ProgressBar3/>
          </div>
          <div className={`${ currentStep > 3 ? 'text-[#787CDA]' : 'text-[#F2F2F2]' } relative left-[-40px]`}>
            <ProgressBar4/>
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