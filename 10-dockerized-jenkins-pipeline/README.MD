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

```
10-dockerized-jenkins-pipeline/
├── app/
│   ├── app.js
│   ├── package.json
│   └── test.js
├── Dockerfile
├── Jenkinsfile
├── README.md
└── screenshots/
```

## Features

- Dockerized Node.js application
- Jenkins Pipeline
- Automated Docker image build
- Automated test execution
- CI/CD workflow

## Screenshots

### Jenkins Dashboard

![Jenkins Dashboard](screenshots/jenkins-dashboard.png)

### Successful Pipeline

![Pipeline Success](screenshots/pipeline-success.png)

### Application Running

![Application](screenshots/app-running.png)

## Run Locally

```bash
docker build -t jenkins-demo:v1 .
docker run -d -p 3000:3000 --name jenkins-demo jenkins-demo:v1
```

Visit:

```
http://localhost:3000
```

## Output

```
Hello from Jenkins Docker Pipeline!
```

## Author

Muskan Patel
