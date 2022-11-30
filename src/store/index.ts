import { atom } from "jotai"
// 分messageBox 和 dialog

// messageBox: 文字內容、樣式
interface MessageBox {
  isDisplay: boolean,
  isMask: boolean,
  content: string,
  style?: string
}

// const messageBox = 

// dialog: 燈箱名稱，props 

// Jotai implementation
export const messageBox = atom<MessageBox>({isDisplay: false, isMask: false, content: ""})
export const displayMessageBox = atom(
  () => "",
  (get, set, props: MessageBox) => {
    set(messageBox, props)
    setTimeout(() => {
      set(messageBox, {isDisplay: false, isMask: false, content: ''})
    }, 3000)
  }
)