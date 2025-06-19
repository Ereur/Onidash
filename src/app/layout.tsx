import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DashBet License Dashboard',
  description: 'Manage your software licenses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#120e0a] text-white font-sans">
        {children}
      </body>
    </html>
  )
} 