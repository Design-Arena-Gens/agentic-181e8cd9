"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import type { WalletType } from '@/lib/types'

export default function CreateWalletPage() {
  const router = useRouter()
  const { addWallet } = useAppStore()
  const [name, setName] = useState('')
  const [type, setType] = useState<WalletType>('ti?n m?t')
  const [balance, setBalance] = useState(0)

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">T?o v? m?i</h1>
      <div className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
        <div>
          <label className="text-sm text-gray-600">T?n v?</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-lg p-2" placeholder="VD: Ti?n m?t" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Lo?i v?</label>
          <select value={type} onChange={e=>setType(e.target.value as WalletType)} className="mt-1 w-full border rounded-lg p-2">
            <option value="ti?n m?t">Ti?n m?t</option>
            <option value="ng?n h?ng">Ng?n h?ng</option>
            <option value="v? ?i?n t?">V? ?i?n t?</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">S? d? ban ??u</label>
          <input type="number" value={balance} onChange={e=>setBalance(Number(e.target.value))} className="mt-1 w-full border rounded-lg p-2" />
        </div>
        <button
          onClick={() => { const w = addWallet({ name, type, balance }); router.push(`/vi/${w.id}`) }}
          disabled={!name}
          className="w-full bg-brand-600 text-white py-2 rounded-lg disabled:opacity-50"
        >L?u</button>
      </div>
    </main>
  )
}
