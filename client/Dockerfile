# Development stage
FROM node:20-slim as development

WORKDIR /app

COPY package*.json ./

# Changed from 'npm ci' to 'npm install' to generate/update package-lock.json if needed
RUN npm install

# The volume mapping in docker-compose will override this in dev
COPY . ./

EXPOSE 3000

# Use Vite development command
CMD ["npm", "run", "dev"] 

# Test stage for running tests (unit and e2e)
FROM node:20-slim as test

WORKDIR /app

COPY package*.json ./

# Changed from 'npm ci' to 'npm install' to ensure dependencies are properly installed
RUN npm install

COPY . ./

# Default command is to run tests
CMD ["npm", "run", "test"]

# Build stage for production
FROM node:20-slim as build 

WORKDIR /app

COPY package*.json ./

# Changed from 'npm ci' to 'npm install' to ensure dependencies are properly installed
RUN npm install

COPY . ./

# Build the app for production using Vite
RUN npm run build

# Production stage using nginx
FROM nginx:stable-alpine as production

# Copy built app from build stage - note path is 'dist' for Vite builds
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]