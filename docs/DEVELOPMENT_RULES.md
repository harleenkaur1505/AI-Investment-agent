# DEVELOPMENT_RULES.md

# InvestraAI – Development Rules

## Purpose

This document defines the coding standards, architectural principles, and development practices followed throughout the InvestraAI project. These rules ensure the codebase remains clean, modular, maintainable, and scalable as new features are introduced.

---

# General Principles

The project follows the following software engineering principles:

- Keep components small and reusable.
- Separate business logic from presentation logic.
- Avoid duplicate code.
- Prefer readability over clever implementations.
- Maintain a consistent folder structure.
- Build reusable modules whenever possible.
- Keep API responses consistent across the application.

---

# Frontend Development Rules

## Technology Stack

- React (Vite)
- React Router
- Axios
- CSS Modules / Standard CSS

---

## Component Guidelines

Each React component should:

- Have a single responsibility.
- Be reusable.
- Receive data through props whenever possible.
- Avoid unnecessary internal state.
- Remain easy to test and maintain.

Large UI sections should be divided into smaller components.

Example:

```
Dashboard
│
├── SearchBar
├── RecommendationCard
├── CompanyOverview
├── FinancialSnapshot
├── ChartsSection
├── NewsSection
├── SWOTSection
├── RiskAssessment
└── AIResearchPanel
```

---

## State Management

Keep state as local as possible.

Only store information globally when shared across multiple components.

Avoid deeply nested state objects.

---

## API Communication

All HTTP requests should be placed inside a dedicated service layer.

Avoid calling APIs directly inside UI components.

Example:

```
services/
    analysisService.js
```

instead of writing Axios requests inside React components.

---

## UI Rules

Maintain a consistent design language throughout the application.

Use:

- Dark premium fintech theme
- Rounded cards
- Consistent spacing
- Clear typography
- Subtle animations
- Responsive layouts

Avoid excessive colors or distracting visual effects.

Charts should remain colorful while preserving readability.

---

# Backend Development Rules

## Technology Stack

- Node.js
- Express.js
- LangChain.js
- Google Gemini

---

## Routing Rules

Routes should only:

- Receive requests
- Validate input
- Forward requests to controllers

No business logic should exist inside route files.

---

## Controller Rules

Controllers should:

- Receive validated requests
- Invoke services
- Return formatted responses
- Handle success and error responses

Controllers should remain lightweight.

---

## Service Rules

Business logic belongs exclusively inside services.

Examples include:

- Financial data retrieval
- Company validation
- News aggregation
- AI orchestration
- Response formatting

Services should never depend on UI logic.

---

## Configuration Rules

All configurable values must remain inside the configuration layer.

Examples:

- API Keys
- Server Port
- Environment
- External API URLs

Hardcoded secrets are strictly prohibited.

---

# API Design Rules

All API responses must follow a consistent structure.

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

This ensures predictable frontend behavior.

---

# Error Handling Rules

All unexpected errors must be handled centrally.

The application should never expose:

- Stack traces
- Internal server paths
- API secrets
- Environment variables

Instead, return user-friendly messages.

Examples:

- Company not found
- Unable to retrieve financial data
- AI analysis temporarily unavailable
- Network request failed

---

# External API Rules

All external services should be accessed through dedicated service modules.

Current integrations include:

- Yahoo Finance
- Company News API
- Google Gemini

If a provider fails:

- Log the error.
- Return a graceful fallback response.
- Prevent application crashes.

---

# AI Rules

Gemini AI should only analyze verified data.

The AI must never:

- Invent financial metrics
- Fabricate company information
- Generate unsupported investment claims

Recommendations should always be based on:

- Financial data
- Historical performance
- Relevant company news

All AI-generated insights are for educational purposes only.

---

# News Processing Rules

Only display news that is directly related to the selected company.

The application should:

- Filter unrelated articles.
- Remove duplicate news.
- Prefer recent and reliable sources.
- Ignore generic market headlines that are not relevant to the company.

News quality is more important than quantity.

---

# Logging Rules

Use the centralized logger for:

- Server startup
- API requests
- External API failures
- AI execution
- Validation failures
- Unexpected errors

Avoid excessive logging in production.

---

# Folder Organization

Every file should belong to a clearly defined module.

```
controllers/
middleware/
routes/
services/
utils/
config/
langchain/
```

Frontend:

```
components/
pages/
services/
hooks/
assets/
utils/
```

Avoid placing unrelated files together.

---

# Naming Conventions

Use meaningful names.

Examples:

Good:

```
analysisService.js
financialSnapshot.js
companyOverview.js
riskAssessment.js
```

Avoid:

```
data.js
helper.js
temp.js
newFile.js
```

---

# Code Style

Maintain consistent formatting.

- Use descriptive variable names.
- Keep functions concise.
- Prefer early returns over deeply nested conditions.
- Add comments only where necessary to explain non-obvious logic.

Readable code is preferred over complex code.

---

# Performance Guidelines

To provide a smooth user experience:

- Minimize unnecessary API requests.
- Execute independent API calls in parallel when possible.
- Avoid blocking the UI during analysis.
- Display loading indicators for long-running operations.
- Optimize charts and large datasets.

---

# Git Workflow

Before committing:

- Remove debugging code.
- Remove unused imports.
- Ensure environment variables are excluded.
- Verify application builds successfully.
- Test major user flows.

Never commit:

- `.env`
- API keys
- Temporary files
- Build artifacts

---

# Future Scalability

The codebase should remain flexible enough to support:

- Authentication
- Portfolio management
- Watchlists
- Multi-company comparison
- Export to PDF
- Saved analyses
- Real-time market updates
- Additional AI providers

Future features should integrate without requiring major architectural changes.

---

# Development Philosophy

InvestraAI is built with a focus on clean architecture, modular development, and maintainable code. Every feature should prioritize clarity, reliability, and user experience while ensuring the application remains scalable and easy to extend in the future.