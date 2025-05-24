
---

## 🚀 Features

- 🔐 **Authentication** (Register, Login, Logout)
- 👤 **User Management** (View, Update, Delete profile)
- 🛵 **Bike Management** (Add, Update, Delete, List, Get by ID)
- 🌟 **Featured and Available Bikes** endpoints
- 📅 **Booking System** (Check availability, Book bikes)
- ⭐ **Review System** (CRUD operations on reviews)
- 🔒 JWT Authentication middleware

---

## 🧪 API Endpoints

### 🔑 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`

### 👤 User
- `GET /api/user` *(Auth required)*
- `PUT /api/user` *(Auth required)*
- `DELETE /api/user` *(Auth required)*

### 🛵 Bike
- `POST /api/bike` *(Add bike)*
- `GET /api/bike` *(Get all bikes)*
- `GET /api/bike/featured` *(Get featured bikes)*
- `GET /api/bike/available` *(Get available bikes)*
- `GET /api/bike/:id` *(Get bike by ID)*
- `PUT /api/bike/:id` *(Update bike)*
- `DELETE /api/bike/:id` *(Delete bike)*

### 📅 Booking
- `POST /api/booking/checkAvailability` *(Auth required)*
- `POST /api/booking/bookBike` *(Auth required)*

### ⭐ Review
- `POST /api/review` *(Auth required)*
- `GET /api/review` *(Auth required)*
- `GET /api/review/:id` *(Auth required)*
- `PUT /api/review/:id` *(Auth required)*
- `DELETE /api/review/:id` *(Auth required)*

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** 
- **JWT** for authentication
- **CORS** for cross-origin requests

---
