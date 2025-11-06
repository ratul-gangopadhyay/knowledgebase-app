'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:4000/knowledge/${id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        if (!mounted) return
        setTitle(data.title || '')
        setAuthor(data.author || '')
        setDescription(data.description || '')
      } catch (err) {
        console.error(err)
        alert('Could not load item.')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
    return () => { mounted = false }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
  const payload = { id: Number(id), title, author, description, dateCreated: new Date().toISOString().split('T')[0] }
      const res = await fetch(`http://localhost:4000/knowledge/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
  if (!res.ok) throw new Error('Update failed')
  // navigate to detail and force a data refresh so the server component refetches latest data
  router.replace(`/kb/${id}`)
  router.refresh()
    } catch (err) {
      console.error(err)
      alert('Could not save changes.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Knowledge</h2>

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
          <button disabled={saving} className="bg-yellow-500 text-white px-4 py-2 rounded">{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={() => router.push(`/kb/${id}`)} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </form>
    </div>
  )
}
