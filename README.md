# Express Template Auth

A modern, production-ready Express.js template with TypeScript, featuring authentication, error handling, and best practices.

## Features

- 🚀 **Modern Stack**
  - TypeScript
  - Express.js
  - Prisma ORM
  - PostgreSQL
  - Docker

- 🔐 **Authentication & Security**
  - JWT Authentication
  - Bearer token strategy
  - Type-safe authentication middleware
  - Helmet security headers

- 🏗️ **Architecture**
  - Modular structure
  - SOLID principles
  - Repository pattern
  - Dependency injection
  - Factory pattern

- ✅ **Quality & Testing**
  - Jest & Supertest
  - Integration tests
  - Error handling
  - Request validation (Zod)
  - TypeScript strict mode

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/express-template-auth-2025.git
cd express-template-auth-2025
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Update JWT_SECRET with a strong secret key
```

4. Start PostgreSQL with Docker:
```bash
docker compose up -d postgres
```

5. Run migrations:
```bash
npx prisma migrate dev
```

6. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── @types/          # Type definitions
├── modules/         # Feature modules
│   └── users/
│       ├── dtos/    # Data Transfer Objects
│       ├── features/# Use cases
│       └── repositories/
├── shared/
    ├── errors/      # Error handling
    │   ├── AppError.ts
    │   └── httpErrors/
    │       ├── BadRequestError.ts
    │       ├── NotAuthorizedError.ts
    │       └── NotFoundError.ts
    └── middlewares/
        ├── errorHandler.ts
        ├── validate.ts
        └── ensureAuthentication.ts
```

## Authentication

The template uses JWT with Bearer token authentication. Protected routes require the `Authorization` header with a Bearer token:

```bash
# Login and get token
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  http://localhost:8080/login

# Access protected route
curl -H "Authorization: Bearer your_token_here" \
  http://localhost:8080/protected-route
```

The JWT payload includes:
```typescript
{
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
```

## Error Handling

The template includes a robust error handling system with a hierarchy of custom errors:

```typescript
AppError (Base Error)
├── BadRequestError (400)
├── NotAuthorizedError (401)
└── NotFoundError (404)
```

All errors are handled by the global error middleware, providing consistent error responses:

```json
{
  "status": 400,
  "message": [
    {
      "message": "Error message here"
    }
  ],
  "timestamp": "2025-01-24T...",
  "path": "/users"
}
```

For validation errors (Zod), the response includes field information:
```json
{
  "status": 400,
  "message": [
    {
      "message": "Email is required",
      "field": "email"
    },
    {
      "message": "Password must be at least 6 characters",
      "field": "password"
    }
  ],
  "timestamp": "2025-01-24T...",
  "path": "/users"
}
```

## Development

```bash
# Run tests
npm test

# Run tests with watch mode
npm run test:watch

# Build for production
npm run build

# Start production server
npm start
```

## Docker

The project includes Docker configuration for development:

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
