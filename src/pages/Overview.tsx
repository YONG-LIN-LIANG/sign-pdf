import { Link } from "react-router-dom"
const Overview = () => {
  const buttonStyle = 'flex-center w-[180px] py-[10px] text-[14px] bg-[#E3FEC7] rounded-full'
  const stepList = [
    {
      id: 1,
      title: '建立簽名檔',
      desc1: '可以選擇手寫簽名',
      desc2: '或上傳簽名檔',
    },
    {
      id: 2,
      title: '上傳簽署文件',
      desc1: '檔案格式 pdf / jpg',
      desc2: '檔案大小 <1MB',
    },
    {
      id: 3,
      title: '簽名',
      desc1: '將建立的簽名檔加入檔案',
      desc2: '調整到適當位置完成簽署',
    },
    {
      id: 4,
      title: '下載簽署文件',
      desc1: '預覽並下載簽署檔案',
      desc2: '可選擇pdf / jpg',
    },
  ]

  return (
    <section className="flex flex-col items-center mx-auto">
      <h4 className="mt-[30px] mb-[60px] text-[18px]">簽名流程</h4>
      <div className="flex">
        {
          stepList.map(step => (
            <div className="cardStyle text-center">
              <h5 className="text-[#787CDA] text-[14px]">step { step.id }</h5>
              <h2 className="mt-[10px]">{ step.title }</h2>
              <div className="flex flex-col mt-[32px] text-[14px] text-[#828282]">
                <span>{ step.desc1 }</span>
                <span>{ step.desc2 }</span>
              </div>
              <img className="mt-[32px]" src={`/src/assets/image/overview${ step.id }.png`} alt="process" />
            </div>
          ))
        }
      </div>
      <button className={`${buttonStyle} my-[60px]`}>
        <Link to="/">開始簽名</Link>
      </button>
    </section>
  )
}

export default Overview