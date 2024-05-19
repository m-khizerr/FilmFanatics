## Running the Project
This project consists of a frontend and a backend service, each with its own Dockerfile. You can run the project using Docker Compose, Docker build separately for frontend and backend, or without Docker using npm.


## Environment Variables
Make sure to add the .env files in both frontend and backend folders and add the following links in those
# FRONTEND
REACT_APP_BACKEND_URL=http://localhost:3001
# BACKEND
JWT_SECRET = "YOUR SECRET KEY HERE"
DB = "YOUR MONGO DB URI HERE"

### Prerequisites

Ensure you have the following installed:
- Docker DEsktop
- Docker Compose
- Node.js (if you plan to run the project without Docker)

### Using Docker Compose

1. **Navigate to the Project Root**:

2. **Build and Start the Services**:
   docker-compose up --build

3. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3001`

### Using Docker Build Separately for Frontend and Backend

#### Build and Run Frontend

1. **Navigate to the Frontend Directory**:
   cd path/to/project/root/frontend

2. **Build the Frontend Image**:
   docker build -t frontendapp .

3. **Run the Frontend Container**:
   docker run -p 3000:3000 frontendapp

#### Build and Run Backend

1. **Navigate to the Backend Directory**:
   cd path/to/project/root/backend

2. **Build the Backend Image**:
   docker build -t backendapp .

3. **Run the Backend Container**:
   docker run -p 3001:3001 backendapp

4. **Ensure MongoDB is Running**:
   - Set the `DB` environment variable appropriately in the backend service to connect to MongoDB.

### Running Without Docker Using npm

#### Run Frontend

1. **Navigate to the Frontend Directory**:
   cd path/to/project/root/frontend

2. **Install Dependencies**:
   npm install

3. **Start the Frontend Development Server**:
   npm start

4. **Access the Frontend Application**:
   - Open your browser and navigate to `http://localhost:3000`.

#### Run Backend

1. **Navigate to the Backend Directory**:
   cd path/to/project/root/backend

2. **Install Dependencies**:
   npm install

3. **Start the Backend Server**:
   npm start

4. **Ensure MongoDB is Running**:
   - Make sure MongoDB is running locally or connect to a remote MongoDB instance. Set the `DB` environment variable to point to your MongoDB instance.

5. **Access the Backend API**:
   - Use a tool like Postman or your browser to test the backend endpoints at `http://localhost:3001`.
