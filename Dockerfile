# Use the official Node.js 16 image.
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the Next.js application.
RUN npm run build

# Expose port 3000 to the outside world.
EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "start" ]
