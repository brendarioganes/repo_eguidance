# Counseling App - Complete Setup Guide

This guide will help you set up the complete role-based authentication system with Vue 3 frontend and LavaLust PHP backend.

## Prerequisites

- **XAMPP** (Apache + MySQL)
- **Node.js** (v18 or higher)
- **npm** or **yarn**

## Step 1: Database Setup

1. **Start XAMPP**
   - Start Apache and MySQL services
   - Open phpMyAdmin (http://localhost/phpmyadmin)

2. **Create Database**
   - Import the SQL schema from `backend/database_schema.sql`
   - Or run the SQL commands manually:
   ```sql
   CREATE DATABASE IF NOT EXISTS counseling_app CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   
   USE counseling_app;
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role ENUM('student', 'counselor') NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   
   -- Sample users (password = "password123")
   INSERT INTO users (name, email, password, role) VALUES
   ('Alice Student', 'student@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'student'),
   ('Bob Counselor', 'counselor@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'counselor');
   ```

## Step 2: Backend Setup

1. **Configure Database**
   - The database configuration is already set in `backend/app/config/database.php`
   - Default settings: host=localhost, user=root, password='', database=counseling_app

2. **Start Backend Server**
   ```bash
   cd backend
   php -S localhost:8000
   ```
   - Backend will be available at: http://localhost:8000
   - API endpoints will be at: http://localhost:8000/api/

## Step 3: Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install axios
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   - Frontend will be available at: http://localhost:5173

## Step 4: Test the Application

### Test Users
- **Student**: email: `student@example.com`, password: `password123`
- **Counselor**: email: `counselor@example.com`, password: `password123`

### API Endpoints

#### Public Endpoints
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

#### Protected Endpoints (require authentication)
- `POST /api/logout` - Logout user
- `GET /api/student/dashboard` - Student dashboard data
- `GET /api/student/profile` - Student profile
- `GET /api/counselor/dashboard` - Counselor dashboard data
- `GET /api/counselor/profile` - Counselor profile

### Frontend Routes
- `/` - Redirects to login
- `/login` - Login page
- `/register` - Registration page
- `/student-dashboard` - Student dashboard (requires student role)
- `/counselor-dashboard` - Counselor dashboard (requires counselor role)

## Step 5: Testing with Postman

### Register a New User
```http
POST http://localhost:8000/api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Login
```http
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123"
}
```

### Access Protected Route
```http
GET http://localhost:8000/api/student/dashboard
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure CORS headers are set in `backend/index.php`
   - Check that frontend URL matches the CORS origin

2. **Database Connection Issues**
   - Verify XAMPP MySQL is running
   - Check database credentials in `backend/app/config/database.php`
   - Ensure database `counseling_app` exists

3. **Session Issues**
   - Make sure sessions are enabled in PHP
   - Check that cookies are being sent with requests

4. **Frontend Build Issues**
   - Run `npm install` in the frontend directory
   - Check that all dependencies are installed

## File Structure

```
project-root/
├── backend/
│   ├── app/
│   │   ├── config/
│   │   │   ├── database.php
│   │   │   └── routes.php
│   │   ├── controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── StudentController.php
│   │   │   └── CounselorController.php
│   │   ├── models/
│   │   │   └── User.php
│   │   ├── middleware/
│   │   │   ├── AuthMiddleware.php
│   │   │   └── RoleMiddleware.php
│   │   └── core/
│   │       └── ORM.php
│   ├── database_schema.sql
│   └── index.php
└── frontend/
    ├── src/
    │   ├── views/
    │   │   ├── Login.vue
    │   │   ├── Register.vue
    │   │   ├── StudentDashboard.vue
    │   │   └── CounselorDashboard.vue
    │   ├── stores/
    │   │   └── auth.ts
    │   ├── router/
    │   │   └── index.ts
    │   └── App.vue
    └── package.json
```

## Security Features

- **Password Hashing**: Uses PHP's `password_hash()` with BCRYPT
- **Session Management**: Secure session handling
- **Role-based Access**: Different dashboards for students and counselors
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Server-side validation for all inputs

## Next Steps

1. **Add More Features**:
   - Appointment scheduling
   - File uploads
   - Email notifications
   - Advanced reporting

2. **Enhance Security**:
   - JWT tokens instead of sessions
   - Rate limiting
   - Input sanitization
   - CSRF protection

3. **Improve UI/UX**:
   - Better responsive design
   - Dark mode
   - Advanced components
   - Real-time updates

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the PHP error logs
3. Verify database connectivity
4. Ensure all dependencies are installed
5. Check that both servers are running on the correct ports
