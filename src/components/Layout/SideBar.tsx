'use client'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import SideBarButton from '../ui/SideBarButton'
import { User, ShoppingCart, Boxes, UserPlus } from 'lucide-react'

export type SideBarProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {}
const SideBar = ({ className }: SideBarProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className={cn('h-[100%] bg-primary sticky p-5', className)}>
      <div className="flex flex-row  md:flex-col justify-center items-center md:space-y-7 space-x-4 md:space-x-0">
        <button
          suppressHydrationWarning
          className="text-primary-content
        "
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Sun /> : <Moon />}
        </button>
        <SideBarButton url={'/'} icon={<Boxes />} />
        <SideBarButton url={'/login'} icon={<User />} />
        <SideBarButton url={'/cart'} icon={<ShoppingCart />} />
        <SideBarButton url={'/register'} icon={<UserPlus />} />
      </div>
    </div>
  )
}
export default SideBar
