
# Job Tracker

A modern, full-stack job application tracking system built with React 19 and Node.js. Track your job applications, manage interviews, and stay organized throughout your job search journey.

## 🚀 Live Demo

- **Frontend**: [Job Tracker Frontend](https://job-tracker-frontend-j2sw.onrender.com)
- **Backend API**: [Job Tracker API](https://job-tracker-server-7ies.onrender.com)

## ✨ Features

### Core Features
- **Application Management**: Add, edit, and track job applications with company details, status, and notes
- **Grid & List Views**: Switch between different viewing modes for better organization
- **Search & Filter**: Quickly find applications by company name or status
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean interface built with Tailwind CSS 4

### Application Tracking
- **Status Management**: Track applications through Applied, Interviewing, Offer, and Rejected stages
- **Company Details**: Store company name, job title, application date, and custom notes
- **CRUD Operations**: Full create, read, update, and delete functionality
- **Protected Routes**: Secure access to your personal data

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite 7** - Lightning-fast build tool and dev server
- **Redux Toolkit** - State management with modern Redux patterns
- **React Router** - Client-side routing and navigation
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vitest** - Unit and integration testing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware

### Deployment
- **Render** - Cloud hosting platform
- **GitHub Actions** - CI/CD pipeline

## 📦 Key Dependencies

### Frontend Dependencies
- **React 19** & **React DOM** - Latest React with improved concurrent features
- **Redux Toolkit** - Modern Redux state management with RTK Query
- **React Router DOM** - Declarative routing for React applications
- **Tailwind CSS 4** - Next-generation utility-first CSS framework
- **Vite 7** - Fast build tool with Hot Module Replacement (HMR)

### Backend Dependencies
- **Express.js** - Fast, unopinionated web framework for Node.js
- **PostgreSQL (pg)** - PostgreSQL client for Node.js
- **bcryptjs** - Password hashing library for secure authentication
- **jsonwebtoken** - JWT implementation for secure token-based auth
- **Helmet** - Security middleware for Express applications
- **CORS** - Cross-Origin Resource Sharing middleware

### Development & Testing
- **Vitest** - Fast unit test framework for Vite projects
- **ESLint** - Code linting and style enforcement
- **Testing Library** - Simple and complete testing utilities
- **Jest** - Backend testing framework with mocking capabilities


## 🎨 Screenshots

Below are screenshots showcasing the main features of the Job Tracker application:

### Landing Page
![Landing Page](./assets/3.%20Landing%20Page.png)

### Login Page
![Login Page](./assets/1.%20Login.png)

### Sign Up Page
![Sign Up Page](./assets/2.%20Sign%20in.png)

### Dashboard (Column View)
![Dashboard Column](./assets/4.%20Main%20Page%20(Column).png)

### Dashboard (Grid View)
![Dashboard Grid](./assets/5.%20Main%20Page%20(Grid).png)

### Add/Edit Application Modal
![Add Application Modal](./assets/6.%20Add,%20Edit%20modal.png)

---

## 🚀 Future Enhancements

- **Kanban Board View**: Drag-and-drop interface for status management
- **Advanced Analytics**: Charts and insights on application success rates
- **Document Management**: Upload and attach resumes, cover letters
- **Interview Scheduling**: Calendar integration for interview tracking
- **Follow-up Reminders**: Automated reminders for follow-ups
- **Company Research**: Integration with company data APIs
- **Mobile App**: React Native mobile application

## 🏃‍♂️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **PostgreSQL** (v12 or higher)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/EmilioPG13/Job-Tracker.git
   cd Job-Tracker
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb job_tracker
   
   # Configure database connection in server/.env
   DATABASE_URL=postgresql://username:password@localhost:5432/job_tracker
   JWT_SECRET=your-secret-key
   FRONTEND_URL=http://localhost:5173
   ```

4. **Run the application**
   ```bash
   # Terminal 1: Start backend server
   cd server
   npm start
   
   # Terminal 2: Start frontend development server
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Testing

```bash
# Frontend tests
npm test

# Backend tests
cd server
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

This application is deployed on [Render](https://render.com) with:
- **Frontend**: Static Site deployment
- **Backend**: Web Service deployment
- **Database**: PostgreSQL managed database

### Environment Variables
```env
# Backend (.env)
DATABASE_URL=your-postgresql-connection-string
JWT_SECRET=your-jwt-secret
FRONTEND_URL=https://your-frontend-url.com

# Frontend (Render environment)
VITE_API_URL=https://your-backend-url.com
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Emilio Peña Govea**
- GitHub: [@EmilioPG13](https://github.com/EmilioPG13)
- LinkedIn: [Your LinkedIn Profile]

---

**⭐ Star this repository if you found it helpful!**
