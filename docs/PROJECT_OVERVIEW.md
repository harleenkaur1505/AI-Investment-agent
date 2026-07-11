# PROJECT OVERVIEW

> ## AI Development Instruction
>
> This document defines the product that must be built.
>
> Treat this document as the primary source of truth regarding project requirements.
>
> Read this document completely before generating any code.
>
> Do not invent additional features.
>
> Do not modify the project scope unless explicitly instructed.
>
> Build only what is described in this document.

---

# Project Name

**AI Investment Research Agent**

---

# Assignment Goal

Build an AI-powered Investment Research Agent capable of analyzing a publicly listed company and generating an AI-assisted investment recommendation.

The application should combine real financial information, recent company news, and AI reasoning to help users understand whether a company appears to be a potentially good investment.

The recommendation should **never be presented as financial advice**. Instead, it should clearly communicate that it is an AI-generated research summary based on publicly available information.

This project is intended to demonstrate:

- Full Stack Development
- AI Integration
- LangChain Orchestration
- Prompt Engineering
- Software Architecture
- API Integration
- Professional UI/UX
- Clean Engineering Practices

---

# Project Vision

Create a modern AI-powered dashboard that allows users to analyze any company through a single search.

The application should provide factual financial information, recent news, AI-generated reasoning, and a clear investment recommendation in a visually appealing dashboard.

The overall experience should resemble a premium AI SaaS application rather than a student project.

---

# Target Users

The application is designed for users who want a quick AI-assisted investment research summary before conducting deeper financial analysis.

Potential users include:

- Beginner Investors
- Students
- Finance Enthusiasts
- Market Researchers
- Recruiters evaluating AI engineering skills

---

# Project Scope

This project focuses on analyzing **one company at a time**.

The objective is to build a focused and reliable AI workflow instead of a feature-heavy financial platform.

The project prioritizes:

- Code Quality
- AI Workflow
- Clean Architecture
- User Experience

over the number of implemented features.

---

# Core Workflow

User opens the application.

↓

User enters a company name.

↓

Clicks **Analyze**.

↓

Frontend sends the request to the backend.

↓

Backend retrieves company information.

↓

Backend retrieves latest news.

↓

LangChain prepares the AI prompt.

↓

Google Gemini performs reasoning.

↓

Backend returns structured JSON.

↓

Frontend renders the dashboard.

---

# AI Workflow

The project follows a **Retrieval + Reasoning** workflow.

## Step 1

User submits a company name.

↓

## Step 2

Backend retrieves factual company information from **Alpha Vantage API**.

↓

## Step 3

Backend retrieves the latest company news from **NewsAPI**.

↓

## Step 4

LangChain combines:

- Company Information
- Financial Metrics
- Recent News

into a structured prompt.

↓

## Step 5

The prompt is sent to **Google Gemini API**.

↓

## Step 6

Gemini analyzes the information and generates:

- Recommendation
- SWOT Analysis
- Risk Analysis
- Confidence Score
- AI Reasoning

↓

## Step 7

LangChain parses the AI response into structured JSON.

↓

## Step 8

Backend sends the structured JSON response to React.

↓

## Step 9

React renders the complete dashboard.

---

# Project Principles

This project follows the following engineering principles:

- Simplicity over unnecessary complexity.
- Modular architecture.
- Reusable components.
- Clean separation of concerns.
- Structured AI output.
- Responsive user experience.
- Maintainable code.
- Professional coding standards.
- Interview-friendly implementation.

---

# Functional Requirements

The application MUST provide the following core functionalities.

---

## 1. Company Search

The application shall provide a search interface where users can enter the name of a publicly listed company.

Requirements:

- Single search input field
- Analyze button
- Input validation
- Prevent empty searches
- Disable button while analysis is in progress

---

## 2. AI Investment Recommendation

After completing the analysis, the AI must provide:

- Investment Recommendation (Invest / Pass)
- Confidence Score (0–100%)
- Short Recommendation Summary

This recommendation should always appear at the top of the dashboard.

---

## 3. Company Overview

