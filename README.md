# 💬 Chatly — Real-Time Chat Application

<div align="center">


**A lightning-fast and secure real-time chat application built using the MERN stack and Socket.io.**
<br />
Stay connected, share files, and chat with friends — all in real time ⚡

</div>

---

## 🧠 Overview

**Chatly** is a modern real-time chat platform designed for instant and seamless communication.  
Built with **MongoDB**, **Express**, **React**, **Node.js**, and **Socket.io**, it ensures instant message delivery, secure authentication, and a clean user experience with emoji support, file sharing, and online presence indicators.

---

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0+-47A248?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black?logo=socket.io)
![License](https://img.shields.io/badge/License-ISC-blue)

</div>

---

## ✨ Key Features

- ⚡ **Real-Time Messaging** — Powered by Socket.io for instant delivery  
- 🔐 **Secure Authentication** — JWT-based login and registration  
- 🖼 **File & Image Sharing** — Upload images via Cloudinary  
- 💬 **Emoji Support** — Expressive chatting experience  
- 🟢 **Online Status Indicators** — See who’s online/offline  
- 📱 **Responsive UI** — Optimized for desktop and mobile  
- 🧭 **Chat History** — Retrieve and view past messages  
- 🎨 **Modern UI/UX** — Built with React + TailwindCSS  
- 🧩 **Smooth Animations** — Framer Motion for a polished feel  

---

## 🧱 Tech Stack

### Frontend
- ⚛️ React 19
- 🧭 Redux Toolkit
- ⚡ Vite
- 🎨 TailwindCSS
- 🎞 Framer Motion
- 🕸 Socket.io Client

### Backend
- 🌐 Node.js
- 🚀 Express.js
- 🍃 MongoDB + Mongoose
- 🗝 JWT & Bcrypt for authentication
- ☁️ Cloudinary for image storage
- 🔄 Socket.io for real-time communication

---

## 🧩 Prerequisites

Before running Chatly, ensure you have:

- Node.js ≥ 18  
- npm ≥ 9 or yarn  
- MongoDB ≥ 6.0  
- Cloudinary account (for image uploads)

---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/chatly.git
cd chatly
````

### 2️⃣ Environment Setup

Create a `.env` file inside the `Server` directory:

```env
# Server
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3️⃣ Install Dependencies

#### Backend

```bash
cd Server
npm install
```

#### Frontend

```bash
cd ../Client
npm install
```

---

## 🧠 Running the App

### ▶️ Development Mode

1. Start the backend server

   ```bash
   cd Server
   npm run dev
   ```
2. Start the frontend

   ```bash
   cd ../Client
   npm run dev
   ```
3. Visit 👉 [http://localhost:5173](http://localhost:5173)

### 🏗 Production Build

```bash
cd Client
npm run build
```

The server will automatically serve files from `Client/dist` in production mode.

---

## 🧾 API Endpoints

### 🔑 Authentication

* `POST /api/auth/register` — Register a new user
* `POST /api/auth/login` — Log in
* `POST /api/auth/logout` — Log out
* `GET /api/auth/me` — Get current user

### 👤 Users

* `GET /api/user` — Fetch all users
* `GET /api/user/:id` — Get user by ID
* `PUT /api/user/update` — Update profile
* `PUT /api/user/update-password` — Change password

### 💬 Messages

* `POST /api/msg` — Send message
* `GET /api/msg/:userId` — Get messages
* `DELETE /api/msg/:id` — Delete message

---

## 🧩 Future Improvements

* 📞 Add **voice & video calling** feature using WebRTC
* 🪄 Implement **group chats** and media previews
* 🔔 Real-time **notifications** and **message reactions**
* 🌙 Add **dark/light mode** toggle
* 📱 Launch **mobile app version** (React Native)

---

## 🤝 Contributing

Contributions are always welcome!
Follow these steps:

1. Fork the repository
2. Create a new branch — `git checkout -b feature/AmazingFeature`
3. Commit your changes — `git commit -m "Add AmazingFeature"`
4. Push the branch — `git push origin feature/AmazingFeature`
5. Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

👤 **Pranav Thorat**

| Platform              | Link                                                          |
| --------------------- | ------------------------------------------------------------- |
| 🌐 **Live Demo**      | [View Now](https://chatly-chat-friendly-realtime-chat.vercel.app/)                        |
| 🧑‍💻 **GitHub Repo** | [View Code](https://github.com/PranavThorat1432/Chatly_-_Chat-Friendly-Realtime-Chat-Application) |
| 💼 **LinkedIn**       | [Connect with Me](https://www.linkedin.com/in/curiouspranavthorat/)       |
| 📩 **Email**          | [pranavthorat95@gmail.com](mailto:pranavthorat95@gmail.com)   |




## 🌟 Support

If you liked this project, please give it a ⭐️ on GitHub — it helps others find it!

---

<div align="center">

Made with ❤️ by **Pranav Thorat**

</div>

