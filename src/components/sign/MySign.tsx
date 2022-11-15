const MySign = ({ signList }: {name: string, image: string}[] | any) => {
  return (
    <div className="flex-none w-[188px]">
      <h4 className="text-[#4F4F4F]">我的簽名檔</h4>
      <div className="mt-[20px] pt-[12px] pr-[4px] border border-[#FFFFFF] rounded-[5px]">
        <ul className="ctr-scrollbar overflow-y-auto flex flex-col items-center h-[500px]">
          {
            signList.length 
            ? signList.map((sign: {name: string, image: string} | any) => (
              <li className="signCard w-[160px] p-[8px] bg-[#FFFFFF80]">
                <h5 className="mb-[8px] text-[14px]">{ sign.name }</h5>
                <img src={ sign.image } alt="" />
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