import { cn } from '@/lib/utils'

export type AvataarProps = {
  name: string
} & React.HTMLAttributes<HTMLDivElement>

const Avataar = ({ name, className, ...props }: AvataarProps) => {
  return (
    <div
      {...props}
      className={cn(
        'p-2 w-full aspect-square rounded-full bg-secondary-dark font-bold text-lg text-secondary-content flex flex-col justify-center items-center',
        className
      )}
    >
      <p>{name.charAt(0).toUpperCase()}</p>
    </div>
  )
}

export default Avataar
