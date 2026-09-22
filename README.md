# Offscript

A full-stack Blog site application built with React, TypeScript, Express, Prisma, PostgreSQL, and Supabase. Users can create and manage posts, publish or draft content, search public posts, like posts, upload images, and authenticate with secure JWT cookies.

## Project structure

```text
offscript/
├── client/                 # React + Vite frontend
│   ├── src/components/     # Reusable UI components
│   ├── src/pages/          # Route-level pages
│   ├── src/hooks/          # Custom React hooks
│   ├── src/store/          # Zustand stores
│   └── vercel.json         # SPA route fallback for Vercel
├── server/                 # Express + Prisma backend
│   ├── prisma/             # Prisma schema and migrations
│   ├── src/routes/         # API route definitions and controllers
│   ├── src/middlewares/    # Authentication, validation, and uploads
│   ├── src/lib/            # Prisma and Supabase clients
│   └── .env.example        # Backend environment variable template
└── README.md
```

## Features

- User signup, signin, logout, and authenticated routes
- JWT authentication stored in an HTTP-only cookie
- Create, edit, publish, and delete posts
- Draft and published post views
- Public post search with sorting and ordering
- Real time like and unlike posts without refetching
- Image uploads with file type and size validation
- Responsive layout for desktop and mobile screens
- Client-side routing with React Router
- Global client state with Zustand

## Tech stack

### Frontend

| Technology       | Version   | Purpose                                  |
| ---------------- | --------- | ---------------------------------------- |
| React            | `^19.2.8` | UI library                               |
| React DOM        | `^19.2.8` | React browser rendering                  |
| TypeScript       | `~6.0.2`  | Static typing                            |
| Vite             | `^8.2.2`  | Development server and build tool        |
| Chakra UI        | `^3.37.0` | Component library and responsive styling |
| Tailwind CSS     | `^4.3.3`  | Utility-first CSS                        |
| React Router DOM | `^7.18.3` | Client-side routing                      |
| Zustand          | `^5.0.15` | Global state management                  |
| Axios            | `^1.20.0` | HTTP requests                            |
| React Icons      | `^5.7.0`  | Icons                                    |

### Backend

| Technology           | Version         | Purpose                           |
| -------------------- | --------------- | --------------------------------- |
| Node.js              | LTS recommended | JavaScript runtime                |
| Express              | `^5.2.1`        | HTTP server and API routing       |
| TypeScript           | `^7.0.2`        | Static typing and compilation     |
| Prisma               | `^7.9.1`        | ORM and generated database client |
| PostgreSQL           | Supabase-hosted | Relational database               |
| `@prisma/adapter-pg` | `^7.9.1`        | Prisma PostgreSQL adapter         |
| Supabase JS          | `^2.116.0`      | Supabase Storage integration      |
| JSON Web Token       | `^9.0.3`        | JWT creation and verification     |
| bcrypt               | `^6.0.0`        | Password hashing                  |
| cookie-parser        | `^1.4.7`        | Authentication cookie parsing     |
| cors                 | `^2.8.6`        | Cross-origin frontend access      |
| Zod                  | `^4.5.4`        | Request validation                |
| Multer               | `^2.3.0`        | Multipart image uploads           |
| tsx                  | `^4.23.12`      | Running TypeScript directly       |

## Prerequisites

- Node.js 20+ recommended
- npm
- A PostgreSQL database, such as Supabase Postgres
- A Supabase project if image storage is enabled

## Local setup

```bash
git clone https://github.com/ujjwal-py/typescript-social-media.git
cd offscript

cd server
npm install --include=dev

cd ../client
npm install
```

The server's `postinstall` script runs `prisma generate` automatically. The generated Prisma client is placed under `server/src/generated/prisma` and is not committed to Git.

## Backend environment variables

Create `server/.env` from `server/.env.example`:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-server-side-service-role-key"
SUPABASE_BUCKET="your-storage-bucket-name"
```

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, or `JWT_SECRET` in frontend code or commit them to Git.

## Frontend environment variables

Create `client/.env`:

```env
VITE_BASE_URL=http://localhost:3000
```

The Axios client automatically appends `/v1`, so the value should not include `/v1`.

## Run locally

Open two terminals.

### Backend

```bash
cd server
npm run dev
```

The API runs on `http://localhost:3000` by default.

### Frontend

```bash
cd client
npm run dev
```

The Vite development server runs on `http://localhost:5173` by default.

## Available scripts

### Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Type-check and create production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build locally
```

### Backend

```bash
npm run dev       # Start nodemon with tsx
npm run build     # TypeScript build/type-check
npm start         # Start the server with tsx
npm test          # Placeholder test script
```

## Database and Prisma

The Prisma schema is located at `server/prisma/schema.prisma`.

```bash
cd server
npx prisma generate
npx prisma migrate dev --name describe-your-change
npx prisma migrate deploy
```

Use `migrate dev` for local schema changes. Use `migrate deploy` in production after migrations have been committed. The `postinstall` script only runs `prisma generate`; it does not modify database tables or data.

## API routes

The API is mounted under `/v1`.

### Authentication

| Method | Route        | Auth     |
| ------ | ------------ | -------- |
| `POST` | `/v1/signup` | Public   |
| `POST` | `/v1/signin` | Public   |
| `GET`  | `/v1/me`     | Required |
| `POST` | `/v1/logout` | Required |
| `GET`  | `/v1/users`  | Public   |

### Posts

| Method   | Route                   | Auth     |
| -------- | ----------------------- | -------- |
| `GET`    | `/v1/posts`             | Public   |
| `GET`    | `/v1/search-public`     | Public   |
| `GET`    | `/v1/drafts`            | Required |
| `GET`    | `/v1/published`         | Required |
| `GET`    | `/v1/search-user-posts` | Required |
| `POST`   | `/v1/new-post`          | Required |
| `PUT`    | `/v1/update-post/:id`   | Required |
| `DELETE` | `/v1/delete-post/:id`   | Required |
| `POST`   | `/v1/like-post/:id`     | Required |
| `DELETE` | `/v1/dislike-post/:id`  | Required |

## Production deployment

### Backend on Render

Set the Render service root directory to `server`.

```text
Build Command: npm install --include=dev && npm run build
Start Command: npm start
```

Required Render environment variables:

```env
NODE_ENV=production
DATABASE_URL=your-supabase-postgres-connection-string
JWT_SECRET=your-production-secret
FRONTEND_URL=https://your-frontend.vercel.app
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_BUCKET=your-bucket-name
```

### Frontend on Vercel

Set the Vercel root directory to `client` and set:

```env
VITE_BASE_URL=https://your-backend.onrender.com
```

Build command:

```bash
npm run build
```

The project includes `client/vercel.json`, which rewrites frontend routes to `index.html`. This allows direct navigation and refreshes on routes such as `/profile` and `/my-posts`.

#

## License

This project does not currently declare a formal open-source license.
