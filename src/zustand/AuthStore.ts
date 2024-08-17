import { create } from 'zustand'
import { Token } from '@/lib/auth/session'

const getUserInfoFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const jsonString = localStorage.getItem('userInfo')
    return jsonString !== null ? JSON.parse(jsonString) : null
  }
  return null
}

export type AuthStore = {
  user: Token | null
  // eslint-disable-next-line no-unused-vars
  setUser: (user: Token | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: getUserInfoFromLocalStorage(),
  setUser: (user: Token | null) => {
    set({ user })
    localStorage.setItem('userInfo', JSON.stringify(user))
  },
}))
