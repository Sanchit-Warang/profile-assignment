export type CardProps = {} & React.HTMLAttributes<HTMLDivElement>
import { cn } from '@/lib/utils'
const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={cn("rounded-lg border border-border p-5 bg-foreground", className)}
    >
      {children}
    </div>
  )
}

export default Card
