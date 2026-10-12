import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ open, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      // Position the message at the bottom left of the screen
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}