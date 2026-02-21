<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,100:06B6D4&height=200&section=header&text=SplitwisePro%20💸&fontSize=40&fontColor=ffffff&animation=fadeIn" />
</p>




# 💸 SplitwisePro – Bill Split & Expense Tracker

<p align="center">
  <img src="https://img.shields.io/github/stars/adityasing9/SplitwisePro?style=social" />
  <img src="https://img.shields.io/github/license/adityasing9/SplitwisePro" />
  <img src="https://img.shields.io/github/package-json/v/adityasing9/SplitwisePro" />
  <img src="https://img.shields.io/github/deployments/adityasing9/SplitwisePro/vercel?label=Vercel%20Deploy" />
  <img src="https://komarev.com/ghpvc/?username=adityasing9&repo=SplitwisePro&color=blue" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-Convex-orange" />
  <img src="https://img.shields.io/badge/Database-Convex%20Cloud-yellow" />
  <img src="https://img.shields.io/badge/Stylings-TailwindCSS-38B2AC?logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel" />
</p>

<p align="center">
  🚀 <a href="https://splitwisepro.vercel.app"><strong>Live Demo</strong></a>
</p>

---

## ✨ Features

- 🧾 Split bills among multiple people
- 📊 Automatic balance calculation
- ☁️ Cloud backend with Convex
- 🔐 Built-in authentication (Convex Auth)
- ⚡ Fast Vite-powered frontend

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Convex |
| Database | Convex Cloud |
| Deployment | Vercel |

---

## 🧠 Architecture

```
User
  ↓
Vercel (React Frontend)
  ↓
Convex Cloud (Backend + Database)
```

---

## 📁 Project Structure

```
SplitwisePro/
├── convex/              # Backend functions & schema
├── src/ or app/         # React frontend
├── public/
├── .env.local
├── package.json
├── vite.config.ts
└── ...
```

---

## 🛠 Local Development

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create `.env.local`:

```env
CONVEX_DEPLOY_KEY=your_deploy_key
CONVEX_DEPLOYMENT=dev:tacit-wildebeest-666
VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
```

### Start Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🚀 Deployment

1. Push to GitHub
2. Import project in Vercel
3. Set:
   - Build Command → `npm run build`
   - Output Directory → `dist`
4. Add environment variable:
   ```
   VITE_CONVEX_URL=https://tacit-wildebeest-666.convex.cloud
   ```
5. Deploy 🎉

---

## 👤 Author

**Aditya Singh**

- GitHub: https://github.com/adityasing9
- Portfolio: (Add if available)

---

## 📄 License

MIT License
