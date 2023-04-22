# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which the app will run
EXPOSE 4000

# Set the environment variables
ENV NODE_ENV="development"
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gamesdb?schema=public"
ENV ORIGIN="http://localhost:3000"

# Run the database migrations with Prisma
RUN npx prisma migrate deploy

# Start the application
CMD ["npm", "run", "start"]