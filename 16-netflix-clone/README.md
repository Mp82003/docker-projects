# 🎬 Netflix Clone — Dockerized Microservices Architecture

A Netflix-style application built using a **Dockerized Microservices Architecture**.

The project demonstrates how multiple independent services can be containerized, connected through Docker networking, managed using Docker Compose, and exposed through an **NGINX reverse proxy**.

---

## 🚀 Project Overview

This project simulates a Netflix backend using multiple independent microservices.

The application contains:

- 🎬 Movie Service
- 🔐 Authentication Service
- 🚪 API Gateway
- 🤖 Recommendation Service
- 🍃 MongoDB
- ⚡ Redis
- 🌐 React Frontend
- 🔀 NGINX Reverse Proxy

All services are containerized and managed using Docker Compose.

---

# 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │     Browser     │
                         │   localhost     │
                         │      :8085      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │      NGINX      │
                         │  React + Proxy  │
                         │      :8085      │
                         └────────┬────────┘
                                  │
                                  │ /api
                                  ▼
                         ┌─────────────────┐
                         │   API Gateway   │
                         │      :3003      │
                         └───────┬─────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
        │ Movie Service│ │ Auth Service │ │ Recommendation   │
        │    :3001     │ │    :3002     │ │     Service      │
        └──────┬───────┘ └──────┬───────┘ │      :3004       │
               │                │           └────────┬─────────┘
               │                │                    │
               └────────────────┼────────────────────┘
                                │
                         ┌──────▼──────┐
                         │   MongoDB   │
                         │    :27017   │
                         └─────────────┘

                         ┌─────────────┐
                         │    Redis    │
                         │    :6379    │
        

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container application management |
| Linux / WSL | Development environment |
| Node.js | Backend microservices |
| Express.js | REST APIs |
| React | Frontend |
| NGINX | Web server and reverse proxy |
| MongoDB | Persistent database |
| Mongoose | MongoDB integration |
| Redis | Caching |
| JWT | Authentication |
| Docker Network | Service-to-service communication |
| Docker Volumes | Persistent MongoDB storage |
| Git & GitHub | Version control |


📁 Project Structure


16-netflix-clone/
│
├── movie-service/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── auth-service/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── api-gateway/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── recommendation-service/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .dockerignore
│
├── screenshots/
│
├── docker-compose.yml
├── .gitignore
└── README.md

🔹 Microservices
1. Movie Service

The Movie Service handles movie-related operations.

Responsibilities
Create movie
Get all movies
Get movie by ID
Update movie
Delete movie
MongoDB integration

Port:

3001
2. Authentication Service

The Authentication Service handles authentication-related operations.

Port:

3002

Technologies:

Node.js
Express.js
JWT
MongoDB

The JWT secret is provided through an environment variable instead of being hardcoded in the application.

3. API Gateway

The API Gateway acts as the single entry point for backend API requests.

Port:

3003

Example:

/api/movies
      ↓
Movie Service


/api/recommendations
      ↓
Recommendation Service

The frontend does not need to directly communicate with every backend service.

4. Recommendation Service

The Recommendation Service provides recommendation-related functionality.

Port:

3004

It uses:

MongoDB for persistent data
Redis for caching
🍃 MongoDB

MongoDB is used as the persistent database.

Container:

netflix-mongodb

Port:

27017

A Docker named volume is used:

mongodb_data

This allows MongoDB data to persist even if the container is recreated.

⚡ Redis

Redis is used as an in-memory cache.

Container:

netflix-redis

Port:

6379

The Recommendation Service connects to Redis using the Docker Compose service name:

redis

rather than:

localhost
🔀 NGINX Reverse Proxy

NGINX is used for two main purposes:

Serve the React production build.
Reverse proxy API requests to the API Gateway.

Frontend:

http://localhost:8085

API request:

/api/movies

NGINX forwards the request to:

API Gateway :3003

The request flow is:

Browser
   ↓
NGINX :8085
   ↓
/api/movies
   ↓
API Gateway :3003
   ↓
Movie Service :3001
🐳 Docker

Each microservice has its own Dockerfile.

Example:

FROM node:20-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3001


CMD ["node", "app.js"]
🏭 Multi-Stage Docker Build

The React frontend uses a multi-stage Docker build.

