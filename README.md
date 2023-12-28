# Auth System

Simple auth system using typescript with JWT authentication.

## Run locally using Docker

Clone the project

```bash
git clone https://github.com/vepifanio/simple-auth-system-typescript
```

Get in the project directory

```bash
cd simple-auth-system-typescript
```

Install dependencies

```bash
npm install
```

Rename **.env.example** to **.env**

Run docker compose

```bash
docker compose up -d
```

Run migrations

```bash
npm run knex:migrate:latest
```

## Technologies

- Node.js
- Typescript
- Docker
- JWT
- Postgres
- Knex
