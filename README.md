# Portfolio Website 🚀

A modern, responsive portfolio website built with React and Go.

## 🌟 Features

- **Frontend**: React with Tailwind CSS
- **Backend**: Go with Gin framework
- **Database**: MongoDB
- **Deployment**: GitHub Pages (frontend) + ECR (backend ready)

## 🚀 Deployment

### GitHub Pages (Current)

- Frontend automatically deploys to GitHub Pages on push to main
- Visit your site at: `https://[username].github.io/[repository-name]`

### ECR Ready (Future)

- Backend Docker images are built and pushed to AWS ECR
- Ready for deployment to any container service (ECS, Lambda, etc.)

## 🛠️ Development

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
go mod tidy
go run main.go
```

## 📝 Configuration

Set these environment variables in GitHub Secrets:

- `MONGODB_URI` - Your MongoDB connection string
- `AWS_ACCESS_KEY` - AWS access key for ECR
- `AWS_SECRET_ACCESS_KEY` - AWS secret key for ECR

## 🎯 Skip Options

Control what gets built/deployed by editing the workflow environment variables:

- `FORCE_SKIP_FRONTEND: "true"` - Skip frontend build/deploy
- `FORCE_SKIP_BACKEND: "true"` - Skip backend ECR push
- `FORCE_SKIP_DEPLOY: "true"` - Skip GitHub Pages deployment
