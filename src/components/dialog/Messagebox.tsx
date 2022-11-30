import { useAtom } from "jotai"
import { messageBox } from '@/store/index'
const MessageBox = () => {
  const [message, _] = useAtom(messageBox)
  return (
    <section className={`messageBox text-[#333333] ${message.style} ${message.isDisplay ? 'messageBox--open' : 'messageBox--close'}`}> 
      {message.content}
    </section>
  )
}

export default MessageBox