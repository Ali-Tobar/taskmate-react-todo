# 📝 TaskMate (مهامي) — Modern React & Material UI Todo Application

A feature-packed, RTL-compatible Task Management web application built with **React**, **Material UI (MUI v6)**, and **Context API**. The project focuses on clean architecture, modular component structure, and persistent storage synchronization.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & State Management](#-architecture--state-management)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Key Concepts Implemented](#-key-concepts-implemented)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🌟 Overview

**TaskMate** is designed to provide an intuitive task-tracking experience for Arabic (RTL) users. Rather than relying on simple state management or messy prop drilling, the application employs a centralized state architecture using React's **Context API**, alongside **Local Storage** persistence to prevent data loss across page reloads.

---

## 🚀 Key Features

### 1. Complete CRUD Operations

- **Create (Add Task):** Add new tasks with dynamic validation (submit button disabled until valid non-empty text is entered).
- **Read (List Tasks):** Dynamically render task lists with individual IDs generated via `uuidv4`.
- **Update (Edit & Status Toggle):**
  - **Status Toggle:** Toggle completion status with conditional styling (green indicator, strike-through task title).
  - **Content Edit:** Modal Dialog interface allowing real-time modification of task titles and descriptions.
- **Delete (Confirmation Dialog):** Safeguard against accidental data loss with an accessible confirmation dialog modal before permanent removal.

### 2. Smart Filtering (Derived State)

- Filter between **All (الكل)**, **Completed (المنجز)**, and **Non-Completed (غير المنجز)** without duplicating arrays or creating state synchronization bugs.
- Implements the **Single Source of Truth** design pattern.

### 3. Data Persistence

- Real-time synchronization between the React State and browser `localStorage`.
- Safe data retrieval on initial mounting using `useEffect` with zero infinite re-render loops.

### 4. UI/UX Refinements

- **Right-to-Left (RTL) Support:** Tailored typography using the modern `Alexandria` Arabic font.
- **Scroll Containment:** Responsive card layout capped at `80vh` with independent, smooth scrolling (`overflow-y: auto`).
- **Material UI Theming:** Centralized theme configuration via `ThemeProvider` and customized palette tokens.

---

## 🧠 Architecture & State Management

The project is structured around clean data flow principles to prevent **Prop Drilling**:

````text
               ┌────────────────────────┐
               │        App.jsx         │
               │ (Global State Source)  │
               └───────────┬────────────┘
                           │
                 [ TodosContext.Provider ]
                           │
               ┌───────────┴────────────┐
               │      TodoList.jsx      │ ──> useContext(TodosContext)
               │ (Filters, Add Input)   │
               └───────────┬────────────┘
                           │
               ┌───────────┴────────────┐
               │        Todo.jsx        │ ──> useContext(TodosContext)
               │ (Actions & Modals)     │
               └────────────────────────┘

* Single Source of Truth: Only one array (todos) lives in the global store. Filtering is computed dynamically on each render rather than stored redundantly.

* Separation of Concerns: Component structure (JSX) is completely isolated from visual rules (CSS), avoiding inline styling clutter.

## 🛠️ Tech Stack

- **Framework:** React.js (Functional Components, Hooks)
- **UI Library:** Material UI (MUI v6 / Grid v2 with `size` prop)
- **Icons:** Material Icons (`@mui/icons-material`)
- **State Management:** React Context API (`useContext`)
- **Lifecycle Management:** `useEffect` (for initial mount storage retrieval)
- **Data Persistence:** Web Storage API (`localStorage`)
- **Unique IDs:** `uuid` (UUIDv4)
- **Styling:** Custom Modular CSS with CSS Specificity
- **Bundler / Tooling:** Vite

## 📁 Project Structure

```text
taskmate-todo/
├── public/
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── Todo.jsx           # Single Todo Card, Modals & Item Actions
│   │   ├── Todo.css           # Item-level styles & conditional classes
│   │   ├── TodoList.jsx       # Card Shell, Filter Controls, Add Input
│   │   └── TodoList.css       # Layout container, Card & Filter styles
│   ├── Contexts/
│   │   └── TodosContext.jsx   # Shared Context definition
│   ├── App.jsx                # Root Component, ThemeProvider, Context Provider
│   ├── App.css                # Base layout & font-family styling
│   ├── main.jsx               # Application entry point
│   └── index.html             # Document root & Google Fonts integration
├── package.json
└── README.md
````

## ⚡ Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine (version 18+ recommended).

### Installation

Clone the repository:

```bash
git clone https://github.com/Ali-Tobar/taskmate-react-todo
cd taskmate-react-todo
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## 🎓 Key Concepts Implemented

- **Controlled Components:** Synchronizing form inputs directly with React State via `value` and `onChange`.
- **Immutable State Updates:** Using the Spread Operator (`...`) and non-mutating array methods (`map`, `filter`) rather than mutating operations (`push`, `splice`).
- **Side Effect Handling:** Isolating external storage read operations inside `useEffect(..., [])` to protect against execution loops.
- **MUI Dialog Lifecycle:** Localized UI state management for managing modal visibility (`open` / `onClose`).

## 🔮 Future Enhancements

- [ ] Task prioritization (High, Medium, Low flags).
- [ ] Due date assignment with interactive calendar pickers.
- [ ] Toast notification snackbars on successful task actions.
- [ ] Light / Dark mode toggle.

## 👨‍💻 Author

Ali Mohamed Ali Tobar

- **GitHub:** @[your-github-username](https://github.com/Ali-Tobar)
- **LinkedIn:** www.linkedin.com/in/ali-tobar-dev

```

```
