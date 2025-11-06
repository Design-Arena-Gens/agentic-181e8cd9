import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qu?n l? T?i ch?nh C? nh?n',
  description: '?ng d?ng qu?n l? v?, danh m?c, giao d?ch - ti?ng Vi?t',
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gray-50`}> 
        <div className="container-mobile min-h-screen pb-16">
          {children}
        </div>
      </body>
    </html>
  )
}
