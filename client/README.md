# Client README for Todo Fullstack Application

# Todo Fullstack Application

This is a full-stack Todo application built with a React frontend, an Express backend, and a PostgreSQL database using Sequelize ORM. The application allows users to manage their todo items with features such as adding, deleting, and marking items as complete.

## Features

- Add new todo items with a time attribute.
- Mark todo items as complete using checkboxes.
- Delete todo items.
- Responsive design using Tailwind CSS.
- Hot reloading in development mode.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (for the backend)
- Docker (optional, for containerized development)

### Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the client directory:

   cd client

3. Install the dependencies:

   npm install

4. Set up Tailwind CSS:

   Follow the instructions in the `tailwind.config.js` file to customize your Tailwind setup.

### Running the Application

To start the development server with hot reloading:

npm start

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build of the application:

npm run build

The production build will be available in the `build` directory.

## Testing

Unit tests are set up for the application. To run the tests, use:

npm test

## Deployment

The application can be deployed using Docker. Refer to the `docker-compose.prod.yml` file for production deployment instructions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.