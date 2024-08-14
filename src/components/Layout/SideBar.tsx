'use client'
import { cn } from '@/lib/utils'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export type SideBarProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {}
const SideBar = ({ className }: SideBarProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className={cn('transition-all h-[100%] p-5', className)}>
      <button
        className="mx-auto text-primary-content
        "
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}
export default SideBar
