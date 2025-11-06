"use client";

import { useAppStore } from '@/lib/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import dayjs from 'dayjs'
import type { CategoryType, ID } from '@/lib/types'

export default function CreateTxPage() {
  const router = useRouter()
  const params = useSearchParams()
  const preWallet = params.get('wallet')
  const { wallets, categories, addTransaction } = useAppStore()

  const [wallet_id, setWalletId] = useState<ID>(preWallet || wallets[0]?.id)
  const [type, setType] = useState<CategoryType>('expense')
  const [category_id, setCategoryId] = useState<ID | ''>('')
  const [amount, setAmount] = useState<number>(0)
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DDTHH:mm'))
  const [description, setDescription] = useState<string>('')

  const usableCats = categories.filter(c => c.type === type)

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Th?m giao d?ch</h1>
      <div className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
        <div>
          <label className="text-sm text-gray-600">V?</label>
          <select value={wallet_id} onChange={e=>setWalletId(e.target.value)} className="mt-1 w-full border rounded-lg p-2">
            {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm text-gray-600">Lo?i</label>
            <select value={type} onChange={e=>setType(e.target.value as CategoryType)} className="mt-1 w-full border rounded-lg p-2">
              <option value="expense">Chi</option>
              <option value="income">Thu</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Danh m?c</label>
            <select value={category_id} onChange={e=>setCategoryId(e.target.value)} className="mt-1 w-full border rounded-lg p-2">
              <option value="">Ch?n</option>
              {usableCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm text-gray-600">S? ti?n</label>
            <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="mt-1 w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Th?i gian</label>
            <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} className="mt-1 w-full border rounded-lg p-2" />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Ghi ch?</label>
          <input value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 w-full border rounded-lg p-2" placeholder="M? t?..." />
        </div>
        <button
          onClick={() => { if (!wallet_id || !category_id || !amount) return; addTransaction({ wallet_id, amount, category_id, type, date: new Date(date).toISOString(), description }); router.push('/giao-dich') }}
          disabled={!wallet_id || !category_id || amount<=0}
          className="w-full bg-brand-600 text-white py-2 rounded-lg disabled:opacity-50"
        >L?u</button>
      </div>
    </main>
  )
}
