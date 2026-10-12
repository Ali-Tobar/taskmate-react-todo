import  { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { TodosContext } from './Contexts/TempContext';
import { ToastContext } from './Contexts/ToastContext';

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

export default function App() {
  // Keep the task list and toast message in shared state
  const [todos, setTodos] = useState(initialTodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
        {/* Share the task list with the task components */}
        <TodosContext.Provider value={{ todos, setTodos }}>
          <div className="App">
            <TodoList />
          </div>
        </TodosContext.Provider>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}