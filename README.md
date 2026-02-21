




# 💸 SplitwisePro – Bill Split & Expense Tracker

![Vite](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Convex](https://img.shields.io/badge/Convex-Backend-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)





<p align="center">
  <img src="https://img.shields.io/badge/React-Vite-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-Convex-orange" />
  <img src="https://img.shields.io/badge/Database-Convex%20Cloud-yellow" />
  <img src="https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC?logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel" />
</p>

<p align="center">
  🚀 <a href="https://splitwisepro.vercel.app">Live Demo</a>
</p>

A modern bill-splitting and expense tracking web application built with **React (Vite)** and powered by **Convex** for backend, database, and authentication.

---

## 🌐 Live Demo

🚀 **Visit here:**  
👉 https://splitwisepro.vercel.app

---

## ✨ Features

- 🧾 Split bills among multiple people
- 📊 Automatic calculation of balances
- ☁️ Cloud backend powered by Convex
- 🔐 Built-in authentication (Convex Auth)
- ⚡ Fast and optimized frontend using Vite

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Convex |
| Database | Convex Cloud |
| Authentication | Convex Auth |
| Deployment | Vercel |

---

## 📁 Project Structure

```
SplitwisePro/
├── convex/              # Backend functions & database schema
├── app/ or src/         # React frontend
├── public/
├── .env.local
├── package.json
├── vite.config.ts
└── ...
```

---

## 🔐 Authentication

This project uses **Convex Auth** with Anonymous authentication for development.

For production use:
- Enable email/password login
- Add OAuth providers (Google/GitHub)
- Secure deployment keys

---

## 🛠 Local Development

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment Variables

Create `.env.local`:

```env
CONVEX_DEPLOY_KEY=your_deploy_key
CONVEX_DEPLOYMENT=dev:tacit-wildebeest-666
VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
```

### 3️⃣ Start Development

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🚀 Deployment

This project is deployed using **Vercel**.

Build settings:

- Build Command: `npm run build`
- Output Directory: `dist`

Environment Variable required:

```
VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
```

---

## 📄 License

MIT License
