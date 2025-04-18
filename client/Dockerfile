# Development stage
FROM node:20-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm ci # Use ci for potentially faster installs

# The volume mapping in docker-compose will override this in dev
COPY . ./

EXPOSE 3000

# Use Vite development command
CMD ["npm", "run", "dev"] 

# Build stage for production
FROM node:20-slim as build 

WORKDIR /app

COPY package*.json ./

RUN npm ci

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