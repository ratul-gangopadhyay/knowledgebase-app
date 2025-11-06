import '../styles/globals.css'

export const metadata = {
  title: 'Knowledgebase',
  description: 'Simple Knowledgebase Creator using Next.js + JSON Server'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <header className="bg-gray-600 text-white p-4 shadow">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="font-bold text-lg">Knowledgebase</h1>
            <nav className="space-x-4">
              <a className="hover:underline" href="/">Home</a>
              <a className="hover:underline" href="/add">Add</a>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
