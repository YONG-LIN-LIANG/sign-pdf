import LogoIcon from "@/components/svg/Logo"
import { useTranslation } from "react-i18next"
const Header = () => {
  const { t } = useTranslation()
  return (
    <header className="flex-center h-[80px] text-[24px] font-medium text-purple bg-[#E5E6F2]">
      <LogoIcon />
      <span className="ml-[12px]">{t('common.title')}</span>
    </header>
  )
  
}

export default Header