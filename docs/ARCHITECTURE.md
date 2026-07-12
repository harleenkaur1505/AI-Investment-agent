# ARCHITECTURE.md

# InvestraAI – System Architecture

## Overview

InvestraAI follows a modern client-server architecture designed to separate the user interface, business logic, AI orchestration, and external data providers. This modular approach improves maintainability, scalability, and future extensibility.

The application enables users to search for a publicly listed company and receive an AI-generated investment research report using live financial data, relevant market news, and Gemini AI analysis.

---

# High-Level Architecture

```
                           +----------------------+
                           |      React (Vite)    |
                           |     Frontend UI      |
                           +----------+-----------+
                                      |
                           HTTPS REST API Requests
                                      |
                                      ▼
                        +----------------------------+
                        |   Express.js Backend API   |
                        +------------+---------------+
                                     |
               ------------------------------------------------
              |                  |                 |            |
              ▼                  ▼                 ▼            ▼
      Yahoo Finance         News Service      Gemini AI      Validation
      Financial Data          (Relevant)      (LangChain)     Middleware
              |                  |                 |
              -------------------|-----------------
                                  |
                                  ▼
                     Analysis & Recommendation Engine
                                  |
                                  ▼
                           Structured JSON Response
                                  |
                                  ▼
                           React Dashboard UI
```

---

# Architecture Layers

## 1. Presentation Layer (Frontend)

Technology:
- React (Vite)
- React Router
- Axios

Responsibilities:

- Responsive user interface
- Company search
- API communication
- Loading states
- Error handling
- Dashboard rendering
- Charts and visualizations
- SWOT display
- Risk assessment display
- AI recommendation visualization

The frontend never communicates directly with external APIs.

All requests pass through the backend.

---

## 2. API Layer (Backend)

Technology:

- Node.js
- Express.js

Responsibilities:

- Accept client requests
- Validate user input
- Coordinate data collection
- Handle errors
- Call AI services
- Format responses
- Return standardized JSON

The backend acts as the single source of truth for all business logic.

---

## 3. Service Layer

The service layer contains the application's core logic.

Main responsibilities:

- Retrieve company information
- Retrieve financial metrics
- Retrieve historical market data
- Retrieve relevant company news
- Prepare prompts for Gemini AI
- Merge all responses
- Generate structured investment report

Business logic is isolated from routing logic for easier maintenance.

---

## 4. AI Layer

Technology:

- Google Gemini
- LangChain.js

Responsibilities:

Generate:

- Investment Recommendation
- Executive Summary
- SWOT Analysis
- Risk Assessment
- AI Reasoning

The AI never invents company data.

It only analyzes information collected from trusted external sources.

---

## 5. External Data Sources

### Yahoo Finance

Provides:

- Company Profile
- Market Capitalization
- Revenue
- EPS
- P/E Ratio
- Historical Prices
- Financial Ratios
- Trading Metrics

---

### News Provider

Provides:

- Recent company news
- Market developments
- Earnings updates
- Product announcements
- Mergers
- Leadership changes

Only news directly related to the selected company is used during analysis.

Irrelevant news articles are filtered before being passed to the AI.

---

## 6. Configuration Layer

Environment variables store:

- Gemini API Key
- News API Key
- Server Port
- Runtime Configuration

Sensitive credentials are never committed to version control.

---

# Request Flow

## Step 1

User enters

```
Apple
```

or

```
AAPL
```

---

## Step 2

Frontend sends

```
POST /analyze
```

---

## Step 3

Backend validates input.

Invalid requests immediately return:

```
400 Bad Request
```

---

## Step 4

Backend fetches

- Company Profile
- Financial Data
- Historical Prices
- Relevant News

---

## Step 5

Collected information is formatted into a structured prompt.

---

## Step 6

Gemini AI analyzes

- Business overview
- Financial health
- Market sentiment
- Risks
- Opportunities

---

## Step 7

Backend combines

Financial Data

+

AI Analysis

+

News

into one standardized JSON response.

---

## Step 8

Frontend renders

- Recommendation
- Executive Summary
- Company Overview
- Financial Snapshot
- Charts
- News
- SWOT
- Risk Assessment

---

# Folder Structure

```
frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   └── App.jsx
│
└── package.json

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── langchain/
│   ├── utils/
│   └── index.js
│
├── .env
└── package.json
```

---

# Design Principles

The architecture follows:

- Separation of Concerns
- Modular Design
- Reusable Components
- Scalable Folder Structure
- Centralized Configuration
- API-First Development
- Maintainable Business Logic
- Secure Environment Variable Management

---

# Error Handling Strategy

The backend handles:

- Invalid company names
- Missing API keys
- External API failures
- Network errors
- AI generation failures
- Validation errors

Each error returns a structured JSON response that the frontend displays through user-friendly error messages.

---

# Security Considerations

- Environment variables stored in `.env`
- API keys never exposed to the frontend
- Input validation on all requests
- Centralized error handling
- No sensitive information returned to clients

---

# Future Enhancements

The architecture is designed to support future features without major restructuring.

Potential additions include:

- Company comparison
- Portfolio tracking
- User authentication
- Watchlists
- PDF report export
- Investment history
- Saved analyses
- Real-time stock updates
- Email report generation
- Multi-company AI comparison

---

# Architecture Summary

InvestraAI uses a modular, scalable architecture where React provides the user interface, Express manages application logic, Yahoo Finance supplies financial data, relevant news services provide market context, and Gemini AI generates investment insights. This layered design ensures clean separation of responsibilities, maintainability, and an intuitive experience while keeping the system flexible for future enhancements.