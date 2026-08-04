# ==========================================
# Stage 1: Build the App (The heavy lifter)
# ==========================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (for better Docker caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build it
COPY . .
# NOTE: Make sure your .env variables are present during this build step!
RUN npm run build 

# ==========================================
# Stage 2: Serve the App (The lightweight server)
# ==========================================
FROM nginx:alpine

# Copy the compiled files from the builder stage to Nginx's public folder
# IMPORTANT: Change /app/dist to /app/build (Create React App) or /app/out (Next.js) based on your framework
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx routing configuration (we will write this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]