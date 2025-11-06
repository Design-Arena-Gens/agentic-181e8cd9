"use client";

import { useAppStore } from '@/lib/store'
import { useState } from 'react'
import type { CategoryType } from '@/lib/types'

export default function CategoriesPage() {
  const { categories, addCategory, deleteCategory } = useAppStore()
  const expense = categories.filter(c => c.type==='expense' && !c.parent_id)
  const income = categories.filter(c => c.type==='income' && !c.parent_id)

  const [name, setName] = useState('')
  const [type, setType] = useState<CategoryType>('expense')

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Danh m?c</h1>

      <div className="bg-white rounded-xl p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-3 gap-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="T?n danh m?c" className="border rounded-lg p-2 col-span-2" />
          <select value={type} onChange={e=>setType(e.target.value as CategoryType)} className="border rounded-lg p-2">
            <option value="expense">Chi</option>
            <option value="income">Thu</option>
          </select>
        </div>
        <button onClick={()=>{ if(!name) return; addCategory({ name, type }); setName('') }} className="w-full bg-brand-600 text-white py-2 rounded-lg disabled:opacity-50" disabled={!name}>Th?m danh m?c</button>
      </div>

      <section className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-medium mb-2">Chi</h2>
          <div className="bg-white rounded-xl divide-y shadow-sm">
            {expense.map(c => (
              <div key={c.id} className="p-3 flex items-center justify-between">
                <span>{c.name}</span>
                <button onClick={()=>deleteCategory(c.id)} className="text-red-600 text-sm">Xo?</button>
              </div>
            ))}
            {expense.length===0 && <div className="p-3 text-sm text-gray-500 text-center">Tr?ng</div>}
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-2">Thu</h2>
          <div className="bg-white rounded-xl divide-y shadow-sm">
            {income.map(c => (
              <div key={c.id} className="p-3 flex items-center justify-between">
                <span>{c.name}</span>
                <button onClick={()=>deleteCategory(c.id)} className="text-red-600 text-sm">Xo?</button>
              </div>
            ))}
            {income.length===0 && <div className="p-3 text-sm text-gray-500 text-center">Tr?ng</div>}
          </div>
        </div>
      </section>
    </main>
  )
}
