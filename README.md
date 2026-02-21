# 💸 SplitwisePro – Bill Split & Expense Tracker

A modern bill-splitting and expense tracking web application built with **React (Vite)** and powered by **Convex** for backend, database, and authentication.

This project is connected to the Convex deployment:

👉 tacit-wildebeest-666

---

## 🚀 Features

- 🧾 Split bills among multiple people
- 📊 Automatic calculation of balances
- ☁️ Cloud backend using Convex
- 🔐 Built-in authentication (Convex Auth)
- ⚡ Fast frontend with Vite

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
├── app/ or src/         # Frontend React code
├── public/
├── .env.local
├── package.json
├── vite.config.ts
└── ...
```

---

## 🔐 Authentication

This project uses **Convex Auth** with Anonymous authentication for development.

For production, consider:
- Email/password authentication
- OAuth providers (Google/GitHub)
- Securing deployment keys

---

## 🛠 Local Development

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env.local` file:

```env
CONVEX_DEPLOY_KEY=your_deploy_key
CONVEX_DEPLOYMENT=dev:tacit-wildebeest-666
VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
```

> ⚠️ Do NOT commit `.env.local` to GitHub.

### 3️⃣ Start Development Server

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📡 HTTP API

User-defined HTTP routes are located in:

```
convex/router.ts
```

Routes are separated from `convex/http.ts` to protect authentication routes.

---

## 🚀 Deployment (Vercel)

1. Push repository to GitHub
2. Import project in Vercel
3. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
   ```
5. Deploy 🎉

Convex backend remains hosted on Convex Cloud.

---

## 📚 Documentation

- Convex Docs: https://docs.convex.dev/
- Deployment Guide: https://docs.convex.dev/production/
- Best Practices: https://docs.convex.dev/understanding/best-practices/

---

## 📄 License

MIT License
