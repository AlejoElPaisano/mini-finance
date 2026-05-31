# OpenCode Agent Instructions

This repository contains the "Mini Finance" static web application, built for the IntegrarTEC 2026 course.

## Tech Stack & Core Constraints
- **Pure Vanilla Web:** ONLY HTML5, CSS3 (with custom properties), and Vanilla JavaScript.
- **Strictly No Frameworks:** Do NOT use React, Vue, Tailwind, Bootstrap, or any UI libraries.
- **No Build Step:** There is no `package.json`, bundler, or build tool. Do not attempt to run `npm install` or `npm run dev`. Files are served directly to the browser.
- **Language:** The project is written in Spanish. Code (variables, functions, comments), documentation, and commit messages must be in Spanish.

## Architecture
- **State & Storage:** All dynamic data must be persisted using `localStorage` or `sessionStorage`.
- **UI Feedback:** All user feedback and alerts must be rendered directly in the DOM. Do NOT use `alert()`, `prompt()`, or `confirm()`.
- **Modularity:**
  - **JS:** Keep logic separated in `base/scripts/` (e.g., `state.js`, `dom.js`, `main.js`).
  - **CSS:** Keep styles separated in `base/styles/` (e.g., `tokens.css`, `layout.css`) and centralized via `main.css`.
- **Entry Points:** The main dashboard is `index.html`. Other views are located in the `pages/` directory (e.g., `pages/login.html`).
- **Pesito (Virtual Assistant):** A floating chat assistant (`pesito-brain.js`, `pesito-chat.js`, `pesito.css`) is included in all protected pages. It provides guided financial help via an interactive decision tree. Ensure any global DOM changes do not conflict with `#pesito-container` or `#pesito-toggle`.
- **External Libraries (CDN only):** Visualization libraries are allowed ONLY via CDN `<script>` tags (no npm, no build). Charts use **ApexCharts**. Market data comes from public APIs: CoinGecko (crypto), exchangerate-api.com (live forex), and FastForex `/time-series` (30-day forex history).
- **Secrets / API Keys:** A static site served to the browser CANNOT truly hide a key. API keys live in `base/scripts/env.js` (gitignored; committed template `env.example.js`) exposed as `window.MINI_FINANCE_ENV`. This keeps keys out of the repo, but they remain visible at runtime — never use a key that must stay secret.

## Further Context
- For specific course requirements and grading criteria, consult `.agents/skills/buenas-practica-mini-finance/SKILL.md`.
