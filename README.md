# Express API with TypeORM

[![Documentation](https://img.shields.io/badge/Documentation-yes-brightgreen.svg)](https://github.com/masb0ymas/express-api-typeorm#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/masb0ymas/express-api-typeorm/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/masb0ymas/express-api-typeorm/blob/master/LICENSE.md)
[![Version](https://img.shields.io/badge/Version-6.0.0--3-blue.svg)](https://github.com/masb0ymas/express-api-typeorm/releases)
[![Express](https://img.shields.io/badge/Express-4.21.2-informational?logo=express&color=22272E)](https://expressjs.com/)

![Node](https://badges.aleen42.com/src/node.svg)
![Eslint](https://badges.aleen42.com/src/eslint.svg)
![TypeScript](https://badges.aleen42.com/src/typescript.svg)
![Docker](https://badges.aleen42.com/src/docker.svg)

A production-ready Express API server built with TypeScript and TypeORM, featuring comprehensive authentication, authorization, file management, and multi-cloud storage integration.

Base API using [express-api](https://github.com/masb0ymas/express-api)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Scripts Reference](#scripts-reference)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality
- **Authentication & Authorization**
  - User registration with email verification
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Session management with device tracking
  - Secure password hashing with Argon2

- **User Management**
  - Complete CRUD operations
  - Profile management
  - Soft delete support
  - Role assignment (User, Admin, Super Admin)

- **File Upload Management**
  - Multi-cloud storage support (AWS S3, Google Cloud Storage, MinIO)
  - Automatic signed URL generation
  - File metadata tracking
  - Scheduled URL refresh jobs

- **Session Management**
  - Multi-device login support
  - Track user sessions with device and location info
  - Automatic session cleanup via scheduled jobs

- **Email Notifications**
  - User registration verification emails
  - SMTP integration with Nodemailer
  - Handlebars email templates

### Developer Experience
- **Type Safety** - Full TypeScript support with strict typing
- **API Documentation** - Interactive Swagger/OpenAPI 3.0 documentation
- **Code Quality** - ESLint + Prettier with pre-configured rules
- **Logging** - Structured logging with Pino
- **Error Handling** - Centralized error handling with custom error classes
- **Query Builder** - Advanced filtering, sorting, and pagination
- **Job Scheduling** - Background jobs with node-cron
- **Security** - Helmet, HPP, CORS, Rate limiting
- **Docker Support** - Production-ready Dockerfile

## Tech Stack

### Core Technologies
- **[Node.js](https://nodejs.org/)** `>= 20.x` - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** `5.9+` - Type-safe JavaScript
- **[Express.js](https://expressjs.com/)** `4.21.x` - Web framework
- **[TypeORM](https://typeorm.io/)** `0.3.27` - ORM for TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database

### Authentication & Security
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** `9.0.2` - JWT implementation
- **[argon2](https://github.com/ranisalt/node-argon2)** `0.41.1` - Password hashing
- **[helmet](https://helmetjs.github.io/)** `8.1.0` - Security headers
- **[express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)** `8.1.0` - Rate limiting
- **[hpp](https://github.com/analog-nico/hpp)** `0.2.3` - HTTP Parameter Pollution protection

### Validation & Data Handling
- **[zod](https://zod.dev/)** `4.1.11` - Schema validation
- **[multer](https://github.com/expressjs/multer)** `1.4.5-lts.1` - File upload handling
- **[date-fns](https://date-fns.org/)** `4.1.0` - Date manipulation
- **[lodash](https://lodash.com/)** `4.17.21` - Utility functions

### Cloud Storage
- **[@aws-sdk/client-s3](https://aws.amazon.com/sdk-for-javascript/)** `3.893.0` - AWS S3 integration
- **[@google-cloud/storage](https://cloud.google.com/nodejs/docs/reference/storage/latest)** `7.17.1` - Google Cloud Storage
- **[minio](https://min.io/)** `8.0.6` - MinIO client

### Email & Communication
- **[nodemailer](https://nodemailer.com/)** `7.0.6` - Email sending
- **[handlebars](https://handlebarsjs.com/)** `4.7.8` - Email templates

### Utilities & Tools
- **[pino](https://getpino.io/)** `9.11.0` - Fast JSON logger
- **[node-cron](https://github.com/node-cron/node-cron)** `3.0.3` - Job scheduling
- **[swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)** `5.0.1` - API documentation
- **[PM2](https://pm2.keymetrics.io/)** - Process manager for production

### Development Tools
- **[ESLint](https://eslint.org/)** `9.36.0` - JavaScript linter
- **[Prettier](https://prettier.io/)** `3.6.2` - Code formatter
- **[Nodemon](https://nodemon.io/)** `3.1.10` - Development auto-reload
- **[release-it](https://github.com/release-it/release-it)** `18.1.2` - Version management

## Architecture

This project follows a **layered architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│          Handler Layer (Controller)      │
│     HTTP Request/Response Handling       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           Service Layer                  │
│    Business Logic & Validation           │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Repository Layer (TypeORM)          │
│         Data Access & Queries            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          PostgreSQL Database             │
└─────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Separation of Concerns**
   - Handlers: HTTP request/response management
   - Services: Business logic and validation
   - Repositories: Data persistence via TypeORM

2. **Middleware Stack**
   - Request logging (Pino)
   - Security headers (Helmet)
   - Rate limiting
   - CORS configuration
   - User agent parsing
   - Authentication & authorization

3. **Error Handling**
   - Custom HTTP error classes (400, 401, 403, 404, 500)
   - Centralized error middleware
   - Validation error handling
   - TypeORM-specific error handling

4. **Data Validation**
   - Zod schemas for type-safe validation
   - Request/response validation
   - Entity validation at service layer

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.x ([Download](https://nodejs.org/))
- **PostgreSQL** >= 14.x ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** or **pnpm** (Package manager)
- **Docker** (optional, for containerized deployment)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/masb0ymas/express-api-typeorm.git
cd express-api-typeorm
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### 3. Generate Environment Variables

You can generate a `.env` file with secure random secrets:

```bash
npm run secret
```

Or manually copy the example file:

```bash
cp .env.example .env
```

Then edit `.env` and configure your settings (see [Environment Variables](#environment-variables)).

### 4. Set Up Database

Create and initialize the database:

```bash
npm run db:sync
```

This command will:
- Create the database (if it doesn't exist)
- Drop existing schema
- Synchronize schema with entities
- Run migrations and seeders

Alternatively, create the database manually:

```bash
# Create database only
npm run db:create

# Reset schema (drop + sync)
npm run db:reset
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:8000`

### 6. Access API Documentation

Open your browser and navigate to:

```
http://localhost:8000/api-docs
```

This will open the interactive Swagger UI where you can test all endpoints.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Application Settings
```env
NODE_ENV=development
APP_PORT=8000
APP_NAME=express-api-typeorm
APP_URL=http://localhost:8000
APP_DEFAULT_PASS=defaultPassword123
```

### Database Configuration
```env
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=your_password
TYPEORM_DATABASE=express_typeorm
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=false
TYPEORM_ENTITIES=dist/app/database/entity/**/*.js
TYPEORM_MIGRATIONS=dist/app/database/migration/**/*.js
TYPEORM_SUBSCRIBERS=dist/app/database/subscriber/**/*.js
```

### JWT Configuration
```env
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES=7d
```

### Email Configuration (Optional)
```env
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"
```

### Storage Configuration (Optional)

Choose one storage provider:

#### AWS S3
```env
STORAGE_PROVIDER=s3
AWS_S3_BUCKET=your-bucket-name
AWS_S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

#### Google Cloud Storage
```env
STORAGE_PROVIDER=gcs
GCS_BUCKET=your-bucket-name
GCS_PROJECT_ID=your-project-id
GCS_KEY_FILE=path/to/keyfile.json
```

#### MinIO
```env
STORAGE_PROVIDER=minio
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=your-bucket-name
MINIO_USE_SSL=false
```

## Database Setup

### Entity Relationships

The database schema includes the following entities:

- **User** - User accounts with authentication
  - Relationships: Role (Many-to-One), Upload (Many-to-One), Sessions (One-to-Many)
  
- **Role** - User roles for RBAC
  - Default roles: User, Admin, Super Admin
  
- **Session** - User session tracking
  - Tracks: JWT tokens, device info, IP addresses
  
- **Upload** - File upload metadata
  - Supports: AWS S3, Google Cloud Storage, MinIO

### Database Commands

```bash
# Create database
npm run db:create

# Drop database
npm run db:drop

# Drop schema and sync
npm run db:reset

# Create database + reset schema
npm run db:sync

# Manual TypeORM commands
npx typeorm schema:sync -d ./dist/app/database/connection.js
npx typeorm schema:drop -d ./dist/app/database/connection.js
```

## API Documentation

### Accessing Swagger UI

Start the development server:
```bash
npm run dev
```

Navigate to:
```
http://localhost:8000/api-docs
```

### API Endpoints Overview

#### Base URL: `http://localhost:8000`

#### Health Check
```
GET  /                    # Hello World
GET  /health              # Server health and version info
```

#### Authentication (`/v1/auth`)
```
POST   /v1/auth/sign-up            # User registration
POST   /v1/auth/sign-in            # User login
GET    /v1/auth/verify-session     # Verify JWT session
POST   /v1/auth/sign-out           # User logout
```

#### User Management (`/v1/user`)
```
GET    /v1/user                    # List users (paginated, filtered, sorted)
POST   /v1/user                    # Create user (Admin only)
GET    /v1/user/:id                # Get user by ID
PUT    /v1/user/:id                # Update user
DELETE /v1/user/:id                # Delete user (Admin only)
```

#### Role Management (`/v1/role`)
```
GET    /v1/role                    # List roles
POST   /v1/role                    # Create role (Admin only)
GET    /v1/role/:id                # Get role by ID
PUT    /v1/role/:id                # Update role (Admin only)
DELETE /v1/role/:id                # Delete role (Admin only)
```

#### File Uploads (`/v1/upload`)
```
POST   /v1/upload                  # Upload file
GET    /v1/upload                  # List uploads
GET    /v1/upload/:id              # Get upload by ID
DELETE /v1/upload/:id              # Delete upload
```

#### Session Management (`/v1/session`)
```
GET    /v1/session                 # List user sessions
DELETE /v1/session/:id             # End session
```

### Query Parameters

All list endpoints support:

- **Filtering**: `?filtered={"field":"value"}`
- **Sorting**: `?sorted={"field":"ASC"}` or `?sorted={"field":"DESC"}`
- **Pagination**: `?page=1&pageSize=10`

## Project Structure

```
express-api-typeorm/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app/
│   │   ├── database/
│   │   │   ├── connection.ts            # TypeORM connection
│   │   │   ├── entity/                  # Database entities
│   │   │   │   ├── base.ts              # Base entity (UUID, timestamps)
│   │   │   │   ├── user.ts
│   │   │   │   ├── role.ts
│   │   │   │   ├── session.ts
│   │   │   │   └── upload.ts
│   │   │   ├── migration/               # Database migrations
│   │   │   ├── schema/                  # Zod validation schemas
│   │   │   └── subscriber/              # Entity subscribers
│   │   ├── handler/                     # HTTP route handlers
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   ├── role.ts
│   │   │   ├── session.ts
│   │   │   └── upload.ts
│   │   ├── service/                     # Business logic layer
│   │   │   ├── base.ts
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   └── ...
│   │   ├── middleware/                  # Express middleware
│   │   │   ├── authorization.ts         # JWT authentication
│   │   │   ├── error-handle.ts          # Global error handler
│   │   │   ├── rate-limit.ts            # Rate limiting
│   │   │   └── with-permission.ts       # RBAC middleware
│   │   ├── job/                         # Scheduled jobs
│   │   │   ├── session.ts               # Session cleanup
│   │   │   └── upload.ts                # URL refresh
│   │   └── routes/                      # Route definitions
│   │       ├── route.ts
│   │       └── v1.ts
│   ├── config/                          # Configuration
│   │   ├── env.ts                       # Environment variables
│   │   ├── app.ts                       # Express setup
│   │   ├── logger.ts                    # Pino logger
│   │   ├── hashing.ts                   # Password hashing
│   │   ├── smtp.ts                      # Email config
│   │   └── storage.ts                   # Storage config
│   └── lib/                             # Shared utilities
│       ├── async-handler.ts
│       ├── validate.ts
│       ├── http/                        # HTTP utilities
│       │   ├── errors/                  # Custom error classes
│       │   └── response.ts              # Response formatter
│       ├── token/
│       │   └── jwt.ts                   # JWT utilities
│       ├── query-builder/               # Query helpers
│       ├── storage/                     # Storage abstraction
│       ├── smtp/                        # Email templates
│       ├── upload/                      # File upload
│       ├── swagger/                     # API documentation
│       └── constant/                    # Application constants
├── public/                              # Static assets
│   ├── swagger/                         # Swagger files
│   └── email-template/                  # Email templates
├── logs/                                # Application logs
├── script/
│   └── secret.sh                        # Environment generator
├── .env.example                         # Environment template
├── Dockerfile                           # Docker configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Module System

- The `main` branch uses **ES Modules** (`type: module`)
- For **CommonJS**, use the `commonjs` branch

### Development Workflow

1. **Start with hot reload**
   ```bash
   npm run dev
   ```
   This command:
   - Compiles TypeScript with watch mode
   - Automatically restarts on file changes
   - Resolves path aliases

2. **Code linting**
   ```bash
   npm run lint
   ```

3. **Code formatting**
   ```bash
   npm run format
   ```

### Adding New Features

1. **Create Entity** in `src/app/database/entity/`
2. **Create Schema** in `src/app/database/schema/` (Zod validation)
3. **Create Service** in `src/app/service/`
4. **Create Handler** in `src/app/handler/`
5. **Add Routes** in `src/app/routes/v1.ts`
6. **Run Migration** (if needed)

### Background Jobs

Scheduled jobs are defined in `src/app/job/`:

- **Session Cleanup** - Removes expired sessions
- **Upload URL Refresh** - Updates signed URLs before expiration

Jobs are configured with cron expressions using `node-cron`.

## Production Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Running Production Server

#### Using Node.js
```bash
NODE_ENV=production node ./dist/main.js
```

#### Using PM2 (Recommended)
```bash
# Production
npm run start:production

# Staging
npm run start:staging
```

PM2 provides:
- Process management
- Auto-restart on crashes
- Load balancing
- Log management

### Docker Deployment

#### Build Docker Image
```bash
docker build -t yourname/express-api-typeorm:v6.0.0 .
```

#### Run Container
```bash
docker run -p 8000:8000 \
  -e NODE_ENV=production \
  -e TYPEORM_HOST=your_db_host \
  -e TYPEORM_PASSWORD=your_db_password \
  -d yourname/express-api-typeorm:v6.0.0
```

#### Docker Compose (Example)
```yaml
version: '3.8'
services:
  api:
    image: yourname/express-api-typeorm:v6.0.0
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - TYPEORM_HOST=postgres
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=express_typeorm
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Environment-Specific Configuration

Set `NODE_ENV` to control behavior:

- `development` - Enables Swagger, verbose logging
- `staging` - Production-like with some debugging
- `production` - Optimized, minimal logging, no Swagger

## Scripts Reference

### Development
```bash
npm run dev              # Start with hot reload
npm run build            # Build TypeScript
npm run clean            # Remove dist folder
npm run secret           # Generate .env file
```

### Database
```bash
npm run db:create        # Create database
npm run db:drop          # Drop database
npm run db:schema-sync   # Sync schema with entities
npm run db:schema-drop   # Drop schema
npm run db:reset         # Drop + sync schema
npm run db:sync          # Create DB + reset schema
```

### Production
```bash
npm start                # Run production build
npm run start:staging    # Run with PM2 (staging)
npm run start:production # Run with PM2 (production)
```

### Release Management
```bash
npm run release          # Release new version
npm run release:patch    # Release patch version (0.0.x)
npm run release:minor    # Release minor version (0.x.0)
npm run release:major    # Release major version (x.0.0)
npm run release:pre      # Release pre-release (beta)
```

### Testing
```bash
npm test                 # Run tests (not implemented yet)
```

## Testing

Testing infrastructure is planned but not yet implemented. The project is set up to support:

- Unit tests (Jest)
- Integration tests
- E2E tests

Contributions to add comprehensive test coverage are welcome!

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript
- Follow ESLint rules
- Format code with Prettier
- Write meaningful commit messages

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Author

[![Github](https://badges.aleen42.com/src/github.svg)](https://github.com/masb0ymas)
[![Twitter](https://badges.aleen42.com/src/twitter.svg)](https://twitter.com/masb0ymas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Informational?logo=linkedin&color=0A66C2&logoColor=white)](https://www.linkedin.com/in/masb0ymas)

**masb0ymas** - [me@masb0ymas.com](mailto:me@masb0ymas.com)

## Support

If you find this project helpful, consider supporting:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I03MVAI)

[<img height="40" src="https://trakteer.id/images/mix/navbar-logo-lite.png">](https://trakteer.id/masb0ymas)

[<img height="40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png">](https://www.paypal.com/paypalme/masb0ymas)

---

## Acknowledgments

- Base API structure inspired by [express-api](https://github.com/masb0ymas/express-api)
- Built with modern Node.js best practices
- TypeScript for type safety
- TypeORM for elegant database management

## Links

- [Repository](https://github.com/masb0ymas/express-api-typeorm)
- [Issue Tracker](https://github.com/masb0ymas/express-api-typeorm/issues)
- [Changelog](https://github.com/masb0ymas/express-api-typeorm/releases)
