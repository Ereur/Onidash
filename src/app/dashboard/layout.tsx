'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Licenses', href: '/dashboard/licenses', icon: '🔑' },
  { name: 'Generate', href: '/dashboard/generate', icon: '➕' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="min-h-screen flex bg-[#120e0a]">
      {/* Sidebar */}
      <aside className="w-20 sm:w-56 bg-[#181410] border-r border-[#23201c] flex flex-col items-center py-8">
        <div className="mb-10">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            ONI<span className="text-[#ff8800]">DASH</span>
          </span>
        </div>
        <nav className="flex flex-col gap-2 w-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg w-full font-semibold transition
                ${pathname === item.href
                  ? 'bg-[#23201c] text-[#ff8800] shadow'
                  : 'text-[#b0a89f] hover:bg-[#23201c] hover:text-white'}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full  bg-[#181410] rounded-2xl shadow-lg border border-[#23201c] p-8 min-h-[70vh]">
          {children}
        </div>
      </main>
    </div>
  )
} 