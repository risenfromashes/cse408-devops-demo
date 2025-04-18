FROM mcr.microsoft.com/playwright:v1.41.0-jammy

WORKDIR /app

# Copy package files and install dependencies
COPY package.json .
COPY playwright.config.js .
RUN npm install

# Copy test files
COPY tests/ ./tests/

# Set the command to run tests
CMD ["npx", "playwright", "test", "--reporter=html"]