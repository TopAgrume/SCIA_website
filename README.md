# EPITA SCIA Major Website

This project is a Next.js application with Prisma ORM and PostgreSQL database.

## Prerequisites

- Node version: 22.9.0
- npm version: 10.9.0
- Docker and Docker Compose

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>/front
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Update the values in `.env` as needed
  
  ```
  NODE_ENV="development" // or "production"
  DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
  NEXT_PUBLIC_API_URL="http://localhost:3000/api"
  ```


1. Start the PostgreSQL database:
   ```
   docker-compose up -d
   ```

2. Update the database schema:
   ```
   npm run db:update
   ```

## Running the application

Start the development server:

```
npm run dev
```
