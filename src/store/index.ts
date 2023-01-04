import { atom } from "jotai"
import { PDFDocumentProxy } from 'pdfjs-dist';
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
export const pdfAtom = atom<PDFDocumentProxy | null>(null)
export const stepAtom = atom<number>(1)
export const pdfCombinePageAtom = atom<number>(1)
export const signToPdfAtom = atom<{page: number, imageUrl: string} | null>(null)
// export const selectSign = atom<string>("")
export const setCurrentState = atom(
  () => "",
  (get, set, {step}) => {
    set(stepAtom, step)
  }
)
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

export const setPdf = atom(
  () => "",
  (get, set, {pdf}) => {
    set(pdfAtom, pdf)
  }
)

export const setPdfCombinePage = atom(
  () => "",
  (get, set, {page}) => {
    set(pdfCombinePageAtom, page)
  }
)

export const setSignToPdf = atom(
  () => "",
  (get, set, {page, imageUrl}) => {
    set(signToPdfAtom, {page, imageUrl})
    setTimeout(() => {
      set(signToPdfAtom, {page: 0, imageUrl: ""})
    }, 100)
  }
)

// export const setSelectSign = atom(
//   () => "",
//   (get, set, {url}) => {

//   }
// )