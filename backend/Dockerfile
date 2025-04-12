# backend/Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the backend code
COPY . .

# Expose port (adjust if needed)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
