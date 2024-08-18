'use client'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import SideBarButton from '../ui/SideBarButton'
import { User, Boxes, UserPlus, LogOut } from 'lucide-react'
import { useAuthStore } from '@/zustand/AuthStore'
import { useLogoutMutation } from '@/hooks/auth'
import Avataar from '../ui/Avataar'
import CartSideButton from '../Cart/CartSideButton'
import Image from 'next/image'
import Link from 'next/link'

export type SideBarProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {}
const SideBar = ({ className }: SideBarProps) => {
  const logOutMutation = useLogoutMutation()
  const { theme, setTheme } = useTheme()
  const user = useAuthStore((state) => state.user)

  return (
    <div className={cn('h-[100%] bg-opacity-0 sticky p-5', className)}>
      <div className="sidebar flex flex-row  md:flex-col justify-center items-center md:space-y-7 space-x-4 md:space-x-0 ">
        <div className="w-full flex justify-center items-center">
          <Link href={'/'}>
            <Image
              src="/images/download.svg"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        {user && <Avataar name={user.name} />}
        <SideBarButton name="products" url={'/'} icon={<Boxes />} />
        {!user && (
          <>
            <SideBarButton name="login" url={'/login'} icon={<User />} />
            <SideBarButton
              name="register"
              url={'/register'}
              icon={<UserPlus />}
            />
          </>
        )}
        {user && (
          <>
            <CartSideButton />
            <SideBarButton
              name="logout"
              isDisabled={logOutMutation.isPending}
              cb={() => logOutMutation.mutateAsync()}
              icon={<LogOut />}
            />
          </>
        )}
        <button
          suppressHydrationWarning
          className="text-primary-content
        "
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  )
}
export default SideBar
