# 🚀 Production-Grade E-Commerce Microservices Platform

A production-oriented **containerized E-Commerce Microservices Platform** built using Docker, Flask, PostgreSQL, Redis, RabbitMQ, NGINX, Prometheus, cAdvisor, Grafana and GitHub Actions.

The project demonstrates how a microservices-based application can be containerized, secured, monitored, tested, continuously integrated and deployed using modern DevOps practices.

---

## 🏗️ Architecture

```text
                         INTERNET
                            |
                         NGINX
                      API GATEWAY
                            |
          +-----------------+-----------------+
          |                 |                 |
        AUTH             PRODUCT            ORDER
          |                 |                 |
      PostgreSQL        PostgreSQL        PostgreSQL
                            |
                          Redis
                            |
                         RabbitMQ
                            |
                      NOTIFICATION


CI/CD Architecture
        

              GitHub
                 |
          GitHub Actions
                 |
        +--------+--------+
        |                 |
     Docker Build       Trivy
        |                 |
        +--------+--------+
                 |
              GHCR
                 |
        Self-Hosted Runner
                 |
        Docker Compose
                 |
          Production

🎯 Project Objectives

The main objectives of this project are:

Build a microservices-based application
Containerize every application service
Isolate services using Docker networks
Use PostgreSQL for persistent data storage
Implement Redis caching
Implement asynchronous communication using RabbitMQ
Use NGINX as an API Gateway
Implement container healthchecks
Apply Docker security best practices
Scan container images using Trivy
Monitor containers using Prometheus and cAdvisor
Visualize metrics using Grafana
Implement CI using GitHub Actions
Build and push versioned Docker images to GHCR
Implement CD using a self-hosted GitHub Actions runner
Test rollback using previous image versions
Test RabbitMQ message redelivery and failure recovery
🧩 Microservices
1. Auth Service

Technology:

Python
Flask
Gunicorn
Docker

Responsibilities:

User login
Basic authentication endpoint
Healthcheck endpoint

Endpoints:

POST /login
GET  /health
2. Product Service

Technology:

Python
Flask
PostgreSQL
Redis
Gunicorn
Docker

Responsibilities:

Retrieve product information
Store product data in PostgreSQL
Cache product responses using Redis

Endpoint:

GET /products

Healthcheck:

GET /health
Redis Caching Flow
Client
  |
Product Service
  |
  +----> Redis
  |        |
  |     Cache Hit
  |
  +----> PostgreSQL
           |
        Cache Result
           |
          Redis

Product data is cached using a TTL of 60 seconds.

3. Order Service

Technology:

Python
Flask
PostgreSQL
RabbitMQ
Gunicorn
Docker

Responsibilities:

Create orders
Store orders in PostgreSQL
Publish order events to RabbitMQ
Retrieve existing orders

Endpoints:

POST /orders
GET  /orders
GET  /health
Order Flow
Client
   |
   v
NGINX
   |
   v
Order Service
   |
   +------> PostgreSQL
   |
   +------> RabbitMQ
                |
                v
        Notification Service
4. Notification Service

Technology:

Python
RabbitMQ
Docker

Responsibilities:

Consume order events from RabbitMQ
Process order notifications asynchronously
Acknowledge successfully processed messages

RabbitMQ queue:

order-events

The queue is configured as durable and messages are published as persistent messages.

🗄️ Database Architecture

The application uses separate PostgreSQL databases for service isolation.

Product Service
      |
      v
  product-db
      |
  productdb


Order Service
      |
      v
   order-db
      |
   orderdb

Persistent Docker volumes:

product-db-data
order-db-data

This ensures database data survives container recreation.

🔴 Redis

Redis is used as a caching layer for the Product Service.

Product Service
      |
      v
    Redis
      |
  Cache Hit
      |
   Response

If the product data is not present in Redis:

Product Service
      |
      v
 PostgreSQL
      |
      v
 Redis Cache
      |
      v
 Response

Cache TTL:

60 seconds
🐇 RabbitMQ

RabbitMQ is used for asynchronous communication between the Order and Notification services.

Queue:

order-events

Message flow:

Order Service
      |
      | publish event
      v
   RabbitMQ
      |
      | consume
      v
Notification Service

The queue is durable and messages use persistent delivery mode.

🌐 NGINX API Gateway

NGINX is used as the entry point for application traffic.

Host port:

8081

Routing:

/auth/       → Auth Service
/products/   → Product Service
/orders/     → Order Service
/health      → NGINX Healthcheck

Example:

Client
  |
  v
localhost:8081
  |
  +---- /auth/      → auth-service
  |
  +---- /products/  → product-service
  |
  +---- /orders/    → order-service

NGINX also forwards client information using:

Host
X-Real-IP
🐳 Docker Networking

The application services communicate through a dedicated Docker bridge network:

backend

Services communicate using Docker container/service names instead of hardcoded IP addresses.

Examples:

product-db:5432
order-db:5432
redis-cache:6379
rabbitmq:5672

This provides service discovery within the Docker network.

❤️ Healthchecks

Healthchecks are implemented for infrastructure services.

Examples:

PostgreSQL
pg_isready
Redis
redis-cli ping
RabbitMQ
rabbitmq-diagnostics -q ping

Application services expose:

/health

Docker Compose uses health-based dependencies where required.

🔐 Security

Several Docker security practices are implemented.

Non-Root Containers

Application containers run using a dedicated:

appuser

instead of the root user.

no-new-privileges

Application services use:

security_opt:
  - no-new-privileges:true

This prevents processes inside the container from gaining additional privileges.

Linux Capabilities

Application containers drop unnecessary Linux capabilities:

cap_drop:
  - ALL

NGINX uses only the capabilities required for its startup behavior:

cap_drop:
  - ALL

cap_add:
  - CHOWN
  - SETGID
  - SETUID
Resource Limits

Application containers have memory limits.

Example:

mem_limit: 512m

NGINX:

mem_limit: 256m

This helps prevent an individual container from consuming unlimited host memory.

🔑 Docker Secrets

Database credentials for the Order Service are handled using Docker Secrets.

Secret:

order_db_password

Mounted inside the container at:

/run/secrets/order_db_password

The Order Service reads the password from the Docker secret instead of hardcoding it in application code.

Secret files are kept outside the Git repository.

🛡️ Trivy Security Scanning

Container images are scanned using Trivy during CI.

Images scanned:

ecommerce-product
ecommerce-auth
ecommerce-order
ecommerce-notification

The CI pipeline checks:

HIGH
CRITICAL

severity vulnerabilities.

Unfixed vulnerabilities are ignored using:

ignore-unfixed: true

This allows the pipeline to distinguish vulnerabilities that currently have no available fix.

📊 Monitoring

Monitoring stack:

cAdvisor
    |
    v
Prometheus
    |
    v
Grafana
cAdvisor

cAdvisor collects container-level metrics such as:

CPU usage
Memory usage
Container statistics

cAdvisor endpoint:

http://localhost:8082/metrics
Prometheus

Prometheus scrapes metrics from:

prometheus:9090
cadvisor:8080

Prometheus UI:

http://localhost:9090

Targets are verified through the Prometheus Targets page.

Expected state:

cadvisor     UP
prometheus   UP
Grafana

Grafana is used to visualize Prometheus metrics.

Grafana:

http://localhost:3000

Prometheus datasource:

http://prometheus:9090

Example dashboard metric:

container_memory_usage_bytes

Dashboard:

Container Memory Usage
🔄 CI Pipeline

GitHub Actions is used for Continuous Integration.

Pipeline flow:

Git Push
   |
   v
GitHub Actions
   |
   v
Checkout Code
   |
   v
Docker Buildx
   |
   v
Build Microservice Images
   |
   v
Trivy Security Scan
   |
   v
Login to GHCR
   |
   v
Version Images using Git SHA
   |
   v
Push Images to GHCR

Images are tagged using the Git commit SHA.

Example:

ghcr.io/mp82003/ecommerce-product:<git-sha>

This provides immutable version references for deployments and rollback.

🚀 CD Pipeline

Continuous Deployment is implemented using:

GitHub Actions
+
Self-Hosted Runner
+
Docker Compose

Deployment flow:

Successful CI
      |
      v
CD Workflow
      |
      v
Checkout Exact Commit
      |
      v
Login to GHCR
      |
      v
Pull Versioned Images
      |
      v
Docker Compose Deployment
      |
      v
Health Verification

The deployment verifies:

Production environment
Application containers
NGINX container
NGINX health endpoint
🔙 Rollback Strategy

Images are versioned using Git commit SHA.

Example:

Version A
6b64d6c6416b77ed7327dd6472f615b631915b9b

Previous version:

c01eed395282e2603952925dfb1eb227ca814ed9

Rollback is performed by selecting the previous image tag:

export IMAGE_TAG=<previous-git-sha>

Then:

docker compose pull
docker compose up -d

The rollback was tested successfully and the previous application version was restored.

🧪 Failure Testing

The project includes failure testing to validate message reliability.

RabbitMQ Message Redelivery Test

The Notification Service ACK mechanism was temporarily disabled.

Result:

Message
   |
RabbitMQ
   |
Notification Service
   |
ACK disabled
   |
Message becomes UNACKED

After the consumer stopped:

UNACKED
   |
   v
RabbitMQ
   |
Requeued
   |
   v
Notification Service Restart
   |
Message Redelivered
   |
ACK

Final queue state:

Pending: 0
Unacked: 0

This demonstrated reliable message processing and redelivery behavior.

🧪 End-to-End Testing

Order creation was tested successfully.

Example request:

POST /orders

Example payload:

{
  "user_id": 1,
  "product_id": 1,
  "quantity": 2
}

The request flow:

Client
  |
  v
NGINX
  |
  v
Order Service
  |
  +------> PostgreSQL
  |
  +------> RabbitMQ
               |
               v
       Notification Service

The order was successfully stored in PostgreSQL and the corresponding event was received by the Notification Service.

📁 Project Structure
17-docker-production-platform/
│
├── monitoring/
│   └── prometheus/
│       └── prometheus.yml
│
├── nginx/
│   └── nginx.conf
│
├── secrets/
│
├── services/
│   │
│   ├── auth/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   ├── notification/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   ├── order/
│   │   ├── app.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── product/
│       ├── app.py
│       ├── Dockerfile
│       └── requirements.txt
│
├── docker-compose.yml
└── README.md
🛠️ Technologies Used
Category	Technology
Containerization	Docker
Orchestration	Docker Compose
Backend	Python, Flask
Web Server	Gunicorn
API Gateway	NGINX
Database	PostgreSQL
Cache	Redis
Message Broker	RabbitMQ
Monitoring	Prometheus
Container Metrics	cAdvisor
Visualization	Grafana
Security Scanning	Trivy
CI/CD	GitHub Actions
Container Registry	GitHub Container Registry
Deployment	Self-Hosted GitHub Actions Runner
Version Control	Git / GitHub
▶️ Running the Project

Clone the repository:

git clone <repository-url>

Navigate to the project:

cd 17-docker-production-platform

Create/configure the required environment variables and Docker secrets.

Start the platform:

docker compose up -d

Check containers:

docker compose ps

View logs:

docker compose logs -f

Stop the platform:

docker compose down
🔍 Useful URLs
Component	URL
NGINX Gateway	http://localhost:8081
Grafana	http://localhost:3000
Prometheus	http://localhost:9090
cAdvisor	http://localhost:8082/metrics
RabbitMQ Management	http://localhost:15672
Product Service	http://localhost:5001
Auth Service	http://localhost:5002
Order Service	http://localhost:5003
