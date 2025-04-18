# Development stage
FROM node:20-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

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

# Install ALL dependencies (including dev)
RUN npm ci

# Copy the rest of the app code
COPY . ./

# Run tests
CMD ["npm", "test"]

# Production stage
FROM node:20-slim as production

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY . ./

EXPOSE 5000

# Run in production mode using the start script
CMD ["npm", "start"]