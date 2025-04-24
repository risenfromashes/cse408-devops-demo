# Todo Fullstack Application

This is a full-stack Todo application built with a React frontend, an Express backend, and PostgreSQL as the database. The application allows users to manage their todo items with features such as adding, deleting, and marking items as complete. The frontend is styled using Tailwind CSS for a modern and responsive design.

## Project Structure

```
devops-demo/
├── client/                   # React frontend with Vite
│   ├── Dockerfile            # Multi-stage Docker configuration for client
│   ├── public/               # Public assets
│   ├── src/                  # Source files for React
│   │   ├── components/       # React components
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   └── services/         # API and mock services
│   ├── vite.config.js        # Vite configuration
│   └── package.json          # npm configuration for client
├── server/                   # Express backend
│   ├── Dockerfile            # Multi-stage Docker configuration for server
│   ├── src/                  # Source files for Express
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # API controllers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   └── tests/            # Test files
│   └── package.json          # npm configuration for server
├── e2e/                      # End-to-end tests with Playwright
│   ├── Dockerfile            # Docker configuration for e2e tests
│   ├── tests/                # E2E test files
│   └── playwright.config.js  # Playwright configuration
├── nginx/                    # Nginx configuration for reverse proxy
│   ├── Dockerfile            # Nginx Dockerfile
│   ├── default.conf          # Production Nginx configuration
│   └── local.conf            # Development/Test Nginx configuration
├── docker-compose.dev.yml    # Docker Compose for development
├── docker-compose.test.yml   # Docker Compose for testing
├── docker-compose.prod.yml   # Docker Compose for production
├── docker-compose.deploy.yml # Docker Compose for deployment
└── README.md                 # Project documentation
```

## Features

- Add new todo items with a title
- Mark todo items as complete using a checkbox
- Delete todo items from the list
- Responsive design using Tailwind CSS
- REST API with Express.js backend
- PostgreSQL database for data persistence
- Containerized with Docker for easy development, testing, and deployment
- Nginx reverse proxy for production-ready setup
- End-to-end testing with Playwright
- Support for local development with mock API

## Getting Started

### Prerequisites

- Node.js (v16+) and npm
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd devops-demo
   ```

## Running the Application

### Development Mode

Run the application in development mode with hot-reloading:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/todos

### Testing Mode

Run the application with end-to-end tests:

```bash
docker-compose -f docker-compose.test.yml up --build
```

This will:
1. Build and start the application in a production-like environment
2. Start the Playwright E2E tests against the running application
3. Generate test reports in `e2e/playwright-report` and `e2e/test-results`

### Production Mode

Build and run the application in production mode:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Access the application:
- Application: http://localhost:80 (through Nginx)

### Deployment

For deployment to a remote server:

```bash
docker-compose -f docker-compose.deploy.yml up -d
```

## Running Locally (Without Docker)

### Client

```bash
cd client
npm install
npm run dev
```

By default, the frontend will use the mock API when running locally.

### Server

```bash
cd server
npm install
npm run dev
```

Make sure to set up PostgreSQL locally and update the environment variables.

## Running Tests

### Unit Tests

```bash
# Client tests
cd client
npm test

# Server tests
cd server
npm test
```

### End-to-End Tests

```bash
cd e2e
npm install
npm test
```

## Environment Configuration

### Client Environment Variables

- `VITE_USE_MOCK_API`: Set to `false` to use the real API instead of the mock API
- `VITE_API_URL`: URL for the API endpoint

### Server Environment Variables

- `NODE_ENV`: Environment (`development`, `test`, or `production`)
- `DB_HOST`: PostgreSQL host
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: PostgreSQL database name
- `DB_LOGGING`: Enable/disable SQL query logging


## License

This project is licensed under the MIT License.