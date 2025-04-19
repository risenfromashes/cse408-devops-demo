FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /tests

# Copy package.json and package-lock.json/yarn.lock (if available)
COPY package*.json ./
# Copy playwright config
COPY playwright.config.js ./

# Install dependencies
RUN npm ci

# Copy test files
COPY tests/ ./tests/

# Set the entrypoint to run the tests
CMD ["npx", "playwright", "test"]