Node.js Builder
      ↓
npm run build
      ↓
React Production Files
      ↓
NGINX Alpine
      ↓
Production Container

This keeps the final frontend image focused on serving production assets instead of including the Node.js build environment.

🧩 Docker Compose

Docker Compose manages the complete application stack.

The project contains 7 services:

1. mongodb
2. redis
3. movie-service
4. auth-service
5. recommendation-service
6. api-gateway
7. frontend

Start the complete application:

docker compose up -d

Check services:

docker compose ps

Stop the application:

docker compose down
❤️ Health Checks

MongoDB and Redis use Docker health checks.

MongoDB:

healthcheck:
  test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
  interval: 10s
  timeout: 5s
  retries: 5

Redis:

healthcheck:
  test: ["CMD", "redis-cli", "ping"]
  interval: 10s
  timeout: 5s
  retries: 5

This allows Docker to determine whether the dependencies are healthy.

🔄 Restart Policy

Services use:

restart: unless-stopped

This allows containers to automatically restart after unexpected failures or Docker daemon restarts.

🔐 Environment Variables & Security

Sensitive configuration is stored using environment variables.

Example:

JWT_SECRET=your-secret

The .env file is excluded from Git using .gitignore.

.env

This prevents accidentally committing secrets to GitHub.

🌐 Docker Networking

Docker Compose automatically creates a shared network for the application.

Services communicate using Docker service names.

Example:

movie-service → mongodb


auth-service → mongodb


recommendation-service → mongodb


recommendation-service → redis


api-gateway → movie-service


api-gateway → auth-service


api-gateway → recommendation-service

Inside containers, services should use names such as:

mongodb
redis
movie-service
auth-service
recommendation-service

instead of localhost.

🧪 API Testing
Movie Service
curl http://localhost:3001/movies
API Gateway
curl http://localhost:3003/movies
Recommendation API
curl http://localhost:3003/recommendations
Through NGINX
curl http://localhost:8085/api/movies
curl http://localhost:8085/api/recommendations
🔄 Complete Request Flow
User
 ↓
React Frontend
 ↓
NGINX
 ↓
API Gateway
 ↓
Microservice
 ↓
MongoDB / Redis

For example:

GET /api/movies
       ↓
NGINX
       ↓
API Gateway
       ↓
Movie Service
       ↓
MongoDB

Recommendation request:

GET /api/recommendations
       ↓
NGINX
       ↓
API Gateway
       ↓
Recommendation Service
       ↓
Redis / MongoDB
🚀 How to Run the Project
1. Clone Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd 16-netflix-clone
2. Create Environment File

Create:

.env

Add:

JWT_SECRET=your-secret
3. Start Application
docker compose up -d
4. Check Containers
docker compose ps

Expected services:

netflix-mongodb
netflix-redis
netflix-movie-service
netflix-auth-service
netflix-recommendation-service
netflix-api-gateway
netflix-frontend
5. Open Application
http://localhost:8085
🛠️ Useful Docker Commands

Check containers:

docker compose ps

View all logs:

docker compose logs

View specific service logs:

docker compose logs movie-service

Follow logs:

docker compose logs -f movie-service

Validate Compose:

docker compose config

Build services:

docker compose build

Rebuild a service:

docker compose build frontend

Restart services:

docker compose restart

Check Docker networks:

docker network ls

Check resource usage:

docker stats

Check images:

docker images
🧹 Cleanup

Stop containers:

docker compose down

Stop containers and remove volumes:

docker compose down -v

⚠️ docker compose down -v removes the MongoDB volume and therefore deletes the stored database data.

📸 Screenshots
Project Structure

Movie Service

MongoDB

Docker

Docker Compose

Authentication Service

API Gateway

Recommendation Service

Redis

React Frontend

NGINX Production

🎯 DevOps Concepts Demonstrated

This project demonstrates practical experience with:

Docker containerization
Dockerfiles
Multi-stage Docker builds
Docker Compose
Microservices architecture
API Gateway pattern
Docker networking
Container-to-container communication
Service discovery
MongoDB persistence
Docker volumes
Redis caching
NGINX reverse proxy
Health checks
Restart policies
Environment variables
Secret management basics
REST API testing
Container troubleshooting
Git and GitHub


