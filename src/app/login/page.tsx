import Card from '@/components/ui/Card'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <main className="space-y-4">
      <h1 className=" text-3xl font-semibold">Login Page</h1>
      <div className="flex justify-center w-full mt-10">
        <Card className='flex flex-col space-y-3 items-center'>
          <p>Login Form</p>
          <Link href="/register" className='text-xs hover:text-primary'>Create new account</Link>
        </Card>
      </div>
    </main>
  )
}

export default LoginPage
