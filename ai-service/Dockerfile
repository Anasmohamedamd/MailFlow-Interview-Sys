# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose AI service port
EXPOSE 5002

# Start server
CMD ["node", "server.js"]
