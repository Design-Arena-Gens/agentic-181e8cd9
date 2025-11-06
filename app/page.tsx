"use client";

import Link from 'next/link'
import { Wallet, PlusCircle, History, Layers } from 'lucide-react'
import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'

export default function HomePage() {
  const { initDemo, wallets, transactions, categories } = useAppStore()

  useEffect(() => {
    initDemo()
  }, [initDemo])

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)
  const today = new Date().toISOString().slice(0,10)
  const todayTx = transactions.filter(t => t.date.slice(0,10) === today)

  return (
    <main className="p-4 space-y-4">
      <header className="pt-4">
        <h1 className="text-2xl font-bold">Qu?n l? T?i ch?nh</h1>
        <p className="text-sm text-gray-500">Theo d?i v?, danh m?c, giao d?ch</p>
      </header>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">T?ng s? d?</p>
            <p className="text-2xl font-semibold">{formatCurrency(totalBalance)}</p>
          </div>
          <Link href="/giao-dich/tao" className="inline-flex items-center gap-2 text-brand-700">
            <PlusCircle className="w-5 h-5" /> Th?m giao d?ch
          </Link>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Wallet className="w-5 h-5"/> V? c?a t?i</h2>
          <Link href="/vi" className="text-sm text-brand-700">Xem t?t c?</Link>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {wallets.slice(0,3).map(w => (
            <Link key={w.id} href={`/vi/${w.id}`} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{w.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{w.type}</p>
                </div>
                <p className="text-right font-semibold">{formatCurrency(w.balance)}</p>
              </div>
            </Link>
          ))}
          <Link href="/vi/tao" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-gray-300 text-gray-600">
            <PlusCircle className="w-5 h-5"/> Th?m v? m?i
          </Link>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2"><History className="w-5 h-5"/> H?m nay</h2>
          <Link href="/giao-dich" className="text-sm text-brand-700">B? l?c & L?ch s?</Link>
        </div>
        <div className="bg-white rounded-xl divide-y shadow-sm">
          {todayTx.slice(0,5).map(tx => (
            <div key={tx.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{categories.find(c => c.id === tx.category_id)?.name || 'Danh m?c'}</p>
                <p className="text-xs text-gray-500">{tx.description || 'Kh?ng c? ghi ch?'}</p>
              </div>
              <p className={tx.type === 'expense' ? 'text-red-600 font-semibold' : 'text-green-700 font-semibold'}>
                {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
              </p>
            </div>
          ))}
          {todayTx.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">Ch?a c? giao d?ch h?m nay</div>
          )}
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
        <div className="container-mobile grid grid-cols-3">
          <Link href="/" className="py-3 text-center text-brand-700">Trang ch?</Link>
          <Link href="/giao-dich" className="py-3 text-center text-gray-600">Giao d?ch</Link>
          <Link href="/danh-muc" className="py-3 text-center text-gray-600">Danh m?c</Link>
        </div>
      </nav>
    </main>
  )
}
