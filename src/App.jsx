import { useEffect, useReducer, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { TodosContext } from './Contexts/TempContext';
import { ToastContext } from './Contexts/ToastContext';
import todosReducer from './Reducers/TodosReducer';

import TodoList from './Components/TodoList';

import MySnackBar from "./Components/MySnackBar";

// Sample tasks shown when there are no saved tasks
const initialTodos = [
  {
    id: uuidv4(),
    title: 'قراءة كتاب',
    details: 'قراءة الفصل الأول والثاني بتركيز وتدوين الملاحظات',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'مذاكرة React',
    details: 'تطبيق درس الـ List Rendering و Props عملياً',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'حل مسائل Codewars',
    details: 'حل مسألتين في خوارزميات المصفوفات',
    isCompleted: false,
  },
];

// Set the app font and main color
const theme = createTheme({
  typography: {
    fontFamily: ['Alexandria', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#b23c17', // Primary Brand Color (e.g., Deep Amber / Orange / Blue)
    },
  },
});

// Load saved tasks, or use the default tasks on the first run.
function getInitialTodos() {
  const savedTodos = JSON.parse(localStorage.getItem('todos'));
  return savedTodos || initialTodos;
}

export default function App() {
  // useReducer manages the task list, and dispatch sends actions to it.
  const [todos, dispatch] = useReducer(todosReducer, initialTodos, getInitialTodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Save the tasks whenever the list changes.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function showHideToast(msg) {
    setMessage(msg);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={showHideToast}>
        <MySnackBar open={open} message={message} />
        {/* Share the task list and dispatch with the components. */}
        <TodosContext.Provider value={{ todos, dispatch }}>
          <div className="App">
            <TodoList />
          </div>
        </TodosContext.Provider>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}