# Todo Fullstack Application

This is a full-stack Todo application built with a React frontend, an Express backend, and PostgreSQL as the database. The application allows users to manage their todo items with features such as adding, deleting, and marking items as complete. The frontend is styled using Tailwind CSS for a modern and responsive design.

## Project Structure

```
todo-fullstack
├── client                # React frontend
│   ├── public            # Public assets
│   ├── src               # Source files for React
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── tsconfig.json     # TypeScript configuration for client
│   └── package.json      # npm configuration for client
├── server                # Express backend
│   ├── src               # Source files for Express
│   ├── package.json      # npm configuration for server
│   └── tsconfig.json     # TypeScript configuration for server
├── .github               # GitHub Actions workflows
├── docker-compose.dev.yml # Docker Compose for development
├── docker-compose.prod.yml # Docker Compose for production
├── Dockerfile.client     # Dockerfile for client
├── Dockerfile.server     # Dockerfile for server
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## Features

- Add new todo items with a title and time attribute.
- Mark todo items as complete using a checkbox.
- Delete todo items from the list.
- Responsive design using Tailwind CSS.
- Unit tests for backend functionality using Jest.

## Getting Started

### Prerequisites

- Node.js
- Docker and Docker Compose
- PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-fullstack
   ```

2. Set up the client:
   ```
   cd client
   npm install
   ```

3. Set up the server:
   ```
   cd server
   npm install
   ```

4. Create a `.env` file in the server directory based on the `.env.example` file and configure your database connection.

### Running the Application

- For development, use Docker Compose:
  ```
  docker-compose -f docker-compose.dev.yml up
  ```

- For production, use:
  ```
  docker-compose -f docker-compose.prod.yml up
  ```

### Running Tests

To run unit tests for the server, navigate to the server directory and run:
```
npm test
```

### Deployment

The application can be deployed to an Azure VM using the GitHub Actions workflow defined in `.github/workflows/ci-cd.yml`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.