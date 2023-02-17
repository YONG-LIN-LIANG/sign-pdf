import CheckedIcon from "../components/svg/Checked"
import BackgroundImage from "@/components/svg/LoginBackground"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
const Login = () => {
  const { t } = useTranslation()
  const featureList = [
    `${t('login.select_stored_sign')}`, `${t('login.build_and_keep_sign')}`, `${t('login.check_signed_docs')}`
  ]
  const buttonStyle = 'flex-center w-full py-[10px] text-[14px] bg-[#E3FEC7] rounded-full'
  const cardStyle = 'flex flex-col w-[265px] min-h-[425px] px-[38px] py-[32px] rounded-[30px] rounded-br-[2px] bg-[#ffffff80] hover:shadow-[0_4px_32px_rgba(178,167,209,0.5)] transition-all ease-in-out duration-500'
  const quickSignCardStyle = 'min-h-max flex flex-col w-[265px] h-full min-h-[200px] mmd:min-h-[425px] px-[38px] py-[32px] rounded-[30px] rounded-br-[2px] bg-[#ffffff80] hover:shadow-[0_4px_32px_rgba(178,167,209,0.5)] transition-all ease-in-out duration-500'
  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full z-0 mix-blend-color overflow-hidden">
        <BackgroundImage />
      </div>
    
      <section className={`relative z-[10] flex flex-col mmd:flex-row justify-center items-center m-auto`}>
        <form className={`${cardStyle}`}>
          <h4 className="text-purple text-center">{t('common.login')}</h4>
          <ul className="my-[32px] text-[14px]">
            {featureList.map((feature, index) => (
              <li key={index} className="featureList flex items-center">
                <div className="flex-none w-[12px] h-[12px]">
                  <CheckedIcon />
                </div>
                <span className="ml-[9px] text-[#4F4F4F]">{ feature }</span>
              </li>
            ))}
          </ul>
          <div>
            <input className="loginInput" type="text" placeholder={`${t('login.email')}`} />
          </div>
          <div className="mt-[12px]">
            <input className="loginInput" type="password" placeholder={`${t('login.password')}`} />
          </div>
          <div className="w-full max-w-[180px] mx-auto mt-[38px]">
            <Link to="/" className="block w-full px-[10px] text-left text-[#8DAC82] text-[14px]">{t('login.register')}</Link>
            <button className={`${buttonStyle} mt-[10px]`}>{t('common.login')}</button>
          </div>
        </form>
        <div className={`${quickSignCardStyle} mt-[30px] mmd:mt-0 mmd:ml-[30px] ${window.navigator.language.includes("en") ? "mmd:h-[509px]" : ""}`}>
          <h4 className="text-purple text-center">{t('login.quick_sign')}</h4>
          <span className="mt-[32px] mb-[20px] text-center text-[14px]">{t('login.sign_as_visitor')}</span>
          <Link to="/sign" className={`${buttonStyle} mt-auto`}>{t('login.start_sign')}</Link>
        </div>
      </section>
    </>
  )
}

export default Login