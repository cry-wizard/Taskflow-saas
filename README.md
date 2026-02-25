# 🚀 TaskFlow SaaS — Full-Stack Task Management Platform

A modern **Role-Based Task Management SaaS** built with a full-stack architecture.
It allows **Admins** to create and manage tasks while **Employees** can track progress and update task status through a clean and responsive interface.

---

# 🌐 Live Deployment

### 🖥 Frontend (Netlify)

👉 https://tasksaas.netlify.app/

### ⚙️ Backend API (Render)

👉 https://taskflow-saas-backend.onrender.com

---

# ✨ Overview

TaskFlow SaaS is designed to simulate a real production workflow system where:

* Admins assign tasks to employees
* Employees update task progress
* Secure authentication controls access
* Dashboard views change dynamically based on user roles

The project demonstrates **full-stack architecture**, **JWT authentication**, and **role-based UI rendering**.

---

# 🎯 Key Features

## 🔐 Authentication & Authorization

* JWT based login & register
* Role system:

  * `admin`
  * `employee`
* Protected routes
* Token auto-attach using Axios interceptor

## 👑 Admin Capabilities

* Create new tasks
* Assign tasks to employees
* Edit / Delete tasks
* View all team members
* Admin dashboard analytics

## 👨‍💻 Employee Capabilities

* View assigned tasks
* Update task status:

  * Pending
  * In Progress
  * Completed
* Clean employee dashboard UI

## 🎨 Frontend UX

* Smooth modal animations
* Status confirmation popup
* Role-based rendering
* Responsive Tailwind UI

---

# 🧱 Tech Stack

## Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* React Router
* Axios

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* TypeScript
* JWT Authentication
* Role Middleware

---

# 📂 Project Structure

```
Taskflow-SAAS/
 ├── frontend/        # React + Vite client
 └── backend/         # Express API server
```

---

# 🔗 API Architecture

### Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Tasks

```
GET    /api/v1/tasks
POST   /api/v1/tasks           (admin only)
PATCH  /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
PATCH  /api/v1/tasks/:id/status
```

### Users

```
GET /api/v1/employees          (admin only)
```

### Dashboards

```
GET /api/v1/dashboard/admin
GET /api/v1/dashboard/employee
```

---

# ⚙️ Local Development Setup

## 1️⃣ Clone Repository

```
git clone https://github.com/cry-wizard/Taskflow-saas
cd Taskflow-SAAS
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env`

```
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

Run:

```
npm run dev
```

Backend runs at:

```
http://localhost:3000/api/v1
```

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
```

Create `.env`

```
VITE_API_URL=http://localhost:3000/api/v1
```

Run:

```
npm run dev
```

---

# 🚀 Deployment Details

## Frontend — Netlify

* Build Command: `npm run build`
* Publish Directory: `dist`
* Environment Variable:

```
VITE_API_URL=https://taskflow-saas-backend.onrender.com/api/v1
```

## Backend — Render

* Node environment
* Connected MongoDB Atlas
* Auto deploy from main branch

---

# 🖼 Screenshots


<img width="1873" height="967" alt="Screenshot from 2026-02-25 06-32-51" src="https://github.com/user-attachments/assets/73b37e20-b45a-4962-b8b2-db4856245ea3" />
<img width="1873" height="967" alt="Screenshot from 2026-02-25 06-32-34" src="https://github.com/user-attachments/assets/8ff5ddad-6bef-48c9-97e3-0c7cced3c13a" />
<img width="1873" height="967" alt="Screenshot from 2026-02-25 06-32-17" src="https://github.com/user-attachments/assets/d8d2e656-cc8d-4fbd-b710-837c7f1b1cb0" />


---

# 🎬 UI Animations

* Modal transitions powered by **Framer Motion**
* Smooth task status confirmation popup
* Interactive hover states
* Role-based dynamic layout rendering

---

# 🔒 Role Based Logic

| Role     | Permissions                  |
| -------- | ---------------------------- |
| Admin    | Create, Edit, Delete, Assign |
| Employee | View & Update Status Only    |

UI automatically switches layout based on JWT role.

---

# 🧪 Production Ready Concepts Demonstrated

* Clean API structure (v1 routing)
* Middleware driven architecture
* JWT decoding on frontend
* Axios interceptor auth flow
* Role protected backend routes

---

# 📌 Future Improvements

* Real-time updates with WebSockets
* Pagination & filters
* Notifications system
* Dark mode persistence
* Advanced analytics dashboard

---

# 👨‍💻 Author

Built as a full-stack SaaS project showcasing modern web development practices and scalable architecture.

---

⭐ If you like this project, consider starring the repository!
