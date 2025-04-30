# Use Node.js official image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose backend port (e.g., 5000)
EXPOSE 5000

# Run the backend app
CMD ["node", "index.js"]
