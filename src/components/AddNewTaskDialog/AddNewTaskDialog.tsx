import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { createTask, updateTask } from "../../api/tasks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  CardI,
  createTaskAction,
  updateTaskAction,
} from "../../features/columns/columnsSlice";
import { ReactComponent as XIcon } from "../../icons/X.svg";

interface AddNewTaskDialogProps {
  open: boolean;
  handleClose: () => void;
  card?: CardI;
  oldTask?: CardI;
}
const AddNewTaskDialog: React.FC<AddNewTaskDialogProps> = ({
  card,
  oldTask,
  open,
  handleClose,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const columnsFromStore = useAppSelector(({ columns }) => columns.columns);
  const { register, handleSubmit, formState, control, reset } = useForm<CardI>({
    defaultValues: oldTask,
  });
  const {
    fields: subTasks,
    append,
    remove,
  } = useFieldArray({ control: control as any, name: "subTasks" });
  const [loading, setLoading] = useState(false);

  const handleSave = handleSubmit(async (data) => {
    setLoading(true);

    if (oldTask) {
      const task = await updateTask(oldTask.id, data);

      dispatch(updateTaskAction({ id: oldTask.id, card: data }));
    } else {
      const task = await createTask(data);
      dispatch(createTaskAction(task));
    }
    setLoading(false);
    handleClose();
  });
  useEffect(() => {
    reset();
  }, [open]);
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: { maxWidth: "480px", padding: "32px" },
      }}
      fullWidth
    >
      <form onSubmit={handleSave}>
        <DialogTitle sx={{ p: 0, mb: "24px" }}>
          <Typography variant="L">Add New Task</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Stack gap={"24px"}>
            <Stack gap={"8px"}>
              <Typography
                sx={{ color: theme.palette.grayish.main }}
                variant="body2"
              >
                Name
              </Typography>
              <TextField
                {...register("name", { required: true })}
                placeholder="e.g. Take coffee break"
              ></TextField>
            </Stack>
            <Stack gap={"8px"}>
              <Typography
                sx={{ color: theme.palette.grayish.main }}
                variant="body2"
              >
                Description
              </Typography>
              <TextField
                multiline
                rows={5}
                placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
              ></TextField>
            </Stack>
            <Stack gap={"8px"}>
              <Typography
                sx={{ color: theme.palette.grayish.main }}
                variant="body2"
              >
                Subtasks
              </Typography>
              <Stack gap={"12px"}>
                {subTasks.map((col, i) => (
                  <Stack direction={"row"} gap="16px" alignItems={"center"}>
                    <TextField
                      fullWidth
                      placeholder="e.g. Web Design"
                      value={col}
                    />
                    <IconButton sx={{ p: 0 }} onClick={() => remove(i)}>
                      <XIcon />
                    </IconButton>
                  </Stack>
                ))}
                <Button
                  size="medium"
                  color="secondary"
                  onClick={() => append("")}
                >
                  + Add New Subtask
                </Button>
              </Stack>
            </Stack>

            <Stack gap={"8px"}>
              <Typography
                sx={{ color: theme.palette.grayish.main }}
                variant="body2"
              >
                Status
              </Typography>
              <Select
                {...register("idList", { required: true })}
                sx={{ padding: 0 }}
                IconComponent={() => (
                  <KeyboardArrowDown
                    sx={{ color: theme.palette.primary.main }}
                  />
                )}
                variant="outlined"
              >
                <MenuItem value="" disabled className="placeholder-color">
                  Choose Status
                </MenuItem>
                {columnsFromStore.map((column) => (
                  <MenuItem value={column.id}>{column.name}</MenuItem>
                ))}
              </Select>
            </Stack>
            <Button onClick={handleSave} size="medium" type="submit">
              Create Task
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default AddNewTaskDialog;
