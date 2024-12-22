# Use Node.js as the base image
FROM node:20 AS build

# Set working directory
WORKDIR /usr/src/app

# Install Git (required for submodules)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy .git and submodule configuration files
COPY .git .git
COPY .gitmodules .gitmodules

# Clone the submodules
RUN git submodule update --init --recursive

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy the build output to Nginx's default public directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
