# Use the official Node.js 18 image for building the app.
FROM --platform=linux/amd64 node:18-alpine AS build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Clean npm cache and install dependencies.
RUN npm cache clean --force && npm install

# Verify Node.js and npm versions
RUN node -v && npm -v

# Copy local code to the container image.
COPY . .

# Print current directory and its contents for debugging
RUN echo "Current directory contents:" && ls -la

# Build the Next.js application with verbose output for debugging
RUN npm run build --verbose

# Use NGINX official image for serving the application.
FROM nginx:latest

# Remove the default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built application from the previous stage to NGINX image.
COPY --from=build /usr/src/app/.next /usr/share/nginx/html/_next
COPY --from=build /usr/src/app/public /usr/share/nginx/html

# Add custom error pages
COPY error_pages /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world.
EXPOSE 80
