# Express API with TypeORM

[![Documentation](https://img.shields.io/badge/Documentation-yes-brightgreen.svg)](https://github.com/masb0ymas/express-api-typeorm#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/masb0ymas/express-api-typeorm/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/masb0ymas/express-api-typeorm/blob/master/LICENSE.md)
[![Version](https://img.shields.io/badge/Version-6.0.0--0-blue.svg)](https://github.com/masb0ymas/express-api-typeorm/releases)
[![Express](https://img.shields.io/badge/Express-4.21.2-informational?logo=express&color=22272E)](https://expressjs.com/)
![Node](https://badges.aleen42.com/src/node.svg)
![Eslint](https://badges.aleen42.com/src/eslint.svg)
![TypeScript](https://badges.aleen42.com/src/typescript.svg)
![Docker](https://badges.aleen42.com/src/docker.svg)

A robust Express API server built with TypeScript and TypeORM, featuring comprehensive tooling for modern backend development.
Base API using [express-api](https://github.com/masb0ymas/express-api)

## Features

- **[TypeScript](https://github.com/microsoft/TypeScript)** `5.8.x` - Type-safe JavaScript
- **[TypeORM](https://github.com/typeorm/typeorm)** `0.3.x` - ORM for TypeScript and JavaScript
- **[Express](https://expressjs.com/)** `4.21.x` - Fast, unopinionated web framework
- **[Nodemailer](https://github.com/nodemailer/nodemailer)** `6.x` - Email sending made simple
- **[Zod](https://github.com/colinhacks/zod)** `3.x` - TypeScript-first schema validation
- **[PostgreSQL](https://www.postgresql.org/)** - Advanced open source database
- **Code Quality**
  - JavaScript Style with [Standard with TypeScript](https://github.com/standard/eslint-config-standard-with-typescript)
  - Code formatting with [Prettier](https://github.com/prettier/prettier)
  - [ESLint](https://github.com/prettier/eslint-config-prettier) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint) integration
- **API Documentation** with [Swagger](https://github.com/swagger-api/swagger-ui) OpenAPI `3.x`
- **Logging** with [Pino](https://github.com/pinojs/pino)
- **Containerization** with [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

- Node.js >= 20.x
- PostgreSQL
- Docker (optional)

## Module System

- By default, the `main` branch uses ES Modules (`type: module`)
- For CommonJS, use the `commonjs` branch

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/masb0ymas/express-api-typeorm.git
   cd express-api-typeorm
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Then configure database settings in the `.env` file.

   or you can generate .env with command:

   ```bash
   yarn secret
   ```

3. **Install dependencies**

   ```bash
   yarn install
   ```

4. **Set up database**

   ```bash
   yarn db:create && yarn db:reset
   ```

   Or create your database manually

5. **Start development server**

   ```bash
   yarn dev
   ```

   With file watching:

   ```bash
   yarn dev:watch
   ```

## Deployment

### Release Process

```bash
yarn release
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t yourname/express:v1.0.0 .

# Run the container
docker run -p 7000:8000 -d yourname/express:v1.0.0
```

## Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:create` - Create database
- `npm run db:reset` - Reset database schema
- `npm run release` - Release a new version

## Author

[![Github](https://badges.aleen42.com/src/github.svg)](https://github.com/masb0ymas)
[![Twitter](https://badges.aleen42.com/src/twitter.svg)](https://twitter.com/masb0ymas)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Informational?logo=linkedin&color=0A66C2&logoColor=white)](https://www.linkedin.com/in/masb0ymas)

## Support

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I03MVAI)

[<img height="40" src="https://trakteer.id/images/mix/navbar-logo-lite.png">](https://trakteer.id/masb0ymas)

[<img height="40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png">](https://www.paypal.com/paypalme/masb0ymas)
