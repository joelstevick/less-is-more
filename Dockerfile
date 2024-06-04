# Use the official Node.js 14 image for building the app.
FROM node:14 AS build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the Next.js application.
RUN npm run build

# Use NGINX official image for serving the application.
FROM nginx:latest

# Copy built application from the previous stage to NGINX image.
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world.
EXPOSE 80

# NGINX is already started within the container, no need for CMD instruction.
