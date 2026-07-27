# 🚀 Project 11 – Dockerized Microservices Architecture with API Gateway

## 📌 Project Overview

This project demonstrates a **Dockerized Microservices Architecture** using **Node.js**, **Express**, **Docker**, **Docker Compose**, **MongoDB**, and **Redis**.

Instead of building one large application, the application is divided into multiple independent microservices. An **API Gateway** acts as a single entry point and routes client requests to the appropriate service.

---

# 🏗️ Architecture

```
                Client
                   │
             localhost:8080
                   │
             API Gateway
      ┌──────────┼───────────┬────────────┐
      │          │           │            │
 User Service  Order Service Payment Service Notification Service
      │
 ┌───────────────┐
 │               │
MongoDB       Redis
```

---

# 🛠️ Technologies Used

* Docker
* Docker Compose
* Node.js
* Express.js
* MongoDB
* Redis
* REST API

---

# 📂 Project Structure

```
11-microservices-architecture/
│
├── api-gateway/
├── user-service/
├── order-service/
├── payment-service/
├── notification-service/
├── screenshots/
├── docker-compose.yml
└── README.md
```

---

# 🚀 Services

| Service              | Port  |
| -------------------- | ----- |
| API Gateway          | 8080  |
| User Service         | 3001  |
| Order Service        | 3002  |
| Payment Service      | 3003  |
| Notification Service | 3004  |
| MongoDB              | 27017 |
| Redis                | 6379  |

---

# ⚙️ Run the Project

### Clone Repository

```bash
git clone <repository-url>
cd 11-microservices-architecture
```

### Start All Containers

```bash
docker compose up --build -d
```

### Check Running Containers

```bash
docker ps
```

### Stop Containers

```bash
docker compose down
```

---

# 🌐 API Endpoints

### API Gateway

```
GET /
```

### User Service

```
GET /users
```

### Order Service

```
GET /orders
```

### Payment Service

```
GET /payments
```

### Notification Service

```
GET /notifications
```

---

# 📸 Screenshots

Add the following screenshots inside the `screenshots/` folder.

* docker-ps.png
* docker-compose-up.png
* users-api.png
* orders-api.png
* payments-api.png
* notifications-api.png

Example:

```markdown
![Docker PS](screenshots/docker-ps.png)

![Users API](screenshots/users-api.png)

![Orders API](screenshots/orders-api.png)

![Payments API](screenshots/payments-api.png)

![Notifications API](screenshots/notifications-api.png)
```

---

# 📚 Key Learnings

* Docker Images
* Docker Containers
* Docker Compose
* Microservices Architecture
* API Gateway
* Service-to-Service Communication
* Docker Networking
* MongoDB Container
* Redis Container
* REST APIs

---

# 🎯 Interview Concepts Covered

* What are Microservices?
* API Gateway
* Docker Compose
* Docker Networking
* Container Communication
* MongoDB & Redis Containers
* Docker Images vs Containers
* Service Discovery
* REST APIs

---

# 👩‍💻 Author

**Muskan Patel**

Docker & DevOps Learning Project

