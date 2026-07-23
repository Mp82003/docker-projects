# 🐳 MySQL with Docker Volume

A hands-on Docker project demonstrating how to run MySQL inside a Docker container and persist database data using Docker Volumes.

---

## 📌 Project Overview

In this project, I deployed a MySQL database inside a Docker container and used a Docker Volume to ensure that the database survives even after the container is deleted.

The project demonstrates one of the most important Docker concepts: **persistent storage**.

---

## 🚀 Technologies Used

* Docker
* MySQL
* Docker Volumes
* Ubuntu (WSL)
* Git & GitHub

---

## 📂 Project Structure

```text
mysql-docker-volume/
├── README.md
└── notes.md
```

---

## 🏗️ Architecture

```text
              Docker Host
+--------------------------------------+
|                                      |
|   Docker Volume (mysql-data)         |
|             ▲                        |
|             │                        |
|      /var/lib/mysql                  |
|             │                        |
|      MySQL Container                 |
|             │                        |
|         MySQL Server                 |
+--------------------------------------+
```

---

## 📖 Commands Used

### Create a Docker Volume

```bash
docker volume create mysql-data
```

### Run MySQL Container

```bash
docker run -d \
--name mysql-db \
-e MYSQL_ROOT_PASSWORD=root123 \
-p 3306:3306 \
-v mysql-data:/var/lib/mysql \
mysql
```

### Enter the Container

```bash
docker exec -it mysql-db bash
```

### Login to MySQL

```bash
mysql -u root -p
```

### Create Database

```sql
CREATE DATABASE company;
```

### Verify Databases

```sql
SHOW DATABASES;
```

### Remove the Container

```bash
docker rm -f mysql-db
```

### Recreate the Container Using the Same Volume

```bash
docker run -d \
--name mysql-db \
-e MYSQL_ROOT_PASSWORD=root123 \
-p 3306:3306 \
-v mysql-data:/var/lib/mysql \
mysql
```

### Verify Persistence

```sql
SHOW DATABASES;
```

The `company` database still exists because it is stored in the Docker Volume.

---

## 💾 Why Docker Volumes?

Containers are ephemeral. When a container is removed, data stored inside its writable layer is lost.

Docker Volumes store data outside the container, allowing it to survive container deletion and be reused by new containers.

---

## 📸 Screenshots

Add your screenshots here.

### 1. Docker Volume Created

> *(Insert Screenshot)*

### 2. Running MySQL Container

> *(Insert Screenshot)*

### 3. Database Created

> *(Insert Screenshot)*

### 4. SHOW DATABASES Output

> *(Insert Screenshot)*

### 5. Container Deleted

> *(Insert Screenshot)*

### 6. Container Recreated

> *(Insert Screenshot)*

### 7. Database Persisted

> *(Insert Screenshot)*

### 8. Docker Volume Inspect

> *(Insert Screenshot)*

---

## 🎯 Key Learnings

* Difference between Docker Images and Containers
* Running MySQL in Docker
* Environment Variables
* Using `docker exec`
* Docker Volumes
* Data Persistence
* Volume Mounting
* Container Lifecycle
* Docker Inspect

---

## 📝 Interview Questions Practiced

* What is a Docker Volume?
* Why do we need Docker Volumes?
* What happens if a container is deleted?
* Difference between Docker Volume and Bind Mount.
* Explain `-v mysql-data:/var/lib/mysql`.
* How does Docker provide persistent storage?

---

## 👩‍💻 Author

**Muskan Patel**

Learning Docker and DevOps through hands-on production-style projects.

