# Redis Cache Application using Docker Compose

A simple multi-container Node.js application that uses Redis as an in-memory cache. The project demonstrates how Docker Compose can be used to run multiple services together and how Redis improves application performance using Cache Hit and Cache Miss.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Redis
- Docker
- Docker Compose

---

## 📁 Project Structure

```
08-redis-cache-app/
│── app/
│   ├── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml
├── screenshots/
└── README.md
```

---

## ✨ Features

- Multi-container application using Docker Compose
- Redis in-memory caching
- Cache Hit and Cache Miss implementation
- Environment variables for Redis configuration
- Automatic cache expiration using TTL
- Simple REST API

---

## 🏗️ Architecture

```
Client
   │
   ▼
Node.js Application
   │
   ▼
Redis Cache
   │
Cache Hit ✅  → Return Cached Data

Cache Miss ❌ → Fetch Data → Store in Redis → Return Response
```

---

## ⚙️ How to Run

### Clone Repository

```bash
git clone https://github.com/<your-username>/docker-projects.git
```

### Go to Project

```bash
cd docker-projects/08-redis-cache-app
```

### Start Application

```bash
docker compose up --build
```

### Test

```bash
curl http://localhost:3000
```

---

## 📸 Screenshots

### Docker Compose

> Add screenshot here

### Cache Miss

> Add screenshot here

## Screenshots

### Docker Compose
![Docker Compose](screenshots/docker-compose.png)

### Cache Miss
![Cache Miss](screenshots/cache-miss.png)

### Cache Hit
![Cache Hit](screenshots/cache-hit.png)

### Docker Containers
![Docker Containers](screenshots/docker-ps.png)

## 📚 Concepts Learned

- Docker Images
- Docker Containers
- Docker Compose
- Multi-container Applications
- Docker Networking
- Environment Variables
- Redis
- Cache Hit
- Cache Miss
- TTL (Time To Live)

---

## 👨‍💻 Author

**Muskan Patel**

Learning DevOps | Docker | Kubernetes | AWS
