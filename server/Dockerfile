# Development stage
FROM node:20-slim as development

WORKDIR /app

COPY package*.json ./

# Changed from 'npm ci' to 'npm install' to generate/update package-lock.json if needed
RUN npm install

# The volume mapping in docker-compose will override this in dev
COPY . ./

EXPOSE 5000

# Use nodemon for hot-reloading during development (as defined in package.json)
CMD ["npm", "run", "dev"]

# Test stage
FROM node:20-slim AS test

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Changed from 'npm ci' to 'npm install' to ensure dependencies are properly installed
RUN npm install

# Copy the rest of the app code
COPY . ./

# Run tests
CMD ["npm", "test"]

# Production stage
FROM node:20-slim as production

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy source code
COPY . ./

EXPOSE 5000

# Run in production mode using the start script
CMD ["npm", "start"]