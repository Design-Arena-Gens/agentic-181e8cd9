"use client";

import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { useState } from 'react'
import dayjs from 'dayjs'

export default function TxDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { transactions, categories, wallets, updateTransaction, deleteTransaction } = useAppStore()
  const tx = transactions.find(t => t.id === id)
  const [editing, setEditing] = useState(false)

  if (!tx) return <main className="p-4">Kh?ng t?m th?y</main>

  const cat = categories.find(c=>c.id===tx.category_id)
  const wal = wallets.find(w=>w.id===tx.wallet_id)

  return (
    <main className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Chi ti?t giao d?ch</h1>
        <div className="space-x-3 text-sm">
          <button onClick={()=>setEditing(v=>!v)} className="text-brand-700">{editing ? 'Hu?' : 'S?a'}</button>
          <button onClick={()=>{ deleteTransaction(tx.id); router.back() }} className="text-red-600">Xo?</button>
        </div>
      </header>

      {!editing ? (
        <section className="bg-white rounded-xl p-4 space-y-2 shadow-sm">
          <p><span className="text-gray-500">V?:</span> {wal?.name}</p>
          <p><span className="text-gray-500">Danh m?c:</span> {cat?.name}</p>
          <p><span className="text-gray-500">Lo?i:</span> {tx.type==='expense'?'Chi':'Thu'}</p>
          <p><span className="text-gray-500">S? ti?n:</span> {tx.amount.toLocaleString()}</p>
          <p><span className="text-gray-500">Th?i gian:</span> {dayjs(tx.date).format('DD/MM/YYYY HH:mm')}</p>
          <p><span className="text-gray-500">Ghi ch?:</span> {tx.description || '?'}</p>
        </section>
      ) : (
        <EditForm id={tx.id} />
      )}
    </main>
  )
}

function EditForm({ id }: { id: string }) {
  const router = useRouter()
  const { transactions, wallets, categories, updateTransaction } = useAppStore()
  const tx = transactions.find(t => t.id === id)!
  const [wallet_id, setWalletId] = useState(tx.wallet_id)
  const [type, setType] = useState(tx.type)
  const [category_id, setCategoryId] = useState(tx.category_id)
  const [amount, setAmount] = useState(tx.amount)
  const [date, setDate] = useState(dayjs(tx.date).format('YYYY-MM-DDTHH:mm'))
  const [description, setDescription] = useState(tx.description || '')

  const usableCats = categories.filter(c => c.type === type)

  return (
    <section className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
      <div>
        <label className="text-sm text-gray-600">V?</label>
        <select value={wallet_id} onChange={e=>setWalletId(e.target.value)} className="mt-1 w-full border rounded-lg p-2">
          {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-gray-600">Lo?i</label>
          <select value={type} onChange={e=>setType(e.target.value as any)} className="mt-1 w-full border rounded-lg p-2">
            <option value="expense">Chi</option>
            <option value="income">Thu</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Danh m?c</label>
          <select value={category_id} onChange={e=>setCategoryId(e.target.value)} className="mt-1 w-full border rounded-lg p-2">
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
        <input value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 w-full border rounded-lg p-2" />
      </div>
      <button
        onClick={() => { updateTransaction(id, { wallet_id, type, category_id, amount, date: new Date(date).toISOString(), description }); router.back() }}
        disabled={!wallet_id || !category_id || amount<=0}
        className="w-full bg-brand-600 text-white py-2 rounded-lg disabled:opacity-50"
      >L?u</button>
    </section>
  )
}
