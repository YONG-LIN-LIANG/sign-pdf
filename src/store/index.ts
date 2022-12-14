import { atom } from "jotai"
// 分messageBox 和 dialog

// messageBox: 文字內容、樣式
interface MessageBox {
  isDisplay: boolean,
  isMask: boolean,
  dialogName: string,
  content: string,
  basicStyle?: string,
  logoStyle?: string
}
interface Dialog {
  isDisplay: boolean,
  dialogName: string,
  props?: {
    id?: number
  }
}
export interface Sign {
  id: number,
  title: string,
  image: string,
}
// const messageBox = 

// dialog: 燈箱名稱，props 

// Jotai implementation
export const messageBox = atom<MessageBox>({isDisplay: false, isMask: false, dialogName: '', content: ""})
export const dialogAtom = atom<Dialog>({isDisplay: false, dialogName: '', props: {}})
export const signListAtom = atom<Sign[]>([])

export const displayMessageBox = atom(
  () => "",
  (get, set, props: MessageBox) => {
    set(messageBox, props)
    setTimeout(() => {
      set(messageBox, {isDisplay: false, isMask: false, dialogName: '', content: ''})
    }, 3000)
  }
)
export const displayDialog = atom(
  () => "",
  (get, set, props: Dialog) => {
    console.log('jjj', props)
    set(dialogAtom, props)
  }
)

export const setSignList = atom(
  () => "",
  (get, set) => {
    let signList = localStorage.getItem('signList')
    if(signList !== null) {
      const currentList = JSON.parse(signList)
      set(signListAtom, currentList)
    }
  }
  
)

export const addSign = atom(
  () => "",
  (get, set, props: Sign) => {
    let signList = localStorage.getItem('signList')
    if(signList !== null) {
      const currentList = JSON.parse(signList)
      currentList.unshift(props)
      console.log('zzz', currentList)
      set(signListAtom, currentList)
      localStorage.setItem('signList', JSON.stringify(currentList))
    }else {
      localStorage.setItem('signList', JSON.stringify([props]))
      set(signListAtom, [props])
      console.log('yyy', signList)
    }
  }
)

export const removeSign = atom(
  () => "",
  (get, set, {id}) => {
    const oldList = get(signListAtom)
    const newList = oldList.filter(i => i.id !== id)
    let signList = localStorage.getItem('signList')
    if(signList !== null) {
      localStorage.setItem('signList', JSON.stringify(newList))
      set(signListAtom, newList)
    }
  }
)