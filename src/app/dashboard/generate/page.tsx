'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { format, addYears, endOfDay } from 'date-fns'
import Cookies from 'js-cookie'
import { generateLicense } from '@/lib/api'

export default function GeneratePage() {
  const [expiresAt, setExpiresAt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedLicenses, setGeneratedLicenses] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = Cookies.get('token')
      if (!token) {
        toast.error('Authentication required. Please log in again.')
        return
      }
      const formattedDate = endOfDay(new Date(expiresAt)).toISOString()
      const licenses: string[] = []
      for (let i = 0; i < quantity; i++) {
        const data = await generateLicense(token, formattedDate)
        licenses.push(data.key)
      }
      setGeneratedLicenses(licenses)
      toast.success(`Generated ${quantity} license${quantity > 1 ? 's' : ''} successfully`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate license')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (license: string) => {
    navigator.clipboard.writeText(license)
    toast.success('License key copied to clipboard')
  }

  return (
    <div className="min-h-screen bg-[#120e0a] flex items-center justify-center py-10">
      <div className="bg-[#181410] rounded-2xl shadow-lg p-8 w-full max-w-md border border-[#23201c]">
        <h2 className="text-white text-xl font-bold mb-2">Generate License – ONIDASH</h2>
        <p className="text-[#b0a89f] text-sm mb-6">
          Create a new license key for your ONIDASH environment. Set the expiration date and quantity.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="date"
            value={expiresAt}
            onChange={e => setExpiresAt(e.target.value)}
            className="w-full rounded-lg bg-[#23201c] border border-[#23201c] text-white px-4 py-2 focus:outline-none focus:border-[#ff8800] transition"
            required
          />
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={e => setQuantity(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full rounded-lg bg-[#23201c] border border-[#23201c] text-white px-4 py-2 focus:outline-none focus:border-[#ff8800] transition"
            required
            placeholder="Quantity"
          />
          <button
            type="submit"
            className="w-full bg-[#ff8800] hover:bg-[#e67600] text-white font-bold py-2 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : `Generate ${quantity} License${quantity > 1 ? 's' : ''}`}
          </button>
        </form>
        {generatedLicenses.length > 0 && (
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-2">Generated Keys</h3>
            <ul className="space-y-2">
              {generatedLicenses.map((key, idx) => (
                <li
                  key={key}
                  className="bg-[#23201c] rounded-lg px-4 py-2 flex items-center justify-between text-white"
                >
                  <span className="font-mono text-sm">{key}</span>
                  <button
                    onClick={() => handleCopy(key)}
                    className="ml-2 text-[#ff8800] hover:text-white transition font-bold"
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 