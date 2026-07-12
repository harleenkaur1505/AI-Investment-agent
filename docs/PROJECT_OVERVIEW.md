# PROJECT_OVERVIEW.md

# InvestraAI

## AI-Powered Investment Intelligence Platform

---

## AI Development Instructions

This document defines the product requirements for InvestraAI.

Treat this file as the primary source of truth.

Build only the functionality described in this document.

Do not introduce unnecessary features or architectural changes.

The objective is to deliver a polished, production-quality academic project that demonstrates modern full-stack development and AI integration.

---

# Project Objective

InvestraAI is an AI-powered investment research platform that helps users analyze publicly listed companies using live financial data, relevant company news, and Google Gemini AI.

Users simply enter a company name or stock ticker, and the platform generates a comprehensive research report containing:

- AI Investment Recommendation
- Executive Summary
- Financial Overview
- Interactive Charts
- SWOT Analysis
- Risk Assessment
- AI Reasoning

The application is designed for educational and demonstration purposes only and should not be interpreted as financial advice.

---

# Target Users

This application is intended for:

- Students
- Recruiters
- Developers
- Investors
- Anyone interested in quickly understanding a company's financial position using AI-assisted analysis.

---

# Core Workflow

```
User enters Company Name or Stock Ticker

↓

Frontend sends request to backend

↓

Backend validates input

↓

Yahoo Finance retrieves financial information

↓

News API retrieves relevant company news

↓

LangChain prepares the AI prompt

↓

Google Gemini performs analysis

↓

Backend combines all results

↓

Frontend displays the complete research dashboard
```

---

# Core Features

## Company Search

Allow users to search using:

- Company Name
- Stock Ticker

Examples:

- Apple
- Microsoft
- Tesla
- AAPL
- MSFT
- TSLA

---

## AI Investment Recommendation

Display:

- Invest / Pass
- Confidence Score
- Executive Summary

---

## Company Overview

Display:

- Company Name
- Industry
- Sector
- Headquarters
- CEO
- Exchange

---

## Financial Snapshot

Display important financial indicators including:

- Market Capitalization
- Revenue
- Revenue Growth
- EPS
- P/E Ratio
- Dividend Yield
- Profit Margin
- Operating Margin
- Return on Equity

Unavailable values should display:

```
Data Not Available
```

---

## Interactive Charts

Display visualizations such as:

- Historical Stock Price
- Revenue Trend
- Financial Performance

Charts should be colorful, responsive, and interactive.

---

## Company News

Display only news directly related to the searched company.

Each article should include:

- Headline
- Source
- Published Date
- Short Summary
- Link to Original Article

Irrelevant news must be excluded.

---

## SWOT Analysis

Generate:

- Strengths
- Weaknesses
- Opportunities
- Threats

---

## Risk Assessment

Generate:

- Financial Risk
- Business Risk
- Market Risk

---

## AI Reasoning

Provide a structured explanation describing why the AI recommended:

- Invest

or

- Pass

The explanation should be based entirely on retrieved financial data and relevant news.

---

# Dashboard Layout

The dashboard should present information in the following order:

1. AI Recommendation
2. Executive Summary
3. Company Overview
4. Financial Snapshot
5. Interactive Charts
6. Company News
7. SWOT Analysis
8. Risk Assessment
9. AI Reasoning

---

# User Experience

The application should provide:

- Fast search experience
- Smooth loading animations
- Responsive dashboard
- Clear error messages
- Professional financial interface
- Intuitive navigation

---

# Design Requirements

The interface should follow a premium fintech design language.

Requirements include:

- Dark modern theme
- Fixed side navigation
- AI-inspired background
- Glass-style cards
- Rounded components
- Colorful charts
- Green "Invest" badge
- Red "Pass" badge
- Smooth animations
- Clean typography
- High readability

The design should immediately communicate that the platform is an AI-powered investment research tool.

---

# Technology Stack

## Frontend

- React (Vite)
- React Router
- Axios
- Recharts

---

## Backend

- Node.js
- Express.js

---

## AI

- Google Gemini
- LangChain.js

---

## External APIs

### Yahoo Finance

Used for:

- Company Profile
- Financial Metrics
- Historical Stock Data

---

### News API

Used for:

- Company-specific news
- Market developments

---

# Excluded Features

The following features are intentionally excluded from the current version:

- Authentication
- User Accounts
- Portfolio Tracking
- Watchlists
- Multi-company Comparison
- Database Storage
- Payment Integration
- Real-time Notifications

These features may be considered in future versions.

---

# Error Handling

The application should gracefully handle:

- Invalid company names
- Invalid ticker symbols
- Missing financial data
- API failures
- AI service errors
- Network failures

Users should always receive clear, user-friendly messages.

---

# Performance Goals

The platform should:

- Minimize API latency
- Avoid unnecessary requests
- Keep the interface responsive
- Display loading progress during AI analysis
- Render charts efficiently

---

# Future Enhancements

Potential future improvements include:

- Portfolio Management
- Watchlists
- Company Comparison
- PDF Report Export
- Saved Analyses
- User Authentication
- Real-Time Stock Updates
- AI Chat Assistant
- Analyst Recommendation Comparison

---

# Success Criteria

The project is considered complete when:

- Users can search any publicly listed company.
- Live financial data is retrieved successfully.
- Relevant company news is displayed.
- Gemini AI generates meaningful investment insights.
- The dashboard renders all sections correctly.
- Invalid companies are handled gracefully.
- The application remains responsive across devices.
- The interface provides a polished, recruiter-ready experience.

---

# Project Summary

InvestraAI demonstrates the integration of modern frontend development, backend engineering, external financial APIs, and large language models to create an intelligent investment research platform. The project emphasizes clean architecture, modular design, real-time data analysis, and a professional user experience suitable for academic demonstration and technical interviews.