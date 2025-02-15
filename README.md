# Digital Permit Management System (DPMS)

A comprehensive web application for managing staff permits. This system enables efficient management of airport zone access permits through a secure and scalable platform.

## 🚀 Features

- **Multi-Role Authentication System**

  - HR Personnel (Admin)
  - Staff Members
  - Security Officers

- **Permit Management**

  - Digital permit application submission
  - QR code-based verification
  - Comprehensive admin dashboard
  - Report generation (CSV/PDF)

- **Security**
  - Role-Based Access Control (RBAC)
  - JWT Authentication
  - Secure password hashing (bcrypt)
  - Protected API endpoints

## 🛠 Tech Stack

### Frontend

- Next.js 15 (App Router)
- TailwindCSS
- Zustand (State Management)
- TypeScript

### Backend

- Laravel 11
- MySQL
- REST API
- JWT Authentication

### DevOps

- Docker
- Docker Compose
- GitHub Actions (CI/CD)

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js (v18 or higher)
- PHP 8.2+
- Composer
- Git

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/alinauf/dpms.git
   cd dpms
   ```

2. **Environment Setup**

   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start the application**

   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🏗 Project Structure

```
dpms/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages and layouts
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and configurations
│   ├── store/              # Zustand store configurations
│   └── types/              # TypeScript type definitions
│
├── backend/                 # Laravel application
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/  # API controllers
│   │   │   └── Middleware/   # Custom middleware
│   │   ├── Models/           # Eloquent models
│   │   └── Services/         # Business logic services
│   ├── database/
│   │   ├── migrations/       # Database migrations
│   │   └── seeders/         # Database seeders
│   └── routes/              # API routes
│
├── docker/                  # Docker configuration files
│   ├── backend/              # Backend configuration
│   └── frontend/             # Frontend configuration
│
└── docker-compose.yml      # Docker compose configuration
```
