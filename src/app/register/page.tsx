import RegisterCard from '@/components/Register/RegisterCard'

const RegisterPage = () => {
  return (
    <main className="space-y-4">
      <h1 className=" text-3xl font-semibold">Register Page</h1>
      <div className="flex justify-center w-full mt-10">
        <RegisterCard />
      </div>
    </main>
  )
}

export default RegisterPage
