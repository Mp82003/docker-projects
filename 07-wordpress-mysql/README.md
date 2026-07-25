# WordPress + MySQL using Docker Compose

## 📌 Project Overview

This project demonstrates how to deploy a WordPress application with a MySQL database using Docker Compose. It uses Docker Compose to manage multiple containers, Named Volumes for persistent storage, and Restart Policies for high availability.

---

## 🛠️ Technologies Used

- Docker
- Docker Compose
- WordPress
- MySQL 8.0

---

## 📂 Project Structure

```
07-wordpress-mysql/
├── docker-compose.yml
├── README.md
└── screenshots/
```

---

## 🚀 Features

- Multi-container application using Docker Compose
- WordPress connected with MySQL
- Named Volume for persistent database storage
- Restart Policy (`unless-stopped`)
- Automatic Docker networking between containers

---

## ⚙️ Prerequisites

- Docker Desktop
- Docker Compose

---

## ▶️ Run the Project

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

Stop the project:

```bash
docker compose down
```

---

## 🌐 Access the Application

Open your browser and visit:

```
http://localhost:8090
```

> **Note:** If port **8082** is already in use, change the host port in `docker-compose.yml`.

---

## 💾 Persistent Storage

This project uses a Docker Named Volume:

```
mysql_data
```

The volume is mounted to:

```
/var/lib/mysql
```

This ensures that MySQL data is preserved even if the MySQL container is removed.

---

## 🔄 Restart Policy

Both containers use:

```yaml
restart: unless-stopped
```

This automatically restarts containers after Docker or system restart unless they were manually stopped.

---

## 📸 Screenshots

### WordPress Installation

![WordPress Installation](screenshots/wordpress-install.png)

### Running Containers

![Docker PS](screenshots/docker-ps.png)

### Docker Volumes

![Docker Volume](screenshots/docker-volume.png)

---

## 📚 Concepts Learned

- Docker Compose
- Multi-container Applications
- Environment Variables
- Named Volumes
- Persistent Storage
- Restart Policies
- Docker Networking
- WordPress + MySQL Integration

---


**Muskan Patel**
