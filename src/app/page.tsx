'use client'

import { useState } from 'react'
import Image from 'next/image'

const MAC_DOWNLOAD = 'https://github.com/Ereur/Onidash/releases/download/v1.0.0/onidash-1.0.0-arm64-mac.zip'
const WIN_DOWNLOAD = 'https://github.com/Ereur/Onidash/releases/download/v1.0.0/onidash-1.0.0-win.zip'
const ICON_SRC = '/128x128.png'
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD

const FEATURES = [
  {
    title: 'Real-time Dashboard',
    desc: 'Monitor all your financial transactions and earnings in one place, with live analytics and beautiful charts.'
  },
  {
    title: 'Secure Automation',
    desc: 'Automate repetitive tasks and ensure your data is always safe, with robust security and privacy controls.'
  }
]

export default function LandingPage() {
  const [entered, setEntered] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      setEntered(true)
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#120e0a] flex flex-col items-center justify-start w-full">
      {/* Hero Section */}
      <header className="w-full max-w-3xl flex flex-col items-center justify-center pt-20 pb-10 px-4">
        <Image src={ICON_SRC} alt="onidash icon" width={72} height={72} className="mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight text-center">
          ONI<span className="text-[#ff8800]">DASH</span>
        </h1>
        <p className="text-lg md:text-xl text-[#ff8800] font-semibold mb-2 text-center">Your all-in-one financial operations dashboard</p>
        <p className="text-[#b0a89f] text-center max-w-xl mb-6">
          Manage, track, and automate your financial transactions with ease. onidash brings powerful analytics and secure automation to your desktop.
        </p>
        <div className="bg-[#23201c] border border-[#ff8800] rounded-lg px-4 py-3 mb-4 max-w-xl w-full text-center">
          <span className="text-[#ff8800] font-semibold">Privacy First:</span> <span className="text-[#b0a89f]">We never send your credentials or any sensitive information to any server. Everything is processed and stored <b>locally</b> on your computer. Credentials are only used to generate your data and never leave your device.</span>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-3xl flex flex-col md:flex-row gap-6 justify-center items-stretch mb-16 px-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex-1 bg-[#181410] border border-[#23201c] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-[#b0a89f] text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Download Section */}
      <section className="w-full max-w-md bg-[#181410] border border-[#23201c] rounded-2xl shadow-lg p-8 flex flex-col items-center mb-20">
        <h2 className="text-2xl font-bold text-white mb-4">Download onidash</h2>
        <p className="text-[#b0a89f] text-center mb-6 text-sm">Enter the password to unlock downloads for Mac and Windows.</p>
        {!entered ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="password"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg bg-[#23201c] border border-[#23201c] text-white px-4 py-2 focus:outline-none focus:border-[#ff8800] transition"
              required
            />
            {error && <div className="text-red-400 text-xs text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#ff8800] hover:bg-[#e67600] text-white font-bold py-2 rounded-lg shadow transition"
            >
              Unlock Downloads
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4 w-full mt-2">
            <a
              href={MAC_DOWNLOAD}
              className="w-full bg-[#ff8800] hover:bg-[#e67600] text-white font-bold py-2 rounded-lg shadow text-center transition"
              download
            >
              Download for Mac
            </a>
            <a
              href={WIN_DOWNLOAD}
              className="w-full bg-[#23201c] border border-[#ff8800] hover:bg-[#ff8800] hover:text-white text-[#ff8800] font-bold py-2 rounded-lg shadow text-center transition "
              // tabIndex={-1}
              // aria-disabled="true"
            >
              Download for Windows
            </a>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-[#b0a89f] pb-6">&copy; {new Date().getFullYear()} onidash. All rights reserved.</footer>
    </div>
  )
}
