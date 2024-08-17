import { create } from 'zustand'
import { Token } from '@/lib/auth/session'

export type AuthStore = {
  user: Token | null
  // eslint-disable-next-line no-unused-vars
  setUser: (user: Token | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: Token | null) => {
    set({ user })
  },
}))
