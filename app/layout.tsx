import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from './contexts/auth-context'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: '工廠ERP系統',
  description: '專業的工廠企業資源規劃系統',
  generator: 'v+c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
