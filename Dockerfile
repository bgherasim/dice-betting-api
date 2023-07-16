# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Install bash
RUN apk update && apk add --no-cache bash

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
# RUN npm run build

# Expose the port that the server will listen on
EXPOSE 4000

# Start the server
CMD ["bash", "-c", "./wait-for-it.sh postgres-db:5432 -- npm run dev"]

# Start the server
# CMD ["npm", "run", "dev"]