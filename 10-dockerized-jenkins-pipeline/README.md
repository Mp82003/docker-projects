# Dockerized Jenkins Pipeline

A simple CI/CD project demonstrating how to build and test a Dockerized Node.js application using Jenkins Pipeline.

## Tech Stack

- Docker
- Jenkins
- Node.js
- Express
- Git
- GitHub

## Project Structure

```text
10-dockerized-jenkins-pipeline/
├── app/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   └── test.js
├── Dockerfile
├── Jenkinsfile
├── README.md
└── screenshots/
```

## Features

- Dockerized Node.js application
- Jenkins Pipeline for CI/CD
- Automated Docker image build
- Automated test execution

## Screenshots

### Jenkins Dashboard

![Jenkins Dashboard](screenshots/jenkins-dashboard.png)

### Pipeline Success

![Pipeline Success](screenshots/pipeline-success.png)

### Application Running

![Application Running](screenshots/app-running.png)

## Build Docker Image

```bash
docker build -t jenkins-demo:v1 .
```

## Run Docker Container

```bash
docker run -d -p 3000:3000 --name jenkins-demo jenkins-demo:v1
```

Open in browser:

```
http://localhost:3000
```

## Output

```
Hello from Jenkins Docker Pipeline!
```
