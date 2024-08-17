'use client'
import { useMutation } from '@tanstack/react-query'
import { register, login, logout } from '@/server/Mutations'
import { z } from 'zod'
import { registerBody, loginBody } from '@/schema/body'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/zustand/AuthStore'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

export const useRegistrationMutaion = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: z.infer<typeof registerBody>) => {
      const { error, success } = await register(data)
      if (error) throw new Error(error)
      if (success) return success
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      toast.success('Registered successfully')
      router.replace('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginBody>) => {
      const { error, success } = await login(data)
      console.log(error)
      if (error) throw new Error(error)
      if (success) return success
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      toast.success('Logged in successfully')
      router.replace('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  return useMutation({
    mutationFn: async () => {
      const { error, success } = await logout()
      console.log(error)
      if (error) throw new Error(error)
      if (success) return success
    },
    onSuccess: async () => {
      setUser(null)
      router.replace('/')
      await queryClient.setQueryData(['cart'], () => [])
      await queryClient.invalidateQueries()
      toast.success('Logged out successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