Display a concise summary of the company.

The overview should include, whenever available:

- Company Name
- Industry
- Sector
- Headquarters
- CEO
- Business Description
- Official Website

If any information is unavailable, display **"Data Not Available"** instead of leaving empty fields.

---

## 4. Financial Snapshot

Display key financial indicators retrieved from the financial API.

Preferred metrics include:

- Market Capitalization
- Revenue
- Revenue Growth
- EPS
- P/E Ratio
- Dividend Yield (if available)
- 52 Week High
- 52 Week Low

Financial values should be displayed in a clean card layout.

---

## 5. Financial Visualizations

The application should visually represent financial information wherever appropriate.

Recommended charts include:

- Revenue Trend (Line Chart)
- Financial Comparison (Bar Chart)
- Market Distribution (Pie Chart)
- Confidence Score (Donut Chart)

Charts should improve readability rather than increase complexity.

Do not generate unnecessary charts if sufficient data is unavailable.

---

## 6. Latest Company News

Display recent news related to the selected company.

Each news card should include:

- Headline
- Source
- Published Date
- Short Summary

Maximum:

5 recent articles.

---

## 7. SWOT Analysis

The AI should generate a SWOT Analysis containing:

### Strengths

### Weaknesses

### Opportunities

### Threats

Each section should be displayed inside its own reusable card.

---

## 8. Risk Analysis

Generate an AI-powered risk assessment covering:

- Financial Risk
- Market Risk
- Business Risk

The goal is to help users understand potential concerns before investing.

---

## 9. AI Reasoning

The application should clearly explain **why** the AI generated its recommendation.

This section should contain concise paragraphs instead of long essays.

The reasoning should be factual, structured, and easy to read.

---

## 10. Error Handling

The application should gracefully handle:

- Invalid company names
- API failures
- Missing financial information
- Network failures
- AI response failures

Errors should always be displayed using user-friendly messages.

---

## 11. Loading Experience

While analysis is running, the application should communicate the AI workflow to the user.

Example loading steps:

✓ Fetching Company Information

✓ Fetching Financial Data

✓ Fetching Latest News

✓ Preparing AI Analysis

✓ Generating Investment Recommendation

The loading state should make the AI feel active and transparent.

---

# Dashboard Layout

The application should remain a **Single Page Application (SPA).**

The dashboard should dynamically appear below the search section after a successful analysis.

The layout should follow the exact order below.

---

## Dashboard Order

1. Recommendation Card

↓

2. Company Overview

↓

3. Financial Snapshot

↓

4. Financial Charts

↓

5. Latest Company News

↓

6. SWOT Analysis

↓

7. Risk Analysis

↓

8. AI Reasoning

---

Each section should be displayed inside reusable cards with consistent spacing and styling.

---

# Application Type

This project is a **Single Page Application (SPA).**

Requirements:

- No page navigation
- No React Router
- No authentication pages
- No dashboard page
- No profile page

Everything should happen on a single screen.

The dashboard should dynamically update after each company search.

---

# Included Features

The final application MUST include:

- Responsive Design
- Modern Dashboard
- AI Recommendation
- Company Overview
- Financial Snapshot
- Financial Charts
- Latest News
- SWOT Analysis
- Risk Analysis
- AI Reasoning
- Confidence Score
- Loading Progress
- Error Handling
- Structured JSON Rendering

---

# Excluded Features

The following features are intentionally excluded from this assignment.

- Authentication
- User Accounts
- Portfolio Management
- Watchlists
- Search History
- Database Integration
- Backend Cache
- Admin Dashboard
- Multi-company Comparison
- Live Stock Trading
- Payment Integration
- Notification System
- Chat Functionality

These features should NOT be implemented unless explicitly requested.

---

# User Experience Goals

The application should feel:

- Modern
- Professional
- Fast
- Minimal
- AI-first
- Data-centric

The dashboard should never appear cluttered.

Information should be grouped logically and presented in a visually appealing manner.

Users should immediately understand the AI recommendation without reading the complete report.

---

# AI Reminder

When implementing this section:

