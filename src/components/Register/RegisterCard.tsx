'use client'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { registerBody } from '@/schema/body'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegistrationMutaion } from '@/hooks/auth'

const RegisterCard = () => {
  const registrationMutation = useRegistrationMutaion()

  const form = useForm<z.infer<typeof registerBody>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registerBody),
  })

  const onSubmit: SubmitHandler<z.infer<typeof registerBody>> = async (
    data
  ) => {
    await registrationMutation.mutateAsync(data)
  }

  return (
    <Card className="flex flex-col space-y-3 p-10  items-center w-[80vw] md:w-[30vw]">
      <p className="text-lg font-medium">Register Form</p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 w-full"
      >
        <Input
          {...form.register('name')}
          defaultValue=""
          error={form.formState.errors.name}
          placeholder="Name"
        />
        {form.formState.errors.name && (
          <p className="text-red-500">{form.formState.errors.name.message}</p>
        )}
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
            isDisabled={registrationMutation.isPending}
            typeof="submit"
            className="w-[100px]"
          >
            Register
          </Button>
        </center>
      </form>
      <Link
        href="/login"
        className="text-xs hover:text-primary hover:underline"
      >
        Already have an account, Login
      </Link>
    </Card>
  )
}

export default RegisterCard
