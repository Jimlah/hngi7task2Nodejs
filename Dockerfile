# Use node >= v10
FROM node:10

# create working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose API port
EXPOSE 3000

# Launch application
CMD ["node","app.js"]