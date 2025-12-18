# Job Board

Platform pencarian kerja sederhana dengan fitur infinite scroll, dibangun menggunakan **Next.js** (Frontend) dan **Express.js** (Backend).

## 🚀 Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zod** (validation)
- **Server Actions** + `useActionState`
- **@tanstack/react-query** (`useInfiniteQuery`)
- **react-hook-form** + `@hookform/resolvers`

### Backend
- **Node.js**
- **Express.js**
- **In-memory data storage** (array)
- **TypeScript**

## 📁 Struktur Project

```
job-board/
├── apps/
│   ├── backend/           # Express.js Backend
│   │   └── src/
│   │       ├── controllers/   # Request handlers
│   │       ├── data/          # In-memory data store
│   │       ├── routes/        # API routes
│   │       ├── types/         # TypeScript types
│   │       └── server.ts      # Entry point
│   │
│   └── frontend/          # Next.js Frontend
│       ├── app/
│       │   ├── api/          # API Proxy (Route Handlers)
│       │   │   ├── jobs/
│       │   │   └── categories/
│       │   ├── jobs/[id]/    # Job detail page
│       │   └── page.tsx      # Home page
│       ├── components/       # React components
│       ├── hooks/            # Custom hooks (React Query)
│       └── lib/
│           ├── actions/      # Server Actions
│           ├── validations/  # Zod schemas
│           └── types.ts      # TypeScript types
```

## 🛠️ Cara Install

### Prerequisites
- Node.js 18+
- npm atau yarn

### 1. Clone repository
```bash
git clone <repository-url>
cd job-board
```

### 2. Install dependencies

**Backend:**
```bash
cd apps/backend
npm install
```

**Frontend:**
```bash
cd apps/frontend
npm install
```

## 🚀 Cara Menjalankan

### 1. Jalankan Backend (Port 4000)
```bash
cd apps/backend
npm run dev
```

### 2. Jalankan Frontend (Port 3000)
Di terminal baru:
```bash
cd apps/frontend
npm run dev
```

### 3. Buka browser
Akses `http://localhost:3000`

## 📋 Fitur

### 1. Job Posting (Create Job)
- Form dengan validasi Zod
- Submit menggunakan Server Action
- State management dengan `useActionState`
- Real-time client-side validation dengan react-hook-form

### 2. Job List (Infinite Scroll)
- Menampilkan daftar pekerjaan
- **Infinite scroll** menggunakan `useInfiniteQuery` + `IntersectionObserver`
- Load otomatis saat scroll ke bawah
- Search (nama, posisi, kategori)
- Filter by category
- Ordering (terbaru, terlama, A-Z, Z-A)
- Loading skeleton & empty state

### 3. Job Detail Page
- Dynamic route (`/jobs/[id]`)
- Menampilkan detail lengkap pekerjaan

### 4. API Proxy
- Frontend **tidak** langsung request ke backend
- Semua request melalui Next.js Route Handler
- Backend URL tidak terekspos di browser

## 🔄 Flow Infinite Scroll

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
├─────────────────────────────────────────────────────────┤
│  1. useInfiniteQuery fetch /api/jobs                    │
│  2. IntersectionObserver detect scroll to bottom        │
│  3. Trigger fetchNextPage() with cursor                 │
│  4. Append new data to existing list                    │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│               API PROXY (Route Handler)                  │
├─────────────────────────────────────────────────────────┤
│  /api/jobs → Forward to backend                         │
│  Backend URL hidden from client                         │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                     BACKEND                             │
├─────────────────────────────────────────────────────────┤
│  GET /api/jobs?cursor=5&limit=6                         │
│                                                         │
│  Response:                                              │
│  {                                                      │
│    "data": [...jobs],                                   │
│    "nextCursor": "11",                                  │
│    "hasMore": true,                                     │
│    "total": 12                                          │
│  }                                                      │
└─────────────────────────────────────────────────────────┘
```

## 🔗 API Endpoints

### Backend (Express.js)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List jobs dengan pagination |
| GET | `/api/jobs/:id` | Get job by ID |
| POST | `/api/jobs` | Create new job |
| GET | `/api/categories` | Get all categories |

### Query Parameters untuk GET /api/jobs

| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search by name, position, category |
| category | string | Filter by category |
| order | string | `newest`, `oldest`, `az`, `za` |
| cursor | string | Cursor for pagination |
| limit | number | Items per page (default: 6) |

## 📝 Notes

- Cursor-based pagination untuk performa lebih baik
- Response format siap untuk infinite scroll
- TypeScript untuk type safety
- Clean architecture dengan separation of concerns
