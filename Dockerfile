# Stage 1: Build (The "Builder")
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependency files and install ALL dependencies (including TypeScript)
COPY package*.json ./
RUN npm install

# Copy source code and build it
COPY . .
RUN npm run build

# Stage 2: Runtime (The "Runner")
FROM node:22-alpine AS runner
WORKDIR /app


# Install ONLY production dependencies to keep the image small
COPY package*.json ./
RUN npm install --only=production

# Copy ONLY the compiled files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port and run the compiled file
EXPOSE 8080
CMD ["npm", "start"]