- Do not invent additional features.
- Do not remove required sections.
- Follow the dashboard order exactly.
- Keep the implementation clean and modular.
- Maintain consistency with PROJECT_OVERVIEW.md.


# Technology Stack

The project must use the following technology stack. Do not replace any technology unless explicitly instructed.

---

## Frontend

Framework:
- React (Vite)

Styling:
- Tailwind CSS

HTTP Client:
- Axios

State Management:
- React Hooks (useState, useEffect)

---

## Backend

Runtime:
- Node.js

Framework:
- Express.js

Middleware:
- CORS
- dotenv

Development Tools:
- Nodemon

---

## AI Layer

AI Orchestration:
- LangChain.js

Large Language Model:
- Google Gemini API

LangChain should be used only as an orchestration layer.

The project should NOT implement:

- AI Agents
- Memory
- Retrieval-Augmented Generation (RAG)
- Tool Calling

The LangChain implementation should remain lightweight, modular, and easy to explain during interviews.

---

## External APIs

### 1. Google Gemini API

Purpose:

- Investment Recommendation
- Confidence Score
- SWOT Analysis
- Risk Analysis
- AI Reasoning

Gemini should never be responsible for generating factual financial information.

It should only analyze the data retrieved from external APIs.

---

### 2. Alpha Vantage API

Purpose:

- Company Overview
- Financial Metrics
- Market Capitalization
- Revenue
- EPS
- P/E Ratio
- Revenue Growth
- Other available financial indicators

This API serves as the primary source of factual financial data.

---

### 3. NewsAPI

Purpose:

- Latest Company News
- Headlines
- News Source
- Published Date
- Article Description

Maximum:

Retrieve up to five recent news articles for analysis.

---

# API Priority

Primary AI API

- Google Gemini API

Primary Financial API

- Alpha Vantage API

Primary News API

- NewsAPI

Future API replacements should maintain the same responsibilities.

---

# Data Flow

The application follows the workflow below.

User

↓

React Frontend

↓

Axios Request

↓

Express Backend

↓

Retrieve Company Information (Alpha Vantage)

↓

Retrieve Latest News (NewsAPI)

↓

LangChain Prompt Preparation

↓

Google Gemini Analysis

↓

Structured JSON Response

↓

React Dashboard

---

# AI Design Principles

The application separates factual information from AI reasoning.

External APIs are responsible for providing factual information.

Google Gemini is responsible only for reasoning and summarization.

The AI should never invent:

- Revenue
- Market Cap
- EPS
- P/E Ratio
- News Articles
- Company Details

If data is unavailable, the application should display:

"Data Not Available"

instead of generating fictional values.

---

# Structured Output Requirement

LangChain should always instruct Gemini to return structured JSON.

The response must never contain:

- Markdown
- Bullet Lists
- HTML
- Plain paragraphs

The response should always be machine-readable.

The frontend must never parse free-form text.

---

# Expected JSON Structure

The backend should always return JSON following this structure.

{
  "recommendation": {
    "decision": "Invest",
    "confidence": 87,
    "summary": "..."
  },

  "companyOverview": {},

  "financialSnapshot": {},

  "financialCharts": {},

  "latestNews": [],

  "swotAnalysis": {},

  "riskAnalysis": {},

  "aiReasoning": {}
}

The structure should remain consistent across all requests.

---

# Deployment

Frontend

- Vercel

Backend

- Render

Environment variables must never be committed to Git.

All API keys should be stored inside the backend `.env` file.

The frontend must never have direct access to API keys.

---

# Security Guidelines

The application must follow the following security practices.

- Never expose API keys.
- Never call Gemini directly from React.
- Never call Alpha Vantage directly from React.
- Never call NewsAPI directly from React.
- Validate all incoming requests.
- Handle failed API responses gracefully.
- Never trust client-side input.

---

# Coding Philosophy

The implementation should prioritize:

- Simplicity
- Readability
- Modularity
- Maintainability
- Reusability

Avoid unnecessary abstractions.

The project should remain interview-friendly.

Every module should have a single responsibility.

