# AI Investment Research Agent

# 🚀 InvestraAI

### AI-Powered Investment Intelligence Platform

InvestraAI is a full-stack AI-powered web application that analyzes publicly listed companies using live financial data, relevant market news, and Google Gemini AI to generate intelligent investment research reports.

Users can search any company by name or stock ticker and instantly receive an AI-generated report containing investment recommendations, financial insights, SWOT analysis, risk assessment, and interactive visualizations.

> ⚠️ This project is built for educational and demonstration purposes only and should not be considered financial advice.

---

## ✨ Features

- 🔍 Search companies using stock ticker or company name
- 🤖 AI-powered investment recommendations (Invest / Pass)
- 📊 Interactive financial charts
- 📰 Company-specific news analysis
- 💼 Company overview and key financial metrics
- 📈 SWOT analysis generated using AI
- ⚠️ Business, Market, and Financial risk assessment
- 💡 AI-generated executive summary and reasoning
- 🎨 Modern premium fintech dashboard
- 📱 Responsive design

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- React Router
- Axios
- Recharts
- CSS

### Backend

- Node.js
- Express.js

### AI

- Google Gemini
- LangChain.js

### External APIs

- Yahoo Finance
- News API

---

## 🏗️ System Architecture

```
React Frontend
        │
        ▼
Express Backend
        │
 ┌──────┼─────────┐
 ▼      ▼         ▼
Yahoo  NewsAPI  Gemini AI
Finance           (LangChain)
        │
        ▼
AI Investment Report
```

---

## 📂 Project Structure

```
AI-Investment-Agent/
│
├── frontend/
├── backend/
├── docs/
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Investment-Agent.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
GEMINI_API_KEY=your_key
NEWS_API_KEY=your_key
YAHOO_API_KEY=your_key
PORT=5000
```

---

## 🚀 Future Improvements

- Portfolio Management
- Company Comparison
- Watchlists
- User Authentication
- Export Reports as PDF
- Real-time Stock Updates

---

## 👩‍💻 Author

**Harleen Kaur**

Computer Science Engineering Student

Passionate about Full-Stack Development, AI Applications, and Modern Web Technologies.

---

## 📄 License

This project is intended for educational purposes.
