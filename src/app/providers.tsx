'use client'

/*
  workaround for https://github.com/nextauthjs/next-auth/issues/10016#issuecomment-1983672453
  the workaround is for Next Auth but is used for Custom Auth
*/

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
// import { usePathname } from 'next/navigation'
// import { useAuthStore } from '@/zustand/AuthStore'
// import { useCallback, useLayoutEffect } from 'react'
// import { getSession } from '@/server/Query'

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  const queryClient = getQueryClient()

  // Client Auth setup
  // const setUser = useAuthStore((state) => state.setUser)

  // const pathName = usePathname()

  // const fetchSession = useCallback(async () => {
  //   try {
  //     const { error, success } = await getSession()
  //     if (error) {
  //       throw new Error(error)
  //     }
  //     if (success !== undefined) {
  //       setUser(success)
  //     }
  //   } catch (error) {
  //     setUser(null)
  //     if (process.env.NODE_ENV === 'development') {
  //       console.error(error)
  //     }
  //   }
  // }, [])

  // useLayoutEffect(() => {
  //   fetchSession().finally()
  // }, [fetchSession, pathName])

  // Client Auth setup done

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider enableSystem attribute="class" defaultTheme="system">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers
