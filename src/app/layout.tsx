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
    <html lang="en" className="light">
      <body className={`${inter.className}`}>
        <Providers>
          <div className="h-[100vh] w-full flex bg-primary">
            <SideBar />
            <div className="bg-background flex-grow text-copy rounded-l-3xl overflow-y-auto">
              <div className="mx-10 my-10">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
