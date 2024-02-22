import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import React from 'react'
import { DialogProviders } from '@/components/providers/dialog-providers'

const poppins = Poppins({
  preload: true,
  weight: ['400', '500', '600', '700', '300'],
  display: 'swap',
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for your projects'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <DialogProviders />
        {children}
      </body>
    </html>
  )
}
