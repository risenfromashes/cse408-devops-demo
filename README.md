# Todo Fullstack Application

This is a full-stack Todo application built with a React frontend, an Express backend, and PostgreSQL as the database. The application allows users to manage their todo items with features such as adding, deleting, and marking items as complete. The frontend is styled using Tailwind CSS for a modern and responsive design.

## Project Structure

```
devops-demo/
├── client/                # React frontend
│   ├── Dockerfile         # Docker configuration for client
│   ├── public/            # Public assets
│   ├── src/               # Source files for React
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   └── services/      # API and mock services
│   ├── vite.config.js     # Vite configuration
│   └── package.json       # npm configuration for client
├── server/                # Express backend
│   ├── Dockerfile         # Docker configuration for server
│   ├── src/               # Source files for Express
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # API controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── tests/         # Test files
│   └── package.json       # npm configuration for server
├── docker-compose.dev.yml  # Docker Compose for development
├── docker-compose.prod.yml # Docker Compose for production
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## Features

- Add new todo items with a title
- Mark todo items as complete using a checkbox
- Delete todo items from the list
- Responsive design using Tailwind CSS
- REST API with Express.js backend
- PostgreSQL database for data persistence
- Containerized with Docker for easy development and deployment
- Support for local development with mock API

## Getting Started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd devops-demo
   ```

### Running with Docker (Recommended)

1. Start the application using Docker Compose:
   ```
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/todos

### Running Locally (Development)

1. Set up the client:
   ```
   cd client
   npm install
   npm run dev
   ```

2. Set up the server:
   ```
   cd server
   npm install
   npm run dev
   ```

3. By default, the frontend will use the mock API when running locally.

### Running Tests

To run unit tests for the server:
```
cd server
npm test
```

## Development Modes

- **Local Development Mode**: When running the client directly with `npm run dev`, it uses a mock API by default for quick development without a backend.
- **Full Stack Development Mode**: When using Docker Compose, the client connects to the real Express API and PostgreSQL database.

## Environment Configuration

- `VITE_USE_MOCK_API`: Set to `false` to use the real API instead of the mock API
- `VITE_API_URL`: URL for the API endpoint (default: http://localhost:5000/api/todos)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.