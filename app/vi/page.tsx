"use client";

import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'

export default function WalletsPage() {
  const { wallets } = useAppStore()
  return (
    <main className="p-4 space-y-3">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">V?</h1>
        <Link href="/vi/tao" className="text-brand-700 inline-flex items-center gap-2"><PlusCircle className="w-5 h-5"/>Th?m v?</Link>
      </header>
      <div className="space-y-3">
        {wallets.map(w => (
          <Link key={w.id} href={`/vi/${w.id}`} className="block bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{w.name}</p>
                <p className="text-xs text-gray-500 capitalize">{w.type}</p>
              </div>
              <p className="font-semibold">{formatCurrency(w.balance)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
