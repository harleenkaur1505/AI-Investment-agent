# UI GUIDELINES

> ## AI Development Instruction
>
> Read the following documents before generating any frontend code:
>
> 1. PROJECT_OVERVIEW.md
> 2. ARCHITECTURE_GUIDE.md
> 3. DEVELOPMENT_RULES.md
> 4. UI_GUIDELINES.md
>
> This document defines the visual identity of the application.
>
> Follow these guidelines consistently throughout the project.
>
> Do not introduce a different design language.

---

# Design Philosophy

The application should resemble a professional AI-powered Investment Research Terminal rather than a traditional dashboard.

The overall experience should feel similar to platforms like:

- Bloomberg Terminal
- TradingView
- Koyfin
- Finviz
- Yahoo Finance Professional

This is an AI research application, not a stock trading platform.

The interface should communicate trust, speed, and professionalism.

---

# Overall Design Goals

The UI should feel:

- Professional
- Premium
- Data-dense
- AI-first
- Financial
- Modern
- Minimal
- Fast

Avoid playful or colorful SaaS designs.

The application should look like software used by financial analysts.

---

# Color Palette

## Background

Very Dark

```
#090B0F
```

---

## Surface Cards

```
#111827
```

---

## Primary Accent

Electric Teal

```
#00E5A0
```

---

## Secondary Accent

Purple

```
#6D5EF5
```

---

## Highlight Accent

Pink

```
#F44B9A
```

---

## Success

```
#00E676
```

---

## Error

```
#FF5252
```

---

## Warning

```
#F59E0B
```

---

## Borders

```
#1F2937
```

---

## Text

Primary

```
#F9FAFB
```

Secondary

```
#94A3B8
```

---

# Typography

Use modern clean fonts.

Recommended:

- Inter
- JetBrains Mono (numbers only)

Use JetBrains Mono only for:

- Prices
- Financial values
- Percentages
- Tickers

Everything else should use Inter.

---

# Application Layout

The application should remain a Single Page Application.

The overall layout should consist of three major sections.

```
-------------------------------------------------------

Top Navigation

-------------------------------------------------------

Sidebar

|

Main Dashboard

|

AI Research Panel

-------------------------------------------------------
```

---

# Top Navigation

Contains:

- Application Logo
- Application Name
- Market Status
- Current Date
- Refresh Button

The navigation should remain fixed.

---

# Left Sidebar

The sidebar should provide quick navigation and company selection.

Include:

- Search Box
- Recent Searches
- Watchlist

Each watchlist item should display:

- Company Symbol
- Company Name
- Current Price
- Daily Percentage Change
- AI Confidence Score

Highlight the selected company.

---

# Main Dashboard

The main dashboard should contain the following sections.

## Recommendation Card

Large hero card displayed first.

Contains:

- Invest / Pass
- Confidence Score
- AI Summary
- Company Name

This should be the most visually prominent component.

---

## Financial Metrics

Display compact metric cards.

Examples:

- Market Cap
- Revenue
- EPS
- P/E Ratio
- Dividend Yield
- 52 Week High
- 52 Week Low

---

## Financial Charts

Use Recharts.

Maximum:

3–4 charts.

Recommended:

- Line Chart
- Bar Chart
- Donut Chart

Charts should support the financial story rather than overwhelm the interface.

---

## Latest News

Display up to five news cards.

Each card should contain:

- Headline
- Source
- Published Date
- Short Summary

---

## SWOT Analysis

Display four independent cards.

- Strengths
- Weaknesses
- Opportunities
- Threats

---

## Risk Analysis

Display AI-generated risks.

Separate into:

- Financial Risk
- Market Risk
- Business Risk

---

# Right AI Research Panel

Instead of an AI chatbot, implement an AI Research Summary panel.

This panel should remain visible throughout the analysis.

Include:

- Analysis Status
- Recommendation
- Confidence Score
- Top Positive Factors
- Top Risk Factors
- Final AI Verdict

This panel should summarize the complete analysis in a concise format.

---

# Cards

Every section should use reusable cards.

Cards should have:

- Dark background
- Rounded corners
- Thin border
- Soft shadow
- Consistent spacing

Maintain uniform card heights where appropriate.

---

# Charts

Use Recharts.

Recommended:

- Revenue Trend → Line Chart
- Financial Comparison → Bar Chart
- Confidence Score → Donut Chart

Do not add charts without meaningful data.

---

# Icons

Use Lucide React.

Icons should:

- Be minimal
- Use consistent sizing
- Support readability

Avoid decorative icons.

---

# Buttons

Buttons should have:

- Rounded corners
- Electric teal primary color
- Hover animation
- Loading state
- Disabled state

Primary buttons should stand out without being oversized.

---

# Search Experience

The search bar should be prominent and easy to access.

During analysis:

- Disable the search button
- Display loading progress
- Prevent duplicate requests

---

# Loading Experience

Display a professional loading workflow.

Example:

✓ Fetching Company Information

✓ Retrieving Financial Data

✓ Fetching Latest News

✓ Preparing AI Analysis

✓ Generating Investment Recommendation

Never display a blank loading screen.

---

# Empty State

Before any company is searched:

Display:

- Welcome Message
- Application Description
- Search Box

Hide all dashboard sections until valid results are available.

---

# Company Not Found State

If the company cannot be validated:

Display a professional error card.

Example:

⚠ Company Not Found

"We couldn't find a publicly listed company with this name."

Hide:

- Recommendation
- Charts
- Financial Metrics
- SWOT
- Risk Analysis
- AI Summary

Do not generate AI analysis for invalid companies.

---

# Responsiveness

The application must work on:

- Desktop
- Tablet
- Mobile

On smaller screens:

- Sidebar collapses
- AI Research Panel moves below the dashboard
- Charts resize automatically

---

# Animations

Use subtle animations only.

Allowed:

- Fade In
- Hover Effects
- Smooth Transitions

Avoid:

- Bounce
- Flashing
- Heavy Motion
- Complex Animations

---

# Things To Avoid

Do NOT implement:

- Glassmorphism
- Bootstrap
- Material UI
- Neon effects
- Excessive gradients
- Unnecessary charts
- Portfolio Management
- AI Chatbot
- Trading Interface

Maintain a clean and professional financial application.

---

# Final UI Goal

The finished application should immediately communicate:

"This is a professional AI Investment Research Platform."

The interface should be visually impressive while remaining clean, readable, and focused on investment analysis.

The recruiter should feel that the application resembles a real financial research product rather than a college project.

---

# AI Reminder

When generating UI:

- Follow this design guide exactly.
- Build reusable components.
- Maintain visual consistency.
- Prioritize readability.
- Use the specified color palette.
- Use Recharts for charts.
- Use Lucide React for icons.
- Do not change the overall layout without explicit instruction.