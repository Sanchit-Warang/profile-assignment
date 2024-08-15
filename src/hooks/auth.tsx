'use client'
import { useMutation } from '@tanstack/react-query'
import { register, login, logout } from '@/server/Mutations'
import { z } from 'zod'
import { registerBody, loginBody } from '@/schema/body'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/zustand/AuthStore'
import toast from 'react-hot-toast'

export const useRegistrationMutaion = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: z.infer<typeof registerBody>) => {
      const { error, success } = await register(data)
      if (error) throw new Error(error)
      if (success) return success
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

export const useLoginMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginBody>) => {
      const { error, success } = await login(data)
      console.log(error)
      if (error) throw new Error(error)
      if (success) return success
    },
    onSuccess: () => {
      toast.success('Logged in successfully')
      router.replace('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useLogoutMutation = () => {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  return useMutation({
    mutationFn: async () => {
      const { error, success } = await logout()
      console.log(error)
      if (error) throw new Error(error)
      if (success) return success
    },
    onSuccess: () => {
      toast.success('Logged out successfully')
      setUser(null)
      router.replace('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
