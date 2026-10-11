// React Core & Hooks Import
import  { useState } from 'react';

// External Libraries (Unique ID Generator)
import { v4 as uuidv4 } from 'uuid';

// Styles Import
import './App.css';

// Material UI Theming
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Context Import
import { TodosContext } from './Contexts/TempContext';

// Child Components
import TodoList from './Components/TodoList';

// 1. Initial Mock Todos Array
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

// Custom Theme with Typography & Primary Color Palette
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
  // Global State for Todos and updater function
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      {/* 3. Provide both the data (todos) and the updater (setTodos) to the whole tree */}
      <TodosContext.Provider value={{ todos, setTodos }}>
        <div className="App">
          <TodoList />
        </div>
      </TodosContext.Provider>
    </ThemeProvider>
  );
}