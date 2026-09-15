Production-Grade E-Commerce Microservices Platform

A production-oriented containerized e-commerce microservices platform
built to demonstrate practical Docker, networking, databases, Redis
caching, RabbitMQ asynchronous communication, NGINX reverse proxy,
health checks, container security, Docker Secrets, and CI/CD
readiness.

This project focuses primarily on DevOps and container engineering,
with lightweight Flask services used to demonstrate the infrastructure
concepts.

Architecture

                         INTERNET
                            |
                         NGINX
                      Reverse Proxy
                            |
                       +----+----+
                       |         |
                     AUTH     PRODUCT
                       |         |
                      DB        DB
                                  |
                               REDIS

                       ORDER SERVICE
                            |
                     +------+------+
                     |             |
                   DB          RABBITMQ
                                  |
                           NOTIFICATION

Observability / Security

Docker Containers
       |
    Trivy
       |
Vulnerability Scan

Docker Containers
       |
 Healthchecks
       |
 Container Security
       |
 Non-root + Capabilities + Resource Limits + Secrets

Services

Service                 Technology              Purpose

Auth                    Flask + Gunicorn        Authentication API

Product                 Flask + PostgreSQL +    Product API with
Redis                   caching

Order                   Flask + PostgreSQL +    Order creation and
RabbitMQ                event publishing

Notification            Python + RabbitMQ       Consumes order events
asynchronously

NGINX                   NGINX Alpine            Reverse proxy / API
gateway

Product DB              PostgreSQL 17           Product persistence

Order DB                PostgreSQL 17           Order persistence

Redis                   Redis 7 Alpine          Product response
caching

RabbitMQ                RabbitMQ 4 Management   Asynchronous messaging

Key DevOps Features

1. Containerization

Each application service has its own Docker image and runs
independently.

Dockerfiles for individual services

Gunicorn for production-style Flask serving

Minimal Python slim base images

Container health checks

Isolated service execution

2. Docker Networking

Services communicate using Docker's internal DNS and the backend
bridge network.

Example:

order-service -> order-db
order-service -> rabbitmq
product-service -> product-db
product-service -> redis-cache
nginx -> auth-service
nginx -> product-service
nginx -> order-service

3. PostgreSQL Persistence

Named Docker volumes preserve database data even when containers are
removed.

product-db-data
order-db-data

4. Redis Caching

The Product service uses Redis to cache product responses.

Flow:

Request
   |
Redis Cache?
  / \
YES  NO
 |    |
Return PostgreSQL
      |
   Store in Redis
      |
    Return

Cache entries use a TTL of 60 seconds.

5. RabbitMQ Asynchronous Communication

The Order service publishes order events to the durable order-events
queue.

Order Service
     |
     | publish
     v
 RabbitMQ
     |
     | consume
     v
Notification Service

Message acknowledgement and redelivery were tested by stopping the
consumer before acknowledgement and verifying that the message was
requeued and delivered after recovery.

6. NGINX Reverse Proxy

NGINX acts as the single API gateway for application routing.

Client
  |
NGINX :8081
  |
  +-- /auth/     -> auth-service
  +-- /products/ -> product-service
  +-- /orders/   -> order-service

NGINX also provides a gateway health endpoint.

7. Container Health Checks

Health checks are configured for critical services including:

Product DB

Order DB

Redis

RabbitMQ

Product service

Auth service

Order service

Docker Compose uses service health conditions for important
dependencies.

8. Container Security

Application containers run as a non-root user:

appuser

Additional hardening includes:

security_opt:
  - no-new-privileges:true

cap_drop:
  - ALL

Resource limits are also configured to reduce the impact of runaway
containers.

9. Docker Secrets

The Order PostgreSQL password is supplied using a Docker Secret:

/run/secrets/order_db_password

Sensitive configuration is excluded from Git using:

.env
secrets/

10. Trivy Security Scanning

The Order image was scanned using Trivy.

Initial scan:

HIGH: 53
CRITICAL: 3

After updating the Debian packages in the image:

HIGH: 44
CRITICAL: 0

