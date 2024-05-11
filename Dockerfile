FROM node:lts-alpine as build


# Set the working directory in the container
WORKDIR /panelapp

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js image to run the application
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /panelapp

# Copy the build files from the previous stage to the current stage
COPY --from=build /panelapp/ ./

# Expose the port the app runs on
EXPOSE 3030

# Define the command to run the app
CMD ["npm", "run", "start"]