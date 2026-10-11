// React Hooks Import
import { useState, useContext } from "react";

// Custom CSS Import
import "./Todo.css";

// Context Import
import { TodosContext } from "../Contexts/TempContext";

// Material UI Layout & Form Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Material UI Dialog Components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Material UI Action Icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Todo({ todo }) {
  // Consume global state and updater function from Context
  const { todos, setTodos } = useContext(TodosContext);

  // 1. Local State: Visibility of Delete Dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 2. Local State: Visibility of Update Dialog
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // 3. Local State: Holding Temporary Form Values for Editing
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // =========================================================================
  // Event Handlers
  // =========================================================================

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateClick() {
    setUpdatedTodo({
      title: todo.title,
      details: todo.details,
    });
    setShowUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  // A. Toggle Task Completion
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    // Sync with localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // B. Confirm Delete Action
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);

    setTodos(updatedTodos);
    // Sync with localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // C. Confirm Update Action
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    // Sync with localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setShowUpdateDialog(false);
  }

  return (
    <>
      {/* ================================================================
          1. Delete Confirmation Dialog
          ================================================================ */}
      <Dialog
        dir="rtl"
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          هل أنت متأكد من حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            لا يمكنك التراجع عن الحذف بعد إتمامه.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus color="error">
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================================================================
          2. Edit / Update Todo Dialog
          ================================================================ */}
      <Dialog
        dir="rtl"
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="update-dialog-title"
      >
        <DialogTitle id="update-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
          {/* Title Input */}
          <TextField
            autoFocus
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />

          {/* Details Input */}
          <TextField
            margin="dense"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>إلغاء</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================================================================
          3. Single Todo Item Card
          ================================================================ */}
      <Card className="todo-card-item">
        <CardContent>
          <Grid container spacing={2}>
            {/* Content Column (8 Columns out of 12) */}
            <Grid size={8} className="todo-content-col">
              {/* Task Title Typography with Conditional Strikethrough */}
              <Typography
                variant="h5"
                className={`todo-title-text ${todo.isCompleted ? "completed" : ""}`}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" className="todo-details-text">
                {todo.details}
              </Typography>
            </Grid>

            {/* Actions Column (4 Columns out of 12) */}
            <Grid size={4} className="todo-actions-col">
              {/* Check / Complete Button */}
              <IconButton
                className={`action-icon-btn check-btn ${todo.isCompleted ? "completed" : ""}`}
                aria-label="mark as completed"
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>

              {/* Edit Button (Triggers Edit Dialog) */}
              <IconButton
                className="action-icon-btn edit-btn"
                aria-label="edit task"
                onClick={handleUpdateClick}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              {/* Delete Button (Triggers Delete Dialog) */}
              <IconButton
                className="action-icon-btn delete-btn"
                aria-label="delete task"
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
