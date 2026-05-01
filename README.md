# 🔗 URL Shortener (MERN Stack)

A full-stack URL Shortener application built using the MERN stack.
It allows users to create short links, track analytics, and manage their URLs through a secure dashboard.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* ✂️ URL Shortening
* 📊 Click Analytics (timestamp + total clicks)
* 📁 User Dashboard (view all created URLs)
* 🔗 Redirect to original URL
* 📋 Copy short link functionality
* 🛡️ Protected routes (only logged-in users can access their data)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

---

## 📁 Project Structure

```
project-url-shortener/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── modeljs/
│   ├── middlewear/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd project-url-shortener
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Install required packages:

```
npm install express mongoose cors bcryptjs jsonwebtoken shortid
```

Run backend:

```
node index.js
```

Server runs at:

```
http://localhost:8001
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔑 API Endpoints

### Auth

* `POST /user/signup` → Register user
* `POST /user/login` → Login & get JWT

### URL

* `POST /url` → Create short URL (Protected)
* `GET /url` → Get all user URLs (Protected)
* `GET /url/:shortId` → Redirect
* `GET /url/analytics/:shortId` → Get analytics (Protected)

---

## 📊 How It Works

1. User signs up / logs in
2. JWT token is stored in frontend
3. User creates a short URL
4. Backend stores URL with user ID
5. Redirect endpoint logs visit timestamps
6. Dashboard displays all URLs + analytics

---

## 🔐 Authentication Flow

* Passwords are hashed using bcrypt
* JWT token is generated on login
* Token is sent in request headers:

```
Authorization: Bearer <token>
```

---

## 📸 Features Preview

* Login & Signup UI
* Dashboard with URL table
* Analytics (click count + timestamps)

---

## ⚠️ Notes

* Make sure MongoDB is running locally
* Update JWT secret in production
* Use environment variables for security

---

## 💡 Future Improvements

* 📈 Graph-based analytics
* ✏️ Custom short URLs
* 🗑️ Delete URLs
* 📱 Responsive UI improvements
* ☁️ Deployment (Render / Vercel)

