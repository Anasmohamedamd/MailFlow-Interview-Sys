# Use Node image
FROM node:20-alpine

#Set working directory
WORKDIR /app

# Copy packages files & install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of app
COPY . .

# Expose app port
EXPOSE 3000

# Run app
CMD ["node", "server.js"]