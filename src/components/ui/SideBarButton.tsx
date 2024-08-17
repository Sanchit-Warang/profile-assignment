'use client'
// import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
// import { usePathname } from 'next/navigation'

export type SideBarButtonProps = {
  icon: React.ReactNode
  url?: string
  cb?: () => void
  isDisabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const SideBarButton = ({
  icon,
  url,
  cb,
  isDisabled = false,
  className,
  ...props
}: SideBarButtonProps) => {
  // const router = useRouter()

  return (
    <button
      disabled={isDisabled}
      suppressHydrationWarning
      {...props}
      className={cn(
        'p-3 bg-primary-content text-primary-light rounded-lg',
        className
      )}
      onClick={() => {
        if (url) {
          // router.push(url)
        }
        if (cb) {
          cb()
        }
      }}
    >
      {icon}
    </button>
  )
}

export default SideBarButton
