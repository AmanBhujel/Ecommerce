# Use the specified Node.js version
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Update and install necessary packages
#RUN apt-get update && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev


# Install app dependencies
# RUN apk add --no-cache python3 pkgconfig
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start your app
CMD [ "npm", "run", "dev" ]
