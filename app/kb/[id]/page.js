import Link from 'next/link'
import Actions from './Actions'

async function getItem(id) {
  const res = await fetch(`http://localhost:4000/knowledge/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function DetailPage({ params }) {
  const id = params.id
  const item = await getItem(id)

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Item not found.</p>
        <Link href="/">Go back</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
      <p className="text-sm text-gray-500">By {item.author} on {item.dateCreated}</p>
      <p className="mt-4 text-gray-800">{item.description}</p>

      <Actions id={id} />
    </div>
  )
}
