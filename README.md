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

```bash
mv .env.example .env
```

Run docker compose to get up postgres service

```bash
docker compose up -d
```

Run migrations

```bash
npm run knex:migrate:latest
```

Start application

```bash
npm run start:dev
```

## Routes

### Create user

[POST] - http://localhost:3333/users

Example:

```bash
curl -X POST "http://localhost:3333/users" -H "Content-Type: application/json" -d '{ "email": "mail@mail.com", "password": "123456" }'
```

### Login

[POST] - http://localhost:3333/login

Example:

```bash
curl -X POST "http://localhost:3333/login" -H "Content-Type: application/json" -d '{ "email": "mail@mail.com", "password": "123456" }'
```

### List Users - Protected

[GET] - http://localhost:3333/users

Example:

```bash
curl -X GET "http://localhost:3333/users" -H "Authorization: Bearer {{your_access_token}}"
```

## Technologies

- Node.js
- Typescript
- Docker
- JWT
- Postgres
- Knex
