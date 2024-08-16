'use client'
export type CardProps = {} & React.HTMLAttributes<HTMLDivElement>
import { cn } from '@/lib/utils'
const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={cn(
        ' rounded-3xl border-2 border-border p-5 bg-foreground shadow-md ',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
