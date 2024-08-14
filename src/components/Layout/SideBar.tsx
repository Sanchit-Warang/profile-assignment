import { cn } from '@/lib/utils'

export type SideBarProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {}
const SideBar = ({ className }: SideBarProps) => {
  return <div className={cn('h-[100%] w-[70px]', className)}></div>
}
export default SideBar
