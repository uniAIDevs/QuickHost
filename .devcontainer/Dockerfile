# Use an official lightweight Node.js image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /workspace

# Copy the project files into the container at /workspace
COPY . /workspace

# Install any necessary dependencies
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NAME WaspProject

# Run the app when the container launches
CMD ["wasp", "start"]
