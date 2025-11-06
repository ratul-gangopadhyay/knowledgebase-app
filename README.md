# Next Knowledgebase

A simple Knowledgebase Creator app built with Next.js (App Router), JSON Server as a mock backend, and Tailwind CSS.

## Features
- Add knowledge items (title, author, dateCreated, description)
- List with search by title/description
- Dynamic detail pages for each knowledge item
- Tailwind CSS styling
- JSON Server for local REST API

## Setup

1. Install dependencies
```bash
npm install
```

2. Start JSON Server (runs on port 4000)
```bash
npm run json-server
```

3. In another terminal, run Next.js
```bash
npm run dev
```

Open http://localhost:3000

To run both concurrently:
```bash
npm run dev:all
```

## Notes
- Replace `next`/`react` versions in `package.json` if needed.
- This repo is ready to be pushed to GitHub.
