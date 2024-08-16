'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { FieldError } from 'react-hook-form'

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: FieldError | undefined
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <input
          {...props}
          ref={ref} // Forward the ref to the input element
          className={cn(
            'p-2 outline-primary shadow-sm border-2 rounded-lg border-primary text-primary bg-primary-light/20 w-full',
            className
          )}
        />
        {error && <p className="text-error text-sm">{error.message}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input' // Set displayName for better debugging
export default Input
