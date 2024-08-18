'use client'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export type ChipProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
} & React.HTMLAttributes<HTMLDivElement>

const chipVariants = cva(
  ' rounded-full border flex justify-center items-center border-border py-2 px-3 text-sm font-medium shadow-sm hover:scale-110 transition-all ease-in-out',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-content',
        secondary: 'bg-secondary text-secondary-content',
        danger: 'bg-error text-error-content',
        success: 'bg-success text-success-content',
        warning: 'bg-warning text-warning-content',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

const Chip = ({
  children,
  className,
  variant = 'primary',
  ...props
}: ChipProps) => {
  return (
    <div className={cn(chipVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export default Chip
