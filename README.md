# 📝 TaskMate (مهامي) — Modern React & Material UI Todo Application

### A feature-rich, RTL-friendly task manager for Arabic-speaking users

TaskMate is a task management web application built with **React**, **Material UI (MUI)**, and the **Context API**. It provides a clean Arabic interface for creating, viewing, editing, completing, filtering, and deleting tasks. Task changes are stored locally in the browser.

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

**TaskMate** is designed for Arabic-speaking users who want a simple way to organize everyday tasks. The interface supports **right-to-left (RTL)** layout and uses the locally bundled **Alexandria** font.

The application keeps its task list in React state and shares it with child components through the **Context API**. Task changes are saved in the browser's `localStorage` and restored when the app starts.

> **Storage note:** Tasks are stored only in the current browser's local storage. The project does not include a backend, user accounts, or cross-device synchronization. Clearing site data or switching browsers/devices will not transfer saved tasks.

## 🚀 Key Features

### 1. Complete Task Management

- **Create:** Add a task with a non-empty title. The Add button stays disabled until the title contains non-whitespace text. New tasks start with empty details and an incomplete status.

- **Read:** View each task's title, details, and completion status.

- **Update:** Edit a task's title and details in a dialog.

- **Toggle status:** Mark a task complete or incomplete, with visual styling for completed tasks.

- **Delete:** Confirm before permanently removing a task.

### 2. Smart Filtering

Filter tasks by **All (الكل)**, **Completed (المنجز)**, or **Incomplete (غير المنجز)**. The filtered lists are derived from the shared task array rather than stored as separate state.

### 3. Local Data Persistence

The application reads any saved task list from `localStorage` at startup. Adding, editing, completing, or deleting a task updates the saved list. If no task list has been saved, the application displays the sample tasks defined in `App.jsx`.

### 4. UI and RTL Support

- Arabic labels and right-to-left layout.

- Alexandria regular and bold font files included with the project.

- Material UI theme configuration and components.

- Scrollable task area within a card layout capped at `80vh`.

- Grid-based task layout and action buttons for task completion, editing, and deletion.

### 5. Toast Notifications

Success notifications appear after adding, editing, deleting, or completing a task. The notification is displayed at the bottom-left of the screen and closes automatically after two seconds.

## 🧠 Architecture & State Management

The task array is created and managed in `App.jsx`. `TodosContext` makes both the array and its updater available to the task list and task-item components. `ToastContext` provides a notification function to those components, while `MySnackBar.jsx` displays the resulting message.

```
                         App.jsx
          (task state, toast state, and providers)
                  ┌──────┴──────┐
                  │             │
            TodosContext   ToastContext
                  │             │
             ┌────┴─────┐       │
             │          │       │
        TodoList.jsx  Todo.jsx  MySnackBar.jsx
        (filter/add) (task actions) (toast display)
```

- **Single source of truth:** The shared task array lives in `App.jsx`.

- **Shared notifications:** `ToastContext` makes the toast function available to components that handle task actions.

- **Derived filtering:** Completed and incomplete lists are calculated from the shared array.

- **Separation of concerns:** `TodoList.jsx` manages list controls and adding tasks; `Todo.jsx` renders an individual task and its actions. Each component has a dedicated CSS file.

## 🛠️ Tech Stack

The versions below are resolved versions recorded in `package-lock.json` at the time this README was updated. `package.json` may specify compatible version ranges rather than exact versions.

| Area | Technology | Version / Notes |
| --- | --- | --- |
| UI framework | React + React DOM | `19.3.0` |
| Component library | Material UI (`@mui/material`) | `9.5.0` |
| Icons | Material Icons (`@mui/icons-material`) | `9.5.0` |
| Layout | Material UI Grid | Uses the `size` prop |
| Routing | React Router DOM | `7.18.4`; no multiple app routes are currently defined |
| State management | React Context API | `useContext` |
| Persistence | Browser `localStorage` | Local to the current browser |
| Unique IDs | `uuid` | Version `14`, UUID v4 |
| Styling | CSS + Emotion | — |
| Build tool | Vite | `8.x` |

## 📁 Project Structure

```
taskmate-react-todo/
├── Alexandria/                 # Alexandria font directory
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── fonts/
│       ├── Alexandria-Bold.ttf
│       └── Alexandria-Regular.ttf
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── MySnackBar.jsx       # Toast notification display
│   │   ├── Todo.jsx            # Individual task card and dialogs
│   │   ├── Todo.css            # Task card styles
│   │   ├── TodoList.jsx        # Task list, filters, and add-task form
│   │   └── TodoList.css        # List and card styles
│   ├── Contexts/
│   │   ├── ToastContext.jsx     # Shared toast notification function
│   │   └── TempContext.jsx     # Shared task context
│   ├── App.jsx                 # Root component, theme, and task state
│   ├── App.css                 # Font setup and application layout
│   ├── index.css               # Global CSS reset
│   └── main.jsx                # React entry point
├── index.html                  # Vite HTML entry point
├── eslint.config.js
├── package.json
├── package-lock.json
└── vite.config.js
```

## ⚡ Getting Started

### Prerequisites

- **Node.js:** `20.19+` in the 20.x line, or `22.12+` in the 22.x line

- **npm**

Vite 8 requires these Node.js versions; Node.js 18 is not sufficient for this project.

Check the versions installed on your system:

```bash
node --version
npm --version
```

### 1. Clone the repository

```bash
git clone https://github.com/Ali-Tobar/taskmate-react-todo.git
cd taskmate-react-todo
```

### 2. Install dependencies

Use `npm ci` to install the versions recorded in the lockfile:

```bash
npm ci
```

### 3. Start the development server

```bash
npm run dev
```

Vite prints the development URL in the terminal. It is usually `http://localhost:5173`.

### 4. Build and preview for production

```bash
npm run build
npm run preview
```

## 🎓 Key Concepts Implemented

- **Controlled components:** Task title and edit fields are controlled by React state.

- **Input validation:** The Add button is disabled when the task title is empty or contains only whitespace.

- **Immutable state updates:** Task arrays are updated with methods such as `map` and `filter` rather than direct mutation.

- **Shared state:** `TodosContext` exposes the task array and updater to child components.

- **Context-based notifications:** `ToastContext` exposes the toast function; `MySnackBar.jsx` renders success messages after task actions.

- **Derived filtering:** The selected filter determines which tasks are rendered without maintaining duplicate filtered state.

- **Side effects:** `useEffect` reads saved tasks from browser storage when the task list mounts.

- **Persistence:** Task actions write the updated array to `localStorage`.

- **Dialog lifecycle:** Material UI dialogs manage task editing and delete confirmation.

## 🔮 Future Enhancements

- Task priorities (High, Medium, Low ).

- Due dates and calendar selection.

- Light and dark theme toggle.

- Optional backend synchronization for access across devices.

## 👨‍💻 Author

**Ali Mohamed Ali Tobar**

- **GitHub:** [@Ali-Tobar](https://github.com/Ali-Tobar)

- **LinkedIn:** [ali-tobar-dev](https://www.linkedin.com/in/ali-tobar-dev)

- **Repository:** [taskmate-react-todo](https://github.com/Ali-Tobar/taskmate-react-todo)