// React Core & Hooks Import
import { useState, useContext, useEffect } from "react";

// Custom CSS Import
import "./TodoList.css";

// External Libraries
import { v4 as uuidv4 } from "uuid";

// Context Import
import { TodosContext } from "../Contexts/TempContext";

// Material UI Components
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Child Components
import Todo from "./Todo";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");

  // 1. State for managing the active filter button type ('all' | 'completed' | 'non-completed')
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // =========================================================================
  // Lifecycle: Retrieve stored todos on initial mount
  // =========================================================================
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  // =========================================================================
  // Computed Arrays (Derived State - No storage or setState needed)
  // =========================================================================
  const completedTodos = todos.filter((t) => t.isCompleted);
  const nonCompletedTodos = todos.filter((t) => !t.isCompleted);

  // Determine which array to render based on the active filter state
  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = nonCompletedTodos;
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  // Change filter type when user clicks on a ToggleButton
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // Adding a new Todo
  function handleAddClick() {
    if (titleInput.trim() === "") return;

    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  // Dynamic JSX generation from the computed array
  const todosJSX = todosToBeRendered.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  return (
    <Container maxWidth="sm">
      <Card className="todo-card">
        <CardContent>
          <Typography variant="h2" className="todo-title">
            مهامي
          </Typography>

          <Divider />

          {/* ================================================================
              Filter Controls (Controlled ToggleButtonGroup)
              ================================================================ */}
          {/* Filter Controls with Primary Theme Color */}
          <ToggleButtonGroup
            exclusive
            color="primary"
            aria-label="filter tasks"
            className="filter-buttons-group"
            value={displayedTodosType}
            onChange={changeDisplayedType}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {/* Dynamic Render of Filtered Todos */}
          <div className="todos-container">{todosJSX}</div>

          {/* Input + Add Button Section */}
          <Grid container spacing={2} className="add-todo-grid-container">
            <Grid size={8}>
              <TextField
                fullWidth
                className="add-todo-input"
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>

            {/* Submit Button (Disabled when input is empty) */}
            <Grid size={4}>
              <Button
                variant="contained"
                className="add-todo-btn"
                onClick={handleAddClick}
                disabled={titleInput.trim().length === 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
