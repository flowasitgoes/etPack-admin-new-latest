import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EtPack ERP Admin',
  description: 'EtPack ERP Admin 07212025',
  generator: 'v+c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
