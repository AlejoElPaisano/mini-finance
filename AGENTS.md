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

## Workflow & Git
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) in Spanish (e.g., `feat: agregar alerta de sobregiro`, `fix: corregir calculo de saldo`).
- **Branching:** Use `develop` as the primary working branch, keeping `main` for releases.
- **Verification:** There is no automated test suite. Verify logic by tracing DOM manipulation and state updates manually.

## Further Context
- For specific course requirements and grading criteria, consult `.agents/skills/buenas-practica-mini-finance/SKILL.md`.
