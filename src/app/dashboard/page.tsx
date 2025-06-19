'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getLicenses } from '@/lib/api'

interface LicenseStats {
  total: number
  active: number
  expired: number
  revoked: number
}

export default function DashboardPage() {
  console.log('Mounted')
  const [stats, setStats] = useState<LicenseStats>({
    total: 0,
    active: 0,
    expired: 0,
    revoked: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get('token')
        console.log('Token from cookies:', token)
        if (!token) return
        const licenses = await getLicenses(token)
        console.log("re:",licenses)
        const now = new Date()
        const stats = licenses.reduce(
          (acc: LicenseStats, license: any) => {
            acc.total++
            if (license.isRevoked) {
              acc.revoked++
            } else if (new Date(license.expiresAt) < now) {
              acc.expired++
            } else {
              acc.active++
            }
            return acc
          },
          { total: 0, active: 0, expired: 0, revoked: 0 }
        )
        console.log(stats)
        setStats(stats)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex flex-col gap-8 h-full w-full">
      <h1 className="text-2xl font-bold text-white mb-2">ONIDASH Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-[#23201c] rounded-xl p-6 flex flex-col items-start shadow border border-[#28231e]">
          <span className="text-[#ff8800] text-xs font-bold uppercase mb-2">Total</span>
          <span className="text-3xl font-extrabold text-white">{stats.total}</span>
        </div>
        <div className="bg-[#23201c] rounded-xl p-6 flex flex-col items-start shadow border border-[#28231e]">
          <span className="text-green-400 text-xs font-bold uppercase mb-2">Active</span>
          <span className="text-3xl font-extrabold text-white">{stats.active}</span>
        </div>
        <div className="bg-[#23201c] rounded-xl p-6 flex flex-col items-start shadow border border-[#28231e]">
          <span className="text-yellow-400 text-xs font-bold uppercase mb-2">Expired</span>
          <span className="text-3xl font-extrabold text-white">{stats.expired}</span>
        </div>
        <div className="bg-[#23201c] rounded-xl p-6 flex flex-col items-start shadow border border-[#28231e]">
          <span className="text-red-400 text-xs font-bold uppercase mb-2">Revoked</span>
          <span className="text-3xl font-extrabold text-white">{stats.revoked}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-[#23201c] rounded-xl p-6 shadow border border-[#28231e] flex flex-col gap-2">
          <h2 className="text-lg font-bold text-white mb-1">What is <span className="text-[#ff8800]">Generate</span>?</h2>
          <p className="text-[#b0a89f] text-sm">Create a new, unique license key for a user or device. Use this when you want to issue a new license for ONIDASH. Only admins can generate licenses.</p>
        </div>
        <div className="bg-[#23201c] rounded-xl p-6 shadow border border-[#28231e] flex flex-col gap-2">
          <h2 className="text-lg font-bold text-white mb-1">What is <span className="text-[#ff8800]">Validate</span>?</h2>
          <p className="text-[#b0a89f] text-sm">Check if a license key is valid, not expired, not revoked, and (optionally) bound to the correct machine. Use this to verify a license when a user logs in or starts ONIDASH.</p>
        </div>
      </div>
    </div>
  )
} 