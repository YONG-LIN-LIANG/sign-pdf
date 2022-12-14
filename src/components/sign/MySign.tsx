import SignTrashcanIcon from "@/components/svg/SignTrashcan"
import { useAtom } from "jotai"
import { Sign, signListAtom, displayDialog } from "@/store/index"

const MySign = () => {
  const [signList,] = useAtom(signListAtom)
  const [, setDialog] = useAtom(displayDialog)
  const handleOpenDialog = (id: number) => {
    console.log('ddd')
    setDialog({isDisplay: true, dialogName: 'removeSign', props: {id}})
  }
  return (
    <div className="flex-none w-full lg:w-[188px]">
      <h4 className="text-[#4F4F4F]">我的簽名檔</h4>
      <div className="mt-[20px] lg:pt-[12px] pr-[4px] border border-[#FFFFFF] rounded-[5px]">
        <ul className="ctr-scrollbar overflow-x-auto lg:overflow-y-auto flex lg:flex-col items-center w-full max-h-[164px] lg:h-[500px] lg:max-h-full p-[12px] lg:p-0">
          {
            signList.length 
            ? signList.map((sign: Sign) => (
              <li key={sign.id} className="shrink-0 relative signCard w-[160px] p-[8px] bg-[#FFFFFF80]">
                <h5 className="mb-[8px] text-[14px]">{ sign.title }</h5>
                <div className="h-[70px]">
                  <img src={ sign.image } alt="" className="object-contain w-full h-full bg-[#fff]" />
                </div>
                
                <button onClick={() => handleOpenDialog(sign.id)} className="animation opacity-0 absolute right-0 bottom-0 flex-center w-[32px] h-[32px] bg-[#FF7070] rounded-[5px]"><SignTrashcanIcon /></button>
              </li>
            ))
            : <div>目前無簽名</div> 
          }
        </ul>
      </div>
    </div>
  )
}

export default MySign