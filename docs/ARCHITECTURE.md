# ARCHITECTURE GUIDE

> ## AI Development Instruction
>
> Read `PROJECT_OVERVIEW.md` before reading this document.
>
> This document defines **how** the project should be built.
>
> Follow the architecture exactly.
>
> Do not introduce additional architectural patterns or unnecessary complexity.

---

# Architecture Overview

The application follows a layered architecture.

```
React Frontend
      │
      ▼
Axios
      │
      ▼
Express Backend
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
LangChain
      │
      ▼
Google Gemini
      │
      ▼
Structured JSON
      │
      ▼
React Dashboard
```

Each layer has only one responsibility.

---

# Project Structure

```
AI-Investment-Agent/

frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── dashboard/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx

backend/
│
├── config/
├── controllers/
├── routes/
├── services/
├── langchain/
├── middleware/
├── utils/
├── server.js
└── .env

docs/
```

---

# Folder Responsibilities

## Frontend

| Folder | Responsibility |
|---------|----------------|
| components | Reusable UI components |
| layout | Navbar, Footer, Layout |
| dashboard | Dashboard cards and charts |
| services | Axios API calls |
| hooks | Custom React hooks |
| utils | Helper functions |
| assets | Images and static assets |

---

## Backend

| Folder | Responsibility |
|---------|----------------|
| routes | API endpoints |
| controllers | Handle requests and responses |
| services | Business logic |
| langchain | AI orchestration |
| middleware | Express middleware |
| utils | Helper functions |
| config | Configuration files |

---

# Request Flow

Every request must follow this sequence.

```
React

↓

Axios

↓

Express Route

↓

Controller

↓

Service

↓

Alpha Vantage API

↓

NewsAPI

↓

LangChain

↓

Google Gemini

↓

Structured JSON

↓

React
```

No layer should be skipped.

---

# Component Structure

The frontend should contain reusable components.

```
Layout
│
├── Navbar
│
├── Hero
│
├── Search Section
│
├── Loading Component
│
└── Dashboard
      │
      ├── Recommendation Card
      ├── Company Overview
      ├── Financial Snapshot
      ├── Financial Charts
      ├── News Section
      ├── SWOT Analysis
      ├── Risk Analysis
      └── AI Reasoning
```

Each dashboard section should be an independent reusable component.

---

# Third-Party Libraries

| Purpose | Library |
|----------|----------|
| UI | React (Vite) |
| Styling | Tailwind CSS |
| HTTP Requests | Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Loading | React Spinners |
| AI | LangChain.js |
| LLM | Google Gemini |
| Financial Data | Alpha Vantage API |
| News | NewsAPI |

Do not replace these libraries unless explicitly instructed.

---

# State Management

Use only React Hooks.

Allowed:

- useState
- useEffect

Do not use:

- Redux
- Zustand
- Context API (unless absolutely required)

Keep state as local as possible.

---

# Security

- Store all API keys in the backend `.env` file.
- Never expose API keys to the frontend.
- React should communicate only with the Express backend.
- Gemini, Alpha Vantage, and NewsAPI must only be called from the backend.

---

# Coding Principles

The project should prioritize:

- Clean architecture
- Modular components
- Reusable code
- Readability
- Simplicity
- Maintainability

Avoid unnecessary abstractions.

Build only what is required.

---

# AI Reminder

When generating code:

- Follow this architecture.
- Respect folder responsibilities.
- Do not move business logic into React components.
- Do not call external APIs directly from React.
- Generate modular and interview-friendly code.