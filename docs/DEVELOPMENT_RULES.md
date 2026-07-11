# DEVELOPMENT RULES

> ## AI Development Instruction
>
> Read the following documents before generating any code:
>
> 1. PROJECT_OVERVIEW.md
> 2. ARCHITECTURE_GUIDE.md
> 3. DEVELOPMENT_RULES.md
>
> These documents together define the project.
>
> Do not contradict any instruction written in them.

---

# General Rules

- Implement only the requested feature or milestone.
- Do not generate the entire project unless explicitly instructed.
- Do not modify unrelated files.
- Do not introduce new technologies without permission.
- Keep every implementation modular and easy to understand.

---

# Frontend Rules

- Use React (Vite).
- Use Functional Components only.
- Use React Hooks only.
- Use Tailwind CSS for styling.
- Use Axios for API communication.
- Use Recharts for charts.
- Use Lucide React for icons.
- Use React Spinners for loading indicators.
- Build the application as a Single Page Application (SPA).
- Do not use React Router.
- Do not use Redux or any other global state library.
- Keep components reusable and focused on a single responsibility.

---

# Backend Rules

- Use Express.js.
- Follow the Route → Controller → Service architecture.
- Keep controllers thin.
- Place business logic inside services.
- Store API keys in the backend `.env` file.
- Never expose API keys to the frontend.
- Validate user input before processing requests.
- Return structured JSON responses only.

---

# LangChain Rules

- Use LangChain.js as a lightweight orchestration layer.
- Use PromptTemplate.
- Use structured JSON output.
- Keep prompts modular.
- Keep chains simple and easy to understand.

Do NOT implement:

- Agents
- Memory
- RAG
- Tool Calling
- Multi-step autonomous workflows

---

# API Rules

Use only the following APIs:

- Google Gemini API
- Alpha Vantage API
- NewsAPI

Responsibilities:

- Alpha Vantage → Financial Data
- NewsAPI → Latest News
- Gemini → AI Analysis

The LLM should analyze retrieved data, not invent factual information.

---

# UI Rules

The interface should:

- Look like a modern SaaS dashboard.
- Follow the color palette defined in `UI_GUIDELINES.md`.
- Be responsive.
- Use reusable cards.
- Display charts only where meaningful.
- Prioritize readability over decoration.

Avoid unnecessary animations and visual clutter.

---

# Code Quality Rules

Write code that is:

- Modular
- Readable
- Maintainable
- Reusable
- Interview-friendly

Use meaningful variable and function names.

Keep files focused on a single responsibility.

Avoid duplicate code.

---

# Error Handling Rules

Handle the following gracefully:

- Empty input
- Invalid company names
- API failures
- Network failures
- Gemini failures
- Unexpected server errors

Always display user-friendly error messages.

---

# Documentation Rules

Whenever a feature is completed:

- Ensure it follows the project architecture.
- Do not change the project scope.
- Keep the implementation aligned with the documentation.

---

# Things You Must NOT Do

- Do not add authentication.
- Do not add a database.
- Do not add search history.
- Do not add portfolio management.
- Do not add watchlists.
- Do not use React Router.
- Do not use Redux.
- Do not use AI Agents.
- Do not introduce unnecessary dependencies.
- Do not generate placeholder or dummy implementations unless explicitly requested.

---

# AI Reminder

Before generating code:

1. Read `PROJECT_OVERVIEW.md`.
2. Read `ARCHITECTURE_GUIDE.md`.
3. Read this document.
4. Follow the implementation plan.
5. Generate only the requested milestone.
6. Keep the solution simple, clean, and production-ready.