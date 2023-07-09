import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
interface DeleteTaskDialogProps {
  open: boolean;
  handleClose: () => void;
}
const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { maxWidth: "400px", padding: "32px" } }}
      fullWidth
    >
      <DialogTitle sx={{ p: 0, mb: "24px" }}>
        <Typography color="error" variant="L">
          Delete this Task
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Stack gap={"24px"}>
          <DialogContentText variant="body1">
            Are you sure you want to delete the ‘Build settings UI’ task and its
            subtasks? This action cannot be reversed.
          </DialogContentText>
          <Stack direction={"row"} gap={"16px"} mb={"8px"}>
            <Button sx={{ padding: "9px 79px" }} size="medium" color="error">
              Delete
            </Button>
            <Button
              sx={{ padding: "9px 79px" }}
              size="medium"
              color="secondary"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteTaskDialog;
