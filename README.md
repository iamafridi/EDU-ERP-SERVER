# EDU-ERP Backend

REST API server for **EDU-ERP**, a full-featured college management system built for medical colleges. Handles authentication, role-based access control, academics, finance, clinical operations, campus life, and more — all through a unified Express API.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Runtime | Node.js 20+ | |
| Framework | Express 5 | With async error handling |
| Language | TypeScript 5.8 | Strict mode enabled |
| Database | MongoDB 7 + Mongoose 8 | ODM with pre/post hooks |
| Auth | Firebase Admin SDK | JWT verification + Redis blacklist |
| Caching | Redis (ioredis) | Query cache + distributed locks |
| Validation | Zod 4 | Request body/params/query schemas |
| Email | Nodemailer + SMTP | Transactional emails via college SMTP |
| PDF | PDFKit | Receipts, transcripts, invoices |
| Real-time | Socket.io | Push notifications, live updates |
| Events | KafkaJS | Audit logs, fee events, DLQ |
| Search | Custom QueryBuilder | Search, filter, sort, paginate |
| API Docs | Swagger (swagger-jsdoc) | Auto-generated at `/api-docs` |
| Testing | Jest + Supertest | Unit and integration tests |
| Linting | ESLint + Prettier | Flat config with TS plugin |

## Features

- **80 API modules** covering every college operation
- **Firebase authentication** with JWT token verification
- **5-role RBAC system** — super-admin, domain-admin, faculty, student, staff (with 12 staff sub-roles)
- **Domain-scoped admin types** — faculty-admin, finance-admin, medical-admin, staff-admin
- **Reusable CRUD factory** — generates model, service, controller, and routes for any entity
- **QueryBuilder** — pagination, full-text search, field selection, sorting, filtering
- **Soft deletes** across all modules via Mongoose pre-find hooks
- **Audit middleware** — automatically logs all CUD operations with before/after diffs
- **Redis caching layer** — query caching with pattern-based invalidation and distributed locks
- **Event-driven architecture** — Kafka consumers for audit persistence, fee notifications, and dead letter queues
- **Socket.io real-time** — targeted push notifications per user with JWT auth
- **PDF generation** — receipt and transcript generation with PDFKit
- **Global search** — cross-module search with weighted relevance
- **Rate limiting** — per-IP and per-route request throttling
- **Swagger documentation** — auto-generated API docs in non-production environments
- **Seed system** — comprehensive demo data for all modules

## Prerequisites

- **Node.js** 20 or later
- **MongoDB** 7+ (local or Atlas)
- **Redis** 7+ (local or cloud)
- **Firebase project** with Admin SDK credentials
- **SMTP server** for email (college mail or Gmail with app password)

Optional:
- **Kafka** for event streaming (audit logs, fee events)
- **RabbitMQ** for message queuing

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/iamafridi/EDU-ERP-SERVER.git
cd EDU-ERP-SERVER

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your credentials (see Environment Variables below)

# 4. Start the dev server
npm run start:dev
```

The server starts on `http://localhost:5000`. On first startup, it automatically seeds demo data into the database.

