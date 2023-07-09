import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { deleteBoard } from "../../api/boards";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteBoardAction,
  setSelectedBoard,
} from "../../features/boards/boardsSlice";
interface DeleteBoardDialogProps {
  open: boolean;
  handleClose: () => void;
}
const DeleteBoardDialog: React.FC<DeleteBoardDialogProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const { selectedBoard: selectedBoardId, boards } = useAppSelector(
    ({ boards }) => boards
  );
  const selectedBoard = useMemo(
    () => boards.find((board) => board.id === selectedBoardId),
    [selectedBoardId, boards]
  );
  const handleDelete = async () => {
    setLoading(true);
    await deleteBoard(selectedBoardId!);
    dispatch(deleteBoardAction(selectedBoardId!));
    dispatch(setSelectedBoard(undefined));
    handleClose();

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
          Delete this board
        </Typography>{" "}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Stack gap={"24px"}>
          <DialogContentText variant="body1">
            Are you sure you want to delete the ‘{selectedBoard?.name}’ board?
            This action will remove all columns and tasks and cannot be
            reversed.
          </DialogContentText>
          <Stack direction={{ sm: "row" }} gap={"16px"} mb={"8px"}>
            <Button
              disabled={loading}
              onClick={handleDelete}
              sx={{ padding: "9px 79px" }}
              size="medium"
              color="error"
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
export default DeleteBoardDialog;
