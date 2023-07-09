import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { deleteTask } from "../../api/tasks";
import { useAppDispatch } from "../../app/hooks";
import { TaskI, removeTaskAction } from "../../features/columns/columnsSlice";
interface DeleteTaskDialogProps {
  open: boolean;
  handleClose: () => void;
  task: TaskI;
}
const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  open,
  handleClose,
  task,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(task.id);
    dispatch(removeTaskAction(task));
    setLoading(false);
  };
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
            Are you sure you want to delete the ‘{task.name}’ task and its
            subtasks? This action cannot be reversed.
          </DialogContentText>
          <Stack direction={{ sm: "row" }} gap={"16px"} mb={"8px"}>
            <Button
              sx={{ padding: "9px 79px" }}
              size="medium"
              color="error"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </Button>
            <Button
              onClick={handleClose}
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
