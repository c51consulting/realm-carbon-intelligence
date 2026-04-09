import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'REALM Carbon Intelligence',
  description: 'Localised carbon condition and opportunity signal service for US farms and paddocks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">R</div>
            <span className="font-semibold text-lg">REALM Carbon Intelligence</span>
          </div>
          <div className="text-sm text-gray-400">Part of the REALM Overlay Ecosystem</div>
        </nav>
        {children}
      </body>
    </html>
  )
}
