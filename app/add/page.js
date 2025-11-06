'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      title,
      author,
      description,
      dateCreated: new Date().toISOString().split('T')[0]
    }

    try {
      const res = await fetch('http://localhost:4000/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Failed to save')
      // go back to home
      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Could not save. Check console.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Knowledge</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input value={author} onChange={e => setAuthor(e.target.value)} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={5} className="w-full p-2 border rounded" />
        </div>

        <div className="flex items-center gap-2">
          <button disabled={saving} className="bg-green-600 text-white px-4 py-2 rounded">{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => router.push('/')} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </div>
  )
}
