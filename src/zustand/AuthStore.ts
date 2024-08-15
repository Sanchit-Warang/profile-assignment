import { create } from 'zustand'
import { User } from '@prisma/client'

export type AuthStore = {
  user: User
  setUser: () => void
}

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}))
