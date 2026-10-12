import { useState, useContext, useEffect } from "react";

import "./TodoList.css";

import { v4 as uuidv4 } from "uuid";

import { TodosContext } from "../Contexts/TempContext";
import { ToastContext } from "../Contexts/ToastContext";

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

import Todo from "./Todo";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const showToast = useContext(ToastContext);
  const [titleInput, setTitleInput] = useState("");

  // Remember which tasks the user wants to see
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Load saved tasks when the list opens
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  // Separate completed and incomplete tasks for filtering
  const completedTodos = todos.filter((t) => t.isCompleted);
  const nonCompletedTodos = todos.filter((t) => !t.isCompleted);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = nonCompletedTodos;
  }

  // Update the selected filter
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

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
    // Show a message after adding a task
    showToast("تمت إضافة المهمة بنجاح");
  }

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

          <div className="todos-container">{todosJSX}</div>

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
