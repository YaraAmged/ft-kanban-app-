import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ReactComponent as XIcon } from "../../icons/X.svg";

import { createBoard, updateBoardAPI } from "../../api/boards";
import {
  Board,
  addBoard,
  updateBoard,
} from "../../features/boards/boardsSlice";
import { setColumns as setColumnsAction } from "../../features/columns/columnsSlice";
interface AddBoardDialogProps {
  oldBoard?: Board;
  open: boolean;
  handleClose: () => void;
}
const AddBoardDialog: React.FC<AddBoardDialogProps> = ({
  oldBoard,
  open,
  handleClose,
}) => {
  const theme = useTheme();
  const selectedBoardColumns = useAppSelector(({ columns }) => columns.columns);

  const selectedBoardIndex = useAppSelector(({ boards }) =>
    boards.boards.findIndex((b) => b.id === boards.selectedBoard)
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { register, control, formState, handleSubmit, reset } = useForm({
    defaultValues: oldBoard
      ? { ...oldBoard, columns: selectedBoardColumns }
      : { columns: [] },
  });

  useEffect(() => {
    reset();
  }, [open]);
  const {
    fields: columns,
    append,
    remove,
  } = useFieldArray({ control: control as any, name: "columns" });

  const handleSave = handleSubmit(async (data: any) => {
    setLoading(true);
    const columns = data.columns.map((col: any) => col.name);
    if (oldBoard) {
      const board = await updateBoardAPI(
        { id: oldBoard.id, columns: selectedBoardColumns },
        { name: data.name, columns }
      );
      dispatch(updateBoard({ board, index: selectedBoardIndex }));
      dispatch(setColumnsAction(board.columns));
    } else {
      const board = await createBoard({ name: data.name, columns });
      dispatch(addBoard(board));

      dispatch(setColumnsAction(board.columns));
    }
    setLoading(false);
    handleClose();
  });
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { maxWidth: "480px", padding: "32px" } }}
      fullWidth
    >
      <DialogTitle sx={{ p: 0, mb: "24px" }}>
        <Typography variant="L">
          {oldBoard ? "Edit Board" : "Add New Board"}
        </Typography>{" "}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Stack gap={"24px"}>
          <Stack gap={"8px"}>
            <Typography
              sx={{ color: theme.palette.grayish.main }}
              variant="body2"
            >
              {oldBoard ? "Board Name" : "Name"}
            </Typography>
            <TextField
              {...register("name", { required: true })}
              placeholder="e.g. Web Design"
            ></TextField>
          </Stack>
          <Stack gap={"8px"}>
            <Typography
              sx={{ color: theme.palette.grayish.main }}
              variant="body2"
            >
              {oldBoard ? "Board Columns" : "Columns"}
            </Typography>
            <Stack gap={"12px"}>
              {columns.map((col, i) => (
                <Stack
                  direction={"row"}
                  gap="16px"
                  alignItems={"center"}
                  key={col.id}
                >
                  <TextField
                    fullWidth
                    placeholder="Doing"
                    {...register(`columns.${i}.name`)}
                  />
                  <IconButton sx={{ p: 0 }} onClick={() => remove(i)}>
                    <XIcon />
                  </IconButton>
                </Stack>
              ))}
              <Button
                size="medium"
                color="secondary"
                onClick={() => append({ name: "" })}
              >
                + Add New Column
              </Button>
            </Stack>
          </Stack>
          <Button size="medium" disabled={loading} onClick={handleSave}>
            {oldBoard ? "Save Changes" : "Create New Board"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default AddBoardDialog;