The remaining reported vulnerabilities were primarily base-image
packages for which Trivy reported no currently available fixed version.
Fixable critical vulnerabilities were remediated rather than hidden with
an ignore rule.

API Endpoints

Auth

POST /login
GET  /health

Example login:

{
  "username": "admin",
  "password": "secret"
}

Product

GET /products
GET /health

Order

POST /orders
GET  /orders
GET  /health

Example order:

{
  "user_id": 1,
  "product_id": 1,
  "quantity": 2
}

NGINX Routes

The public gateway runs on:

http://localhost:8081

Routes:

/auth/
/products/
/orders/
/health

Project Structure

17-docker-production-platform/
├── .github/
│   └── workflows/
├── monitoring/
├── nginx/
│   └── nginx.conf
├── secrets/
│   └── order_db_password.txt
├── services/
│   ├── auth/
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── notification/
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── order/
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── product/
│       ├── app.py
│       ├── requirements.txt
│       └── Dockerfile
├── .env
├── .gitignore
├── docker-compose.yml
└── README.md

Running the Project

Clone the repository and enter the project directory:

cd 17-docker-production-platform

Create the required environment configuration and secret according to
the project configuration.

Validate the Compose configuration:

docker compose config

Build the services:

docker compose build

Start the platform:

docker compose up -d

Check running containers:

docker compose ps

Check logs:

docker compose logs -f

Stop the platform:

docker compose down

Verification

Useful verification commands:

docker compose ps
docker network ls
docker volume ls
docker images

Check Order service:

docker ps --filter name=order-service

Check the security user:

docker exec order-service whoami

Expected:

appuser

Run a Trivy scan:

trivy image --severity HIGH,CRITICAL 17-docker-production-platform-order:latest

Failure Testing

RabbitMQ reliability was tested by temporarily stopping acknowledgement
in the Notification consumer.

Observed flow:

Order Event
    |
RabbitMQ
    |
Notification Consumer
    |
ACK disabled
    |
Message becomes UNACKED
    |
Consumer failure
    |
Message requeued
    |
Consumer restart
    |
Message redelivered
    |
ACK restored
    |
Queue cleared

This demonstrates practical message durability and recovery behavior.

Technologies Used

Docker

Docker Compose

Python

Flask

Gunicorn

PostgreSQL

Redis

RabbitMQ

NGINX

Docker Networks

Docker Volumes

Docker Secrets

Trivy

GitHub Actions (CI/CD)

Screenshots

Project implementation evidence is available in the screenshots/
directory.

Application & Authentication









Product Service



















Order Service









RabbitMQ & Notification













NGINX





Docker Persistence





Service Communication



Resume Description

Production-Grade E-Commerce Microservices Platform | Docker, Docker
Compose, PostgreSQL, Redis, RabbitMQ, NGINX, Trivy

Built a production-oriented containerized e-commerce microservices
platform with isolated Docker networking, PostgreSQL persistence, Redis
caching, RabbitMQ asynchronous messaging, NGINX reverse proxy routing,
service health checks, Docker Secrets, non-root containers, Linux
capability restrictions, resource limits, and Trivy vulnerability
scanning. Implemented and tested RabbitMQ message acknowledgement and
redelivery during consumer failure.

Interview Highlights

Key DevOps topics demonstrated by this project:

Why microservices are independently containerized

Docker Compose service dependencies and health conditions

Docker bridge networking and service discovery

PostgreSQL persistence using named volumes

Redis cache hit/miss and TTL behavior

RabbitMQ durable queues and message acknowledgement

Message redelivery after consumer failure

NGINX reverse proxy and API routing

Running containers as non-root

Dropping Linux capabilities

no-new-privileges

Container resource limits

Docker Secrets

Trivy vulnerability scanning

Vulnerability remediation and security verification

Production-style Gunicorn serving

CI/CD automation with GitHub Actions

Author

Built as a hands-on DevOps portfolio project demonstrating practical
containerization, security, networking, persistence, caching, messaging,
reverse proxying, and CI/CD concepts.
