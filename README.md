# 💸 SplitwisePro – Bill Split & Expense Tracker

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
