'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { getLicenses, revokeLicense } from '@/lib/api'

interface License {
  key: string
  createdAt: string
  expiresAt: string
  isRevoked: boolean
  isValid: boolean
  machineId?: string
  lastCheckedAt?: string
}

export default function LicensesPage() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLicenses = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        toast.error('Authentication required. Please log in again.')
        setIsLoading(false)
        return
      }
      const data = await getLicenses(token)
      setLicenses(data)
    } catch (error) {
      toast.error('Failed to fetch licenses')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevoke = async (key: string) => {
    try {
      const token = Cookies.get('token')
      if (!token) return
      await revokeLicense(token, key)
      toast.success('License revoked successfully')
      fetchLicenses()
    } catch (error) {
      toast.error('Failed to revoke license')
    }
  }

  useEffect(() => {
    fetchLicenses()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#b0a89f]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <h1 className="text-2xl font-bold text-white mb-8">ONIDASH Licenses</h1>
      <div className="bg-[#181410] rounded-2xl shadow-lg border border-[#23201c] overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-[#23201c]">
          <thead className="bg-[#181410]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#b0a89f] uppercase tracking-wider">License Key</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#b0a89f] uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#b0a89f] uppercase tracking-wider">Expires</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#b0a89f] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#b0a89f] uppercase tracking-wider">Machine ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#b0a89f] uppercase tracking-wider">Last Checked</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-[#b0a89f] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#181410] divide-y divide-[#23201c]">
            {licenses.map((license) => (
              <tr key={license.key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white">{license.key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b0a89f]">{format(new Date(license.createdAt), 'MMM d, yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b0a89f]">{format(new Date(license.expiresAt), 'MMM d, yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${license.isRevoked ? 'bg-red-900 text-red-300' : new Date(license.expiresAt) < new Date() ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'}`}>
                    {license.isRevoked ? 'Revoked' : new Date(license.expiresAt) < new Date() ? 'Expired' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b0a89f]">{license.machineId || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b0a89f]">{license.lastCheckedAt ? format(new Date(license.lastCheckedAt), 'MMM d, yyyy HH:mm') : '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {!license.isRevoked && (
                    <button
                      onClick={() => handleRevoke(license.key)}
                      className="bg-[#ff8800] hover:bg-[#e67600] text-white font-bold py-1 px-4 rounded-lg shadow transition"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 