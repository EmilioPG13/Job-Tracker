
# Job Application Tracker

## Product Overview
The Job Application Tracker is a web-based tool designed to help users organize and manage their job applications efficiently. The MVP focuses on providing essential features to track applications from initial interest to final decision.

## MVP Features
### 1. User Authentication
- **User Registration:** Sign up with email and password.
- **User Login:** Sign in to access private data.
- **Protected Routes:** Dashboard and application data are only accessible to logged-in users.

### 2. Application Management
- **Create Application:** Add new applications with fields for company name, job title, status (Applied, Interviewing, Offer, Rejected), date applied, and notes.
- **Read Applications:** View all applications in a dashboard as a list or cards.
- **Update Application:** Edit existing applications, especially status changes.
- **Delete Application:** Remove applications permanently.
- **Create Notes:** Add concise notes to each application.

## Post-MVP / Future Features
- **Kanban Board View:** Visual dashboard with drag-and-drop status columns.
- **Advanced Filtering & Searching:** Filter by status or search by company name.
- **Detailed Application View:** Add detailed notes, contacts, or job descriptions.
- **Document Uploads:** Attach resumes or cover letters to applications.
- **Follow-up Reminders:** Set reminders to follow up on applications.
- **Data Visualization:** Charts showing breakdowns by status.

## Technology Stack
| Category   | Technology     | Purpose in Project                                      |
|------------|----------------|---------------------------------------------------------|
| Frontend   | React.js       | Build interactive UI and dashboard                      |
| Backend    | Node.js        | Server-side JavaScript runtime                          |
|            | Express.js     | Web server and API framework                            |
| Database   | PostgreSQL     | Store user and application data                         |
| Deployment | Render         | Host the live web application                           |
| Tools      | Git / GitHub   | Version control and code hosting                        |

## Packages Used


### Frontend
- **react, react-dom**: Core React library for building UI and rendering components.
- **react-redux**: State management using Redux in React.
- **react-router-dom**: Routing and navigation for React applications.
- **tailwindcss, @tailwindcss/vite**: Utility-first CSS framework for styling and Vite integration. Tailwind is customized via `tailwind.config.js` to match the application's color palette, fonts, and border radii.
- **@vitejs/plugin-react, vite**: Vite build tool and React plugin for fast development and HMR.
- **eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh**: Linting and code quality tools for React projects.
- **@testing-library/react, @testing-library/jest-dom, @testing-library/user-event**: Testing utilities for React components and user interactions.
- **vitest**: Unit and integration testing framework for Vite projects.
- **msw, axios-mock-adapter**: Mocking API requests for testing.

### Backend
- **express**: Web server and API framework for Node.js.
- **pg**: PostgreSQL client for Node.js.
- **bcryptjs**: Password hashing for secure authentication.
- **jsonwebtoken**: Handling JWT-based authentication.
- **cors**: Enable Cross-Origin Resource Sharing.
- **dotenv**: Load environment variables from `.env` files.
- **helmet**: Security middleware for HTTP headers.
- **express-rate-limit**: Rate limiting middleware to prevent abuse.
- **express-validator**: Validation and sanitization of request data.
- **xss, express-mongo-sanitize**: Protection against XSS and NoSQL injection attacks.
- **nodemon**: Development tool for automatically restarting the server on changes.
- **jest, @jest/globals, supertest**: Testing framework and utilities for backend code and API endpoints.
- **cross-env**: Set environment variables across platforms for scripts.


## Wireframes


Below are wireframes showcasing the main design blueprints for the Job Application Tracker application:

### Landing Page
![Landing Page](./assets/Landing%20Page.png)

### Login Page
![Login Page](./assets/Login.png)

### Sign Up Page
![Sign Up Page](./assets/Sign%20in.png)

### Dashboard (My Applications)
![Dashboard](./assets/Main%20Page%20(Column).png)

### Add New Application Modal
![Add New Application](./assets/Add,%20Edit%20modal.png)

### Application Cards with Notes and Status
![Application Cards](./assets/Main%20Page%20(Grid).png)

---
These wireframes illustrate the user flow and core UI components, including authentication, application management, and dashboard features. They serve as a visual reference for the application's look and feel.
Job Seekers

## Anything Unique
Currently, there are no unique features beyond the core MVP.

---
## Getting Started

### Prerequisites
- Node.js & npm
- PostgreSQL

### Installation
1. Clone the repository:
	```bash
	git clone https://github.com/EmilioPG13/Codecademy.git
	```
2. Install dependencies for both frontend and backend:
	```bash
	npm install
	cd server && npm install
	```
3. Set up your PostgreSQL database and configure connection in `server/config/database.js`.
4. Run database migrations and seeds as needed.

### Running the Application
1. Start the backend server:
	```bash
	cd server
	npm start
	```
2. Start the frontend:
	```bash
	npm run dev
	```
3. Open your browser at `http://localhost:5173` (or the port shown in the terminal).

---
## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
