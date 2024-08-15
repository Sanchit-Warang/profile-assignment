import LoginCard from '@/components/Login/LoginCard'

const LoginPage = () => {
  return (
    <main className="space-y-4">
      <h1 className=" text-3xl font-semibold">Login Page</h1>
      <div className="flex justify-center w-full mt-10">
        <LoginCard />
      </div>
    </main>
  )
}

export default LoginPage
