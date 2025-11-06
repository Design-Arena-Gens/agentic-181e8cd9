"use client";

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'

export default function WalletDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { wallets, transactions, deleteWallet } = useAppStore()
  const wallet = wallets.find(w => w.id === id)
  const ledger = transactions.filter(t => t.wallet_id === id)

  if (!wallet) return (
    <main className="p-4"><p>Kh?ng t?m th?y v?</p></main>
  )

  return (
    <main className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{wallet.name}</h1>
        <button onClick={()=>{ deleteWallet(wallet.id); router.push('/vi') }} className="text-red-600 text-sm">Xo?</button>
      </header>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-500">S? d?</p>
        <p className="text-2xl font-semibold">{formatCurrency(wallet.balance)}</p>
        <div className="mt-3">
          <Link href={`/giao-dich/tao?wallet=${wallet.id}`} className="text-brand-700">Th?m giao d?ch v?o v? n?y</Link>
        </div>
      </section>

      <section className="bg-white rounded-xl divide-y shadow-sm">
        {ledger.map(tx => (
          <Link key={tx.id} href={`/giao-dich/${tx.id}`} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium capitalize">{tx.type === 'expense' ? 'Chi' : 'Thu'}</p>
              <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleString('vi-VN')}</p>
            </div>
            <p className={tx.type === 'expense' ? 'text-red-600 font-semibold' : 'text-green-700 font-semibold'}>{tx.type==='expense'?'-':'+'}{formatCurrency(tx.amount)}</p>
          </Link>
        ))}
        {ledger.length===0 && (
          <div className="p-4 text-center text-gray-500 text-sm">Ch?a c? giao d?ch</div>
        )}
      </section>
    </main>
  )
}
