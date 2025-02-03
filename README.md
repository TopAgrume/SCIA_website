# EPITA SCIA Major Website

This project is a Next.js application with Prisma ORM and PostgreSQL database.

## Prerequisites

- Node version: 22.9.0
- npm version: 10.9.0
- Docker and Docker Compose

## Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Set up environment variables:
   Create a `.env` file with the following variables:
   ```bash
   # Database Configuration
   DB_USER=your_db_user
   DB_PASSWORD=your_secure_password
   DB_NAME=your_database_name
   DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}?schema=public"

   # API Configuration
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   ```

3. Start the Development Environment:
   ```bash
   # Start all services with hot-reload
   docker compose -f docker-compose.dev.yml up --build

   # To stop the services
   docker compose -f docker-compose.dev.yml down
   ```

   Development environment features:
   - Hot reload enabled
   - Source code mounted for live updates
   - PostgreSQL exposed on port 5432
   - Prisma migrations in development mode

## Production Deployment

1. Set up environment variables:
   Create a `.env` file with production values:
   ```bash
   DB_USER=your_prod_db_user
   DB_PASSWORD=your_secure_prod_password
   DB_NAME=your_prod_database
   DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}?schema=public"
   NEXT_PUBLIC_API_URL="https://your-domain.com/api"
   ```

2. Start the Production Environment:
   ```bash
   # Start all services in production mode
   docker compose -f docker-compose.prod.yml up --build -d

   # To stop the services
   docker compose -f docker-compose.prod.yml down
   ```

   Production environment features:
   - Optimized build with minimal image size
   - No source code mounting
   - Database isolated (not exposed to host)
   - Safe database migrations
   - Enhanced security

## Database Management

### Development
- Migrations are automatically applied in development
- To create a new migration:
  ```bash
  npx prisma migrate dev --name your_migration_name
  ```

### Production
- Migrations are safely applied using `migrate deploy`
- Never run `migrate dev` in production

## Code Quality

```bash
npm run lint    # Run ESLint check
npm run format  # Run ESLint and Prettier fix
```

## Architecture

The application uses:
- Next.js 14 for the frontend and API routes
- PostgreSQL 15.2 for the database
- Prisma as the ORM
- Docker for containerization

## Troubleshooting

1. If you encounter database connection issues:
   ```bash
   # Remove the development volume
   docker volume rm postgres_data_dev

   # Remove the production volume
   docker volume rm postgres_data_prod
   ```

2. To reset all containers and volumes:
   ```bash
   # Development
   docker compose -f docker-compose.dev.yml down -v

   # Production
   docker compose -f docker-compose.prod.yml down -v
   ```