---

# AI Reminder

When implementing this section:

- Follow the defined technology stack.
- Do not replace libraries without permission.
- Keep LangChain lightweight.
- Maintain the defined data flow.
- Always return structured JSON.
- Keep AI reasoning separate from factual data.

---

# Success Criteria

The project will be considered successfully completed when all the following conditions are met.

## Functional Success

The application should allow users to:

- Search for a publicly listed company.
- Retrieve factual financial information.
- Retrieve the latest company news.
- Generate an AI-powered investment recommendation.
- Display the complete analysis in a professional dashboard.

---

## Technical Success

The application should:

- Successfully integrate React and Express.
- Successfully integrate LangChain with Google Gemini.
- Successfully consume Alpha Vantage API.
- Successfully consume NewsAPI.
- Return structured JSON from the backend.
- Display all returned data correctly on the frontend.

---

## User Experience Success

The application should:

- Feel modern and responsive.
- Display loading states while analysis is running.
- Handle errors gracefully.
- Provide a clean dashboard layout.
- Be easy to navigate.
- Present information clearly without overwhelming the user.

---

## Engineering Success

The project should demonstrate:

- Clean architecture
- Modular components
- Proper folder organization
- Separation of concerns
- Maintainable code
- Reusable components
- Consistent coding style

---

# Performance Expectations

The application should aim to:

- Load quickly.
- Minimize unnecessary API calls.
- Render smoothly.
- Keep component re-renders efficient.
- Display loading indicators during long-running operations.

The application should prioritize responsiveness over unnecessary visual effects.

---

# Error Handling Expectations

The application must gracefully handle:

- Invalid company names.
- Empty search input.
- Alpha Vantage API failures.
- NewsAPI failures.
- Gemini API failures.
- LangChain processing failures.
- Internet connectivity issues.
- Unexpected backend errors.

Users should always receive meaningful and user-friendly error messages.

---

# Future Enhancements

The following ideas are intentionally excluded from the current implementation but may be added in future versions.

Possible enhancements include:

- User Authentication
- Portfolio Tracking
- Watchlists
- Multi-company Comparison
- Historical Stock Trends
- PDF Report Export
- Saved Searches
- AI Follow-up Chat
- Dark Mode
- Email Reports
- Advanced Financial Ratios
- Sentiment Trend Analysis
- Real-time Stock Prices
- Additional Financial APIs

These features should NOT be implemented in the current assignment.

---

# Project Constraints

To keep the project focused and interview-friendly, follow these constraints.

The project MUST:

- Remain a Single Page Application.
- Use React (Vite) for the frontend.
- Use Express.js for the backend.
- Use LangChain.js for AI orchestration.
- Use Google Gemini as the LLM.
- Use Alpha Vantage for financial information.
- Use NewsAPI for company news.

The project MUST NOT:

- Use React Router.
- Introduce Redux or other global state libraries.
- Add authentication.
- Add a database.
- Add unnecessary backend complexity.
- Introduce AI Agents or RAG.
- Build features outside the defined scope.

---

# Definition of Done

A feature should only be considered complete when all the following conditions are satisfied.

- The feature works correctly.
- The code follows the project architecture.
- Error handling is implemented.
- The UI is responsive.
- The code is clean and modular.
- API responses are handled correctly.
- No unnecessary dependencies are introduced.
- The implementation matches the project documentation.

---

# AI Reminder

Before generating any code, always:

1. Read this entire document.

2. Treat this file as the primary source of truth.

3. Do not contradict any requirement defined here.

4. If another documentation file provides additional implementation details, combine both documents without violating either.

5. Do not invent additional features.

6. Do not simplify required functionality.

7. Do not over-engineer the solution.

8. Keep the implementation interview-friendly.

9. Build incrementally and complete one milestone before moving to the next.

10. Always prioritize maintainability, readability, and clean architecture over unnecessary complexity.

---

# End of Document

This document defines **WHAT** the AI Investment Research Agent must be.

Implementation details, architecture decisions, coding conventions, and development workflow are described in the remaining documentation files.