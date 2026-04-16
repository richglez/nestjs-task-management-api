# Task Manager API

A RESTful API for managing tasks with role-based access control, built with NestJS, PostgreSQL | SoftDelete, and Prisma. Fully containerized with Docker.

## Tech Stack

- **Framework:** NestJS + TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT + Bcrypt
- **Docs:** Swagger / OpenAPI
- **Containerization:** Docker + Docker Compose

## Features

- User registration and login with hashed passwords (Bcrypt)
- JWT authentication with protected routes
- Role-based access control (ADMIN / USER)
- Full CRUD for tasks
- Input validation with class-validator
- Auto-generated API documentation with Swagger

## Project Structure

```
src/
├── auth/         # JWT strategy, guards(jwt, roles), decorators, dto
├── generated/    # ORM Prisma Client Generated
├── prisma/       # Prisma Modulo + (Service)
├── tasks/        # Task module + (Dto Tasks, Service Tasks, Controller Tasks, )
├── users/        # User module + (Dto User, Service User, Controller User, )
└── main.ts       # App entry point, Swagger config

prisma/
└──  migrations/  # PostgreSQL migrations (schema, role, status, priority, user, task)
```

## Getting Started

### Option 1 — Docker (recommended)

> Requires Docker and Docker Compose installed.

1. Clone the repository

```bash
git clone https://github.com/richglez/task-manager-api.git
cd task-manager-api
```

2. Create your environment file from the example

```bash
cp .env.example .env.docker
```

3. Fill in the values in `.env.docker`

4. Start the app

```bash
docker compose up --build
```

The API will be available at `http://localhost:3000`

---

### Option 2 — Local Development

1. Clone the repository and install dependencies

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
```

2. Create your local environment file

```bash
cp .env.example .env
```

3. Fill in the values in `.env`

4. Run Prisma migrations

```bash
npx prisma migrate dev
```

5. Start the development server

```bash
npm run start:dev
```

---

## Environment Variables

See `.env.example` for all required variables:

```env
PORT=
JWT_SECRET=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
DATABASE_URL=
```

> `.env` and `.env.docker` are gitignored and never committed.

---

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/api
```

Use the **Authorize** button to authenticate with your JWT token and test protected endpoints.

---

## Auth Flow

```
POST /auth/register   → creates a new user
POST /auth/login      → returns a JWT token
```

Include the token in subsequent requests:

```
Authorization: Bearer <your_token>
```

---

## Roles

| Role    | Permissions                        |
| ------- | ---------------------------------- |
| `USER`  | Manage own tasks                   |
| `ADMIN` | Full access to all tasks and users |

---

## Documentaion
* [PRD](docs/planning/PRD.md) - Product Requirements Document
* [Roadmap](docs/planning/roadmap.md) - Phase plan
* [Architecture](docs/architecture/architecture.md) - Software Architecture
* [Models](docs/architecture/models/diagrams.md) - Digrams / Models


---

## License

MIT
