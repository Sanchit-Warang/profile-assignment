import { cn } from '@/lib/utils'

export type AvataarProps = {
  name: string
} & React.HTMLAttributes<HTMLDivElement>

const Avataar = ({ name, className, ...props }: AvataarProps) => {
  return (
    <div
      {...props}
      className={cn(
        'p-3 w-14 h-14 rounded-full bg-secondary-dark font-bold text-lg text-secondary-content flex justify-center items-center',
        className
      )}
    >
      <p>{name.charAt(0).toUpperCase()}</p>
    </div>
  )
}

export default Avataar
