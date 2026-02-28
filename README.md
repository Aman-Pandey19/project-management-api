# Project Management Backend API

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- REST API Architecture

---

## 📌 Features Implemented

### 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected routes

### 📁 Project Management
- Create Project
- Update Project
- Delete Project (Owner only)
- Invite Members
- Member-based access control

### 📋 Boards
- Create Board
- Get Boards
- Update Board
- Delete Board

### 📝 Tasks
- Create Task
- Update Task
- Delete Task
- Change Status (Todo / In Progress / Done)
- Priority (Low / Medium / High)
- Due Date
- Assign User
- Activity Log tracking
- Filtering
- Pagination

### 💬 Comments
- Add Comment
- Get Comments
- Delete Comment (Only creator)

---

## 🗄️ Database Schema (MongoDB Collections)

- Users
- Projects
- Boards
- Tasks
- Comments

---

## ⚙️ How To Run The Project

### 1️⃣ Clone the repository

```bash
git clone <your-github-repo-link>
cd project-management-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file in root

Add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Run the server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 📬 API Testing

Use Postman collection included in submission  
OR test endpoints manually.

Example:

```
POST /api/auth/register
POST /api/auth/login
POST /api/projects
POST /api/projects/:projectId/boards
POST /api/boards/:boardId/tasks
POST /api/tasks/:taskId/comments
```

---

## 🏗️ Architecture

- Modular MVC structure
- JWT secured APIs
- Nested resource routing
- Activity logging for task updates
- Role-based access control
- Filtering & Pagination supported

---

## 👨‍💻 Author
Aman Pandey