API docs are available at `http://localhost:5000/api-docs` in development mode.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | MongoDB connection string | `mongodb://localhost:27017/edu_erp` |
| `BCRYPT_SALT_ROUNDS` | Password hashing rounds | `15` |
| `DEFAULT_PASS` | Default password for seeded users | `change_this_default_password` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `your-project-id` |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | `firebase-adminsdk@...iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key (PEM format) | `"-----BEGIN PRIVATE KEY-----\n..."` |
| `JWT_SECRET` | Secret for JWT signing | Any random string |
| `JWT_EXPIRES_IN` | Token expiry duration | `7d` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | `redis123` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username/email | `you@gmail.com` |
| `SMTP_PASS` | SMTP password or app password | `your-app-password` |
| `EMAIL_FROM` | Sender email address | `noreply@college.edu` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## Project Structure

```
backend/
├── src/
│   ├── server.ts                      # Entry point — connects DB, seeds, starts server
│   ├── app.ts                         # Express app — middleware stack, routes, error handlers
│   ├── shared/                        # Cross-cutting concerns
│   │   ├── roles.ts                   # Role hierarchy + sub-role definitions
│   │   ├── permissions.ts             # Module-level RBAC matrix + canAccess()
│   │   └── status.ts                  # Entity statuses + badge color mapping
│   ├── app/
│   │   ├── config/                    # Environment config + Firebase init
│   │   ├── base/                      # Reusable CRUD factory (model, service, controller, route)
│   │   ├── builder/                   # QueryBuilder for search, filter, sort, paginate
│   │   ├── middlewares/               # Auth, validation, error handling, audit
│   │   ├── modules/                   # Feature modules (80 routes)
│   │   │   ├── auth/                  # Login, register, token refresh
│   │   │   ├── user/                  # User CRUD + role management
│   │   │   ├── student/               # Student profiles
│   │   │   ├── faculty/               # Faculty profiles
│   │   │   ├── academicSemester/      # Semester definitions
│   │   │   ├── course/                # Course catalog + prerequisites
│   │   │   ├── attendance/            # Attendance tracking
│   │   │   ├── exam/                  # Examination scheduling
│   │   │   ├── grade/                 # Grade management
│   │   │   ├── fee/                   # Fee tracking + payments
│   │   │   ├── healthCenter/          # Health center records
│   │   │   ├── opd/                   # Outpatient department
│   │   │   ├── ipd/                   # Inpatient department
│   │   │   ├── laboratory/            # Lab test management
│   │   │   ├── pharmacy/              # Pharmacy inventory
│   │   │   ├── library/               # Library management
│   │   │   ├── hostel/                # Hostel + room allocation
│   │   │   ├── mess/                  # Mess + meal planning
│   │   │   ├── transport/             # Transport routes
│   │   │   ├── maintenance/           # Maintenance requests
│   │   │   └── ...                    # 60+ more modules
│   │   ├── consumers/                 # Kafka event consumers
│   │   ├── errors/                    # Error classes + handlers
│   │   ├── interface/                 # Shared TypeScript interfaces
│   │   ├── routes/                    # Central route aggregator
│   │   ├── seed/                      # Demo data seeder
│   │   └── utils/                     # Catch-async, email, Redis, PDF, Socket, etc.
│   ├── scripts/                       # Standalone scripts (seed, migration)
│   └── types/                         # Custom type declarations
├── tests/                             # Jest test files
├── scripts/                           # Utility scripts (role migration)
├── .github/workflows/ci.yml          # CI pipeline (lint, typecheck, test, build)
├── package.json
├── tsconfig.json
├── jest.config.js
├── eslint.config.mjs
├── vercel.json
└── .env.example
```

Each module follows the same convention:

```
module/
├── module.interface.ts      # TypeScript types and interfaces
├── module.constant.ts       # Enums, searchable fields, filter maps
├── module.model.ts          # Mongoose schema with hooks
├── module.validation.ts     # Zod validation schemas
├── module.controller.ts     # HTTP request handlers
├── module.service.ts        # Business logic and database operations
└── module.route.ts          # Express router with auth + validation
```

## API Overview

All endpoints are prefixed with `/api/v1`. Here's a summary by domain:

### Authentication & Users
- `POST /auth/login` — Authenticate with Firebase token
- `POST /auth/register` — Register new user
- `GET /auth/me` — Get current user profile
- `GET /users` — List all users (admin)
- `PATCH /users/:id/role` — Change user role

### Academics
- `GET /academic-semesters` — List semesters
- `POST /courses` — Create course
- `GET /attendance` — View attendance records
- `POST /exams` — Schedule examination
- `POST /grades` — Enter grades
- `GET /transcripts` — Generate transcripts
- `GET /timetables` — Class schedules

### Finance
- `POST /fee-structures` — Define fee structures
- `GET /fees` — List fee records
- `POST /receipts` — Generate payment receipts
- `GET /payrolls` — Payroll management
- `GET /budgets` — Budget tracking
- `POST /scholarships` — Scholarship management

### Medical & Clinical
- `POST /health-center` — Health center records
- `POST /opd` — Outpatient visits
- `POST /ipd` — Inpatient admissions
- `POST /laboratory` — Lab test orders
- `POST /pharmacy` — Pharmacy records
- `POST /clinical-rotations` — Clinical rotation scheduling
- `POST /skill-labs` — Skill lab sessions

### Campus Life
- `POST /hostel` — Hostel management
- `POST /rooms` — Room allocation
- `POST /mess` — Mess menu planning
- `POST /transport` — Transport routes
- `GET /library` — Library operations
- `POST /maintenance` — Maintenance requests
- `POST /notices` — Notice board

### Security & Operations
- `POST /gate-entries` — Gate entry logging
- `POST /incidents` — Incident reports
- `POST /patrol-logs` — Patrol logging
- `POST /handovers` — Guard shift handovers
- `POST /visitor-logs` — Visitor tracking

### Administration
- `GET /dashboard` — Dashboard with KPIs
- `GET /audit-logs` — Audit trail
- `GET /reports` — Report generation
- `GET /search` — Global search across modules
- `POST /committees` — Committee management

The full API documentation with request/response schemas is available at `/api-docs` when the server is running in development mode.

## Authentication & Authorization

The system uses a two-layer authorization model:

**Layer 1 — Route-level (middleware):**
Every protected route passes through the `auth()` middleware which:
1. Verifies the Firebase JWT token
2. Checks the Redis blacklist for revoked tokens
3. Blocks demo accounts from write operations
4. Enforces role-based access (e.g., `auth('super-admin', 'domain-admin')`)

**Layer 2 — Data-level (scopeQuery):**
For modules where users should only see their own data (students viewing their fees, leaves, etc.), the `scopeQuery()` and `assertOwnership()` utilities filter results based on the requesting user's ID.

### Role Hierarchy

```
super-admin          (full system access)
  └── domain-admin   (scoped to a domain: faculty, finance, medical, staff)
       └── faculty   (teaching staff)
       └── staff     (operational staff with sub-roles)
            ├── doctor, nurse, lab-technician, pharmacist
            ├── accountant, guard, warden, maintenance
            ├── librarian, receptionist, counselor, mess-manager
            └── ...
  └── student        (limited to own data + read access)
