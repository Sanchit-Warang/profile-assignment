'use client'
import { useMutation } from '@tanstack/react-query'
import { register } from '@/server/Mutations'
import { z } from 'zod'
import { registerBody } from '@/schema/body'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useRegistrationMutaion = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: z.infer<typeof registerBody>) => {
      const { error, success } = await register(data)
      console.log(error)
      if (error) throw new Error(error)
      return success
    },
    onSuccess: () => {
      toast.success('Registered successfully')
      router.replace('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
