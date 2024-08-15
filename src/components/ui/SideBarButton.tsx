import { cn } from '@/lib/utils'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'

export type SideBarButtonProps = {
  icon: React.ReactNode
  url: string
} & React.HTMLAttributes<HTMLButtonElement>

const SideBarButton = ({
  icon,
  url,
  className,
  ...props
}: SideBarButtonProps) => {
  return (
    <Link href={url}>
      <button
        suppressHydrationWarning
        {...props}
        className={cn(
          'p-3 bg-primary-content text-primary-light rounded-lg',
          className
        )}
      >
        {icon}
      </button>
    </Link>
  )
}

export default SideBarButton