```

### Staff Sub-roles by Domain

| Domain | Sub-roles |
|--------|-----------|
| Medical | doctor, nurse, lab-technician, pharmacist |
| Finance | accountant |
| Security | guard, warden |
| Facility | maintenance |
| Library | librarian |
| Front Desk | receptionist, counselor |
| Mess | mess-manager |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start:prod` | Start production server |
| `npm run seed` | Run seed script standalone |
| `npm run lint` | Run ESLint on source files |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run test` | Run Jest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run prettier` | Format code with Prettier |
| `npm run db:backup` | Backup MongoDB (requires mongodump) |
| `npm run db:restore` | Restore MongoDB backup |

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

Tests are located in the `tests/` directory. The project uses Jest with ts-jest for TypeScript support.

## Deployment

### Vercel

The project includes a `vercel.json` that deploys the compiled `dist/server.js` as a serverless function. Push to `main` or `develop` to trigger deployment.

### Docker

Infrastructure services are defined in the root `docker-compose.yml`:

```bash
# From the project root
docker compose up -d
```

This starts MongoDB, Redis, Kafka, and RabbitMQ for local development.

### Production Checklist

- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure proper Firebase credentials
- Set up Redis with authentication
- Configure SMTP with a production email provider
- Enable MongoDB Atlas IP whitelisting
- Set `CLIENT_URL` to your production frontend domain

## License

MIT
