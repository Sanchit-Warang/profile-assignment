'use client'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginBody } from '@/schema/body'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '@/hooks/auth'

const LoginCard = () => {
  const loginMutation = useLoginMutation()

  const form = useForm<z.infer<typeof loginBody>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginBody),
  })

  const onSubmit: SubmitHandler<z.infer<typeof loginBody>> = async (data) => {
    await loginMutation.mutateAsync(data)
  }

  const guestLogin = async () => {
    await loginMutation.mutateAsync({
      email: 'guest@gmail.com',
      password: 'guest',
    })
  }

  return (
    <Card className="flex flex-col space-y-3 p-10  items-center w-[80vw] md:w-[30vw]">
      <p className="text-lg font-medium">Login Form</p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 w-full"
      >
        <Input
          {...form.register('email')}
          defaultValue=""
          error={form.formState.errors.email}
          placeholder="Email"
        />
        <Input
          {...form.register('password')}
          defaultValue=""
          error={form.formState.errors.password}
          placeholder="Password"
          type="password"
        />
        <center>
          <Button
            isDisabled={loginMutation.isPending}
            typeof="submit"
            className="w-[100px]"
          >
            Login
          </Button>
        </center>
      </form>
      <Button isDisabled={loginMutation.isPending} onClick={() => guestLogin()} variant='secondary'>Guest Login</Button>
      <Link
        href="/register"
        className="text-xs hover:text-primary hover:underline"
      >
        Create new account
      </Link>
    </Card>
  )
}

export default LoginCard
