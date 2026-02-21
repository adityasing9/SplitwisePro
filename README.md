<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=0:4F46E5,50:06B6D4,100:9333EA&text=SplitwisePro%20💸&fontSize=45&fontColor=ffffff&animation=fadeIn&fontAlignY=35" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&pause=1000&color=9333EA&center=true&vCenter=true&width=700&lines=Bill+Split+%26+Expense+Tracker;React+%2B+Vite+Frontend;Convex+Cloud+Backend;Live+on+Vercel" />
</p>

<p align="center">
  🚀 <a href="https://splitwisepro.vercel.app"><strong>Live Demo</strong></a>
</p>

---

# 💸 SplitwisePro – Bill Split & Expense Tracker

A modern bill-splitting and expense tracking web application built with **React (Vite)** and powered by **Convex** for backend, database, and authentication.

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
├── src/ or app/         # React frontend
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

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create `.env.local`:

```env
CONVEX_DEPLOY_KEY=your_deploy_key
CONVEX_DEPLOYMENT=dev:tacit-wildebeest-666
VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
```

### Start Development

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

- Build Command → `npm run build`
- Output Directory → `dist`

Required environment variable:

```
VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
```

---

## 📄 License

MIT License
