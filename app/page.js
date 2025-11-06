'use client'

import { useEffect, useState } from 'react'

export default function HomePage() {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/knowledge')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return (
      i.title.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or description..."
          className="flex-1 p-2 border rounded"
        />

        <a
          href="/add"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          + Add
        </a>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {filtered.length === 0 && (
            <li className="text-center text-gray-500">No knowledge items found.</li>
          )}

          {filtered.map(item => (
            <li key={item.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-start justify-between">
                <a href={`/kb/${item.id}`} className="text-blue-600 text-xl font-semibold">
                  {item.title}
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      if (!confirm('Delete this item?')) return
                      try {
                        setDeletingId(item.id)
                        const res = await fetch(`http://localhost:4000/knowledge/${item.id}`, { method: 'DELETE' })
                        if (!res.ok) throw new Error('Delete failed')
                        // refresh list
                        await fetchData()
                      } catch (err) {
                        console.error(err)
                        alert('Could not delete item.')
                      } finally {
                        setDeletingId(null)
                      }
                    }}
                    className="text-sm px-2 py-1 border rounded text-red-600"
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">By {item.author} • {item.dateCreated}</p>
              <p className="mt-2 text-gray-700">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
