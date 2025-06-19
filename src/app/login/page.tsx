'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await login(username, password)
      Cookies.set('token', data.token, { expires: 7 })
      toast.success('Login successful')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#120e0a] flex items-center justify-center py-10">
      <div className="bg-[#181410] rounded-2xl shadow-lg p-8 w-full max-w-md border border-[#23201c]">
        <h2 className="text-white text-xl font-bold mb-2">Sign in to DashBet</h2>
        <p className="text-[#b0a89f] text-sm mb-6">
          Enter your admin credentials to access the dashboard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full rounded-lg bg-[#23201c] border border-[#23201c] text-white px-4 py-2 focus:outline-none focus:border-[#ff8800] transition"
            required
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg bg-[#23201c] border border-[#23201c] text-white px-4 py-2 focus:outline-none focus:border-[#ff8800] transition"
            required
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-[#ff8800] hover:bg-[#e67600] text-white font-bold py-2 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
} 