"use client";

import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { formatCurrency } from '@/lib/utils'

export default function TransactionsPage() {
  const { transactions, categories, wallets } = useAppStore()
  const [date, setDate] = useState<string>('')
  const [type, setType] = useState<string>('all')
  const [category, setCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (type !== 'all' && t.type !== type) return false
      if (category !== 'all' && t.category_id !== category) return false
      if (date) {
        const d = dayjs(date)
        if (dayjs(t.date).format('YYYY-MM-DD') !== d.format('YYYY-MM-DD')) return false
      }
      return true
    })
  }, [transactions, type, category, date])

  return (
    <main className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Giao d?ch</h1>
        <Link href="/giao-dich/tao" className="text-brand-700">Th?m</Link>
      </header>

      <section className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-3 gap-2">
          <select value={type} onChange={e=>setType(e.target.value)} className="border rounded-lg p-2">
            <option value="all">T?t c?</option>
            <option value="expense">Chi</option>
            <option value="income">Thu</option>
          </select>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-lg p-2">
            <option value="all">Danh m?c</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded-lg p-2" />
        </div>
      </section>

      <section className="bg-white rounded-xl divide-y shadow-sm">
        {filtered.map(tx => (
          <Link key={tx.id} href={`/giao-dich/${tx.id}`} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{categories.find(c=>c.id===tx.category_id)?.name || 'Danh m?c'}</p>
              <p className="text-xs text-gray-500">{wallets.find(w=>w.id===tx.wallet_id)?.name || 'V?'} ? {new Date(tx.date).toLocaleString('vi-VN')}</p>
            </div>
            <p className={tx.type==='expense' ? 'text-red-600 font-semibold' : 'text-green-700 font-semibold'}>
              {tx.type==='expense' ? '-' : '+'}{formatCurrency(tx.amount)}
            </p>
          </Link>
        ))}
        {filtered.length===0 && (
          <div className="p-4 text-center text-gray-500 text-sm">Kh?ng c? giao d?ch ph? h?p</div>
        )}
      </section>
    </main>
  )
}
