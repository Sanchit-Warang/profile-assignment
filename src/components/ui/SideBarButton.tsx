'use client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export type SideBarButtonProps = {
  icon: React.ReactNode
  name?: string
  url?: string
  cb?: () => void
  isDisabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const SideBarButton = ({
  icon,
  url,
  name = '',
  cb,
  isDisabled = false,
  className,
  ...props
}: SideBarButtonProps) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <button
      disabled={isDisabled}
      suppressHydrationWarning
      {...props}
      className={cn(
        'p-3 rounded-lg flex flex-col justify-center items-center w-full',
        url == pathname
          ? 'bg-primary-light  text-primary-content'
          : 'bg-primary-content text-primary-light',
        className
      )}
      onClick={() => {
        if (url) {
          router.push(url)
        }
        if (cb) {
          cb()
        }
      }}
    >
      {icon}
      <span className="text-xs">{name}</span>
    </button>
  )
}

export default SideBarButton
