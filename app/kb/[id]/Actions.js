'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Actions({ id }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Delete this item?')) return
    setBusy(true)
    try {
      const res = await fetch(`http://localhost:4000/knowledge/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Could not delete item.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-6 flex gap-2">
      <button onClick={() => router.push(`/kb/${id}/edit`)} className="px-3 py-2 bg-yellow-500 text-white rounded">Edit</button>
      <button onClick={handleDelete} disabled={busy} className="px-3 py-2 bg-red-600 text-white rounded">{busy ? 'Deleting...' : 'Delete'}</button>
    </div>
  )
}
