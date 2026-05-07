Team Task Manager 🚀

A full-stack Team Task Management application built with Spring Boot, React, MySQL, and JWT Authentication.
The platform allows teams to create projects, manage tasks, assign members, and track task progress with secure Role-Based Access Control (RBAC).

🌐 Live Demo
Frontend
https://spectacular-reprieve-production-1c24.up.railway.app/
Backend API
taskmanager-production-76f3.up.railway.app

📌 Features
🔐 Authentication & Security
User Signup/Login
JWT-based Authentication
Password Encryption using BCrypt
Secure Protected APIs
Role-Based Access Control (ADMIN / MEMBER)
👥 Team Management
Create projects
Add members to projects
View project members
Restrict task assignment only to project members
✅ Task Management
Create tasks
Assign tasks to team members
Update task status
Track:
Pending Tasks
In Progress Tasks
Completed Tasks
Overdue Tasks
📊 Dashboard
MEMBER Dashboard
Total assigned tasks
Completed tasks
Pending tasks
Overdue tasks
ADMIN Dashboard
Total projects
Total users
Total tasks
Completed tasks
🛠️ Tech Stack
Frontend
React.js
React Router DOM
Axios
Backend
Spring Boot
Spring Security
JWT Authentication
Spring Data JPA
Hibernate
Database
MySQL
Deployment
Railway
🏗️ Architecture
React Frontend
       ↓
REST APIs
       ↓
Spring Boot Backend
       ↓
MySQL Database
🔑 Roles
Role	Permissions
ADMIN	Create projects, assign tasks, manage members
MEMBER	View assigned tasks, update task status
📂 Project Structure
Backend Structure
src/main/java/com/taskmanager
│
├── controller
├── service
├── repository
├── entity
├── dto
├── security
└── config
Frontend Structure
src/
│
├── pages/
├── components/
├── services/
├── utils/
└── config.js
🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/signup	Register user
POST	/auth/login	Login user
Projects
Method	Endpoint
GET	/projects
POST	/projects
Team Management
Method	Endpoint
POST	/projects/{projectId}/members/{userId}
GET	/projects/{projectId}/members
Tasks
Method	Endpoint
GET	/tasks/project/{projectId}
POST	/tasks
PUT	/tasks/{taskId}?status=COMPLETED
Dashboard
Method	Endpoint
GET	/dashboard
⚙️ Environment Variables
Backend
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
SPRING_JPA_HIBERNATE_DDL_AUTO=update
JWT_SECRET=
PORT=8080
🚀 Local Setup
1️⃣ Clone Repository
git clone YOUR_GITHUB_REPO
2️⃣ Backend Setup
cd backend
mvn spring-boot:run

Backend runs on:

http://localhost:8080
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔒 Security Features
JWT Token Authentication
Password Encryption
Protected Routes
Role-Based API Authorization
Secure Spring Security Configuration

👨‍💻 Author

Ruthik Rakonde

⭐ Acknowledgements

Built using:

Spring Boot
React
MySQL
Railway
JWT Authentication
