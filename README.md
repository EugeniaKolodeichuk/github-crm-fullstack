# GitHub Repositories CRM

**A full-featured application that allows users to:**
- Register/login with email and password
- Connect your GitHub account
- View, update statistics and delete public GitHub repositories
- See repository statistics in cards
- Deleting repositories is safe as it happens in the MongoDB but not on GitHub
- Using private GitHub token, create repositories (public and private) directly in your Git profile
- To add a repository, simply specify the path to it in the format profile name/repository name


## Technologies

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **React Spinners**
- **Components: Forms, Modals, Conditional Rendering**

### Backend
- **Node.js**
- **Express.js**
- **Mongoose**
- **Bcrypt**
- **JWT Authentication**
- **dotenv**
- **@octokit/rest** (for creating interaction with GitHub API)

### Infrastructure
- **MongoDB**
- **Docker Compose**
- **Environment Variables (.env)**


## Environment Variables
**Create a `.env` file in `server/` folder:**
```
PORT=5000
JWT_SECRET=
MONGO_URI=
```

**Create a `.env` file in `client/` folder:**
```
VITE_API_BASE_URL=http://localhost:5000
```


## Getting Started with Docker
**Install Docker and Docker Compose**
**Clone this repository**

> [!WARNING]
> Before running add envs to client and server

**Run**
```
docker-compose up --build
```

*frontend: React app (available at http://localhost:5173)*
*backend: Express API (available at http://localhost:5000)*

## Access App
**Register with email + GitHub username**
**Paste your GitHub token when creating repos**
**View repository cards**


# Project Features
- Secure login with hashed passwords & JWT
- GitHub sync after login
- Responsive Tailwind UI
- Create repo on GitHub & store in DB
- Delete repo from local DB (not from GitHub)
- Creation date in UTC Unix format
- Only public repos shown in cards
