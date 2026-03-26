# 🚀 Deployment Automation with GitHub Actions

A production-ready **Node.js + Express + MongoDB** server with fully automated CI/CD — push to `main` and it deploys itself to an Azure VM via SSH, Docker, and GitHub Actions.

---

## 📐 Architecture

```
┌─────────────┐      push to main      ┌──────────────────┐
│  Developer   │ ──────────────────────▶│  GitHub Actions   │
└─────────────┘                         └────────┬─────────┘
                                                 │ SSH
                                                 ▼
                                        ┌──────────────────┐
                                        │   Azure VM        │
                                        │  ┌──────────────┐ │
                                        │  │  Docker       │ │
                                        │  │  ┌─────────┐ │ │
                                        │  │  │ Node.js  │ │ │
                                        │  │  │  App     │ │ │
                                        │  │  └─────────┘ │ │
                                        │  └──────────────┘ │
                                        └──────────────────┘
                                                 │
                                                 ▼
                                        ┌──────────────────┐
                                        │   MongoDB Atlas   │
                                        └──────────────────┘
```

## ✨ Features

- **Express 5** REST API with TypeScript
- **MongoDB** integration via Mongoose
- **Multi-stage Docker build** — lightweight production image using `node:22-alpine`
- **GitHub Actions CI/CD** — auto-deploys on every push to `main`
- **SSH-based deployment** to an Azure VM using `appleboy/ssh-action`
- **Docker Compose** for easy container orchestration
- **Environment variable management** via `dotenv` and GitHub Secrets

## 🛠 Tech Stack

| Layer          | Technology                |
| -------------- | ------------------------- |
| Runtime        | Node.js 22 (Alpine)       |
| Language       | TypeScript 5              |
| Framework      | Express 5                 |
| Database       | MongoDB (Mongoose 9)      |
| Containerization | Docker + Docker Compose |
| CI/CD          | GitHub Actions            |
| Hosting        | Azure VM                  |

## 📁 Project Structure

```
.
├── .github/workflows/
│   └── deploy.yaml        # GitHub Actions CI/CD pipeline
├── db.ts                  # MongoDB connection helper
├── server.ts              # Express application entry point
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Container orchestration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies & scripts
├── .env                   # Environment variables (not committed)
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [Docker](https://www.docker.com/) & Docker Compose
- A MongoDB instance (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/Sahilagarwal623/deployment-automation-github-actions.git
cd deployment-automation-github-actions
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
PORT=8000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
```

### 3. Run locally (development)

```bash
npm install
npm run dev
```

The server will start with hot-reloading via `nodemon`.

### 4. Run with Docker

```bash
docker compose up -d --build
```

The app will be available on `http://localhost:8080`.

## ⚙️ CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yaml`) automates deployment on every push to `main`:

1. **Checkout** — pulls the latest code  
2. **SSH into Azure VM** — connects using secrets  
3. **Pull latest changes** — runs `git pull` on the server  
4. **Inject environment variables** — writes secrets to `.env`  
5. **Rebuild & restart** — runs `docker compose up -d --build`

### Required GitHub Secrets

| Secret         | Description                          |
| -------------- | ------------------------------------ |
| `SSH_HOST`     | Azure VM public IP or hostname       |
| `SSH_USERNAME` | SSH username (e.g. `azureuser`)      |
| `SSH_KEY`      | Private SSH key for authentication   |
| `PORT`         | Application port (e.g. `8000`)       |
| `MONGO_URL`    | MongoDB connection string            |

## 📜 Available Scripts

| Script          | Command                | Description                        |
| --------------- | ---------------------- | ---------------------------------- |
| `npm run dev`   | `nodemon + ts-node`    | Start dev server with hot reload   |
| `npm run build` | `tsc`                  | Compile TypeScript to `dist/`      |
| `npm start`     | `node dist/server.js`  | Run production build               |

## 🐳 Docker

The Dockerfile uses a **multi-stage build** for an optimized production image:

- **Stage 1 (Builder)** — installs all dependencies, compiles TypeScript
- **Stage 2 (Runner)** — copies only compiled JS + production dependencies

This keeps the final image small and free of dev tooling.

## 📄 License

ISC
