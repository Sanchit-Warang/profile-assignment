import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideBar from '@/components/Layout/SideBar'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Profile.fyi Assignment',
  description: 'Assignment for Porfile.fyi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          <div className="h-[100dvh] w-full flex flex-col-reverse md:flex-row bg-primary">
            <SideBar className="h-[9dvh] md:h-auto" />
            <div className=" bg-background flex-grow text-copy rounded-b-3xl md:rounded-l-3xl md:rounded-r-none  overflow-y-auto">
              <div className="mx-10 my-10">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
