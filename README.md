Team Task Manager - Backend API
A robust, full-stack collaborative productivity application backend built with Spring Boot 3, Spring Security, and MySQL. This API provides a secure, role-based platform for teams to manage projects, assign tasks, and track productivity through real-time dashboards.

NOTE: I have developed complete backend and frontend.I have deployed backend to railway. Still i need to deploy frontend. 

---
Backend railway UrL: taskmanager-production-76f3.up.railway.app
## 🛠️ Tech Stack
* java 21
* Spring Boot 3 (Web, Data JPA, Security)
* MySQL (Relational Database)
* JJWT (JSON Web Token authentication)
* Lombok (Boilerplate reduction)
* Railway (Cloud Deployment)

* ### Frontend
- React
- Vite
- React Router DOM
- Axios
---
## ✨ Key Features
* 🔒 Stateless JWT Authentication:** Secure login and registration using modern JSON Web Tokens and BCrypt password hashing.
* 🛡️ Role-Based Access Control (RBAC):** Strict separation of privileges between `ADMIN` and `MEMBER` roles.
* 📂 Project Management:** Admins can create projects and manage team members via Many-To-Many relationships.
* 📝 Task Tracking:** Assign tasks with deadlines and track their status (`PENDING`, `IN_PROGRESS`, `COMPLETED`).
* 📊 Role-Based Dashboards:** Custom JPQL queries to generate global platform statistics for Admins, and localized personal statistics for Members.
* 🚀 Cloud Ready:** Fully containerized and deployed to production via Railway.
---
## 📡 API Endpoints
### Authentication
* `POST /auth/signup` - Register a new user (defaults to `MEMBER` role)
* `POST /auth/login` - Authenticate and receive a JWT token
### Projects & Team Management
* `POST /projects` - Create a new project *(ADMIN only)*
* `GET /projects` - Retrieve all projects
* `POST /projects/{projectId}/members/{userId}` - Add a user to a project *(ADMIN only)*
* `GET /projects/{projectId}/members` - View all members assigned to a project
### Tasks
* `POST /tasks` - Create and assign a task to a project member *(ADMIN only)*
* `GET /tasks/project/{projectId}` - View all tasks within a specific project
* `PUT /tasks/{taskId}?status=COMPLETED` - Update the status of your assigned task
### Dashboard
* `GET /dashboard` - Retrieve task statistics (Global for Admin, Personal for Members)
---
## 💻 Local Setup & Installation
1. Clone the repository
```bash
git clone https://github.com/ruthik4/taskmanager.git
cd taskmanager
2. Configure your local database Open src/main/resources/application.properties and update your MySQL credentials:

properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
3. Run the application

bash
./mvnw clean spring-boot:run
The server will start on http://localhost:8080.

4. Make an Admin User Since new signups default to MEMBER, use your MySQL client to manually promote your first user:

sql
UPDATE user SET role = 'ADMIN' WHERE email = 'your@email.com';
🌍 Production Deployment
This application is deployed and hosted on Railway.

Base URL (local): http://localhost:8080

2) Configure backend database
Update src/main/resources/application.properties:
3) Run backend (Spring Boot)
Backend runs at: http://localhost:8080
4) Run frontend (React + Vite)
Frontend runs at: http://localhost:5173
🔗 Frontend-Backend Connection
Frontend API base URL is configured in:
frontend/src/config.js
API_URL = "http://localhost:8080"
Authenticated requests include JWT automatically via Axios interceptor in:
frontend/src/services/api.js
👤 Create First Admin User
All signups default to MEMBER. Promote one user to admin manually:
UPDATE user SET role = 'ADMIN' WHERE email = 'your@email.com';
✅ Default Local URLs
Frontend: http://localhost:5173
Backend: http://localhost:8080
