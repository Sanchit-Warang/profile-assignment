'use client'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  isDisabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const buttonVariants = cva(
  'rounded-lg min-w-[100px] border border-border py-2 px-3 text-sm font-medium shadow-sm hover:scale-110 transition-all ease-in-out',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-content',
        secondary: 'bg-secondary text-secondary-content',
        danger: 'bg-error text-error-content',
        success: 'bg-success text-success-content',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed hover:scale-100',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      isDisabled: false,
    },
  }
)

const Button = ({
  children,
  className,
  isDisabled = false,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={cn(
        buttonVariants({ variant }),
        isDisabled ? 'opacity-50' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
