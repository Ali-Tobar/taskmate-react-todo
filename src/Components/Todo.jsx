import { useState, useContext } from "react";

import "./Todo.css";

import { TodosContext } from "../Contexts/TempContext";
import { ToastContext } from "../Contexts/ToastContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Todo({ todo }) {
  const { dispatch } = useContext(TodosContext);
  const showToast = useContext(ToastContext);

  // Control whether the delete dialog is open
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Control whether the edit dialog is open
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // Keep the edited values before saving
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

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

  // Mark the task as complete or incomplete
  function handleCheckClick() {
    // Send an action to the reducer to toggle the task's completion status.
    dispatch({
      type: "toggled",
      payload: {
        id: todo.id,
      },
    });
    showToast(todo.isCompleted ? "تم إلغاء إنجاز المهمة" : "تم إنجاز المهمة");
  }

  // Delete the task and save the updated list
  function handleDeleteConfirm() {
    // Send an action to the reducer to delete the task.
    dispatch({
      type: "deleted",
      payload: {
        id: todo.id,
      },
    });
    setShowDeleteDialog(false);
    showToast("تم حذف المهمة بنجاح");
  }

  // Save the edited task
  function handleUpdateConfirm() {
    // Send the changes to the reducer to update the task.
    dispatch({
      type: "edited",
      payload: {
        id: todo.id,
        title: updatedTodo.title,
        details: updatedTodo.details,
      },
    });
    setShowUpdateDialog(false);
    showToast("تم تعديل المهمة بنجاح");
  }

  return (
    <>
      {/* Ask before deleting the task */}
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

      {/* Edit the task details */}
      <Dialog
        dir="rtl"
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="update-dialog-title"
      >
        <DialogTitle id="update-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
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

      {/* Show the task and its actions */}
      <Card className="todo-card-item">
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8} className="todo-content-col">
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

            <Grid size={4} className="todo-actions-col">
              <IconButton
                className={`action-icon-btn check-btn ${todo.isCompleted ? "completed" : ""}`}
                aria-label="mark as completed"
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="action-icon-btn edit-btn"
                aria-label="edit task"
                onClick={handleUpdateClick}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

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
