'use client'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import SideBarButton from '../ui/SideBarButton'
import { User, ShoppingCart, Boxes, UserPlus, LogOut } from 'lucide-react'
import { useAuthStore } from '@/zustand/AuthStore'
import { useLogoutMutation } from '@/hooks/auth'
import Avatar from 'react-avatar';

export type SideBarProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {}
const SideBar = ({ className }: SideBarProps) => {
  const logOutMutation = useLogoutMutation()
  const { theme, setTheme } = useTheme()
  const user = useAuthStore((state) => state.user)

  return (
    <div className={cn('h-[100%] bg-primary sticky p-5', className)}>
      <div className="sidebar flex flex-row  md:flex-col justify-center items-center md:space-y-7 space-x-4 md:space-x-0 ">
        <button
          suppressHydrationWarning
          className="text-primary-content
        "
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Sun /> : <Moon />}
        </button>
        {user && <Avatar name={user.name} size='55' round />}
        <SideBarButton url={'/'} icon={<Boxes />} />
        {!user && (
          <>
            <SideBarButton url={'/login'} icon={<User />} />
            <SideBarButton url={'/register'} icon={<UserPlus />} />
          </>
        )}
        {user && (
          <>
            <SideBarButton
              isDisabled={logOutMutation.isPending}
              cb={() => logOutMutation.mutateAsync()}
              icon={<LogOut />}
            />
            <SideBarButton url={'/cart'} icon={<ShoppingCart />} />
          </>
        )}
      </div>
    </div>
  )
}
export default SideBar
