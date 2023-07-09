import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { TaskI } from "../../features/columns/columnsSlice";
import TaskMenu from "../TaskMenu/TaskMenu";

interface TaskDetailsDialogProps {
  task: TaskI;
  open: boolean;
  handleClose(): void;
}
const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({
  task,
  open,
  handleClose,
}) => {
  const columns = useAppSelector(({ columns }) => columns.columns);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "480px" } }}
      fullWidth
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          gap={"24px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="L">{task.name}</Typography>
          <TaskMenu task={task} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack gap={"24px"}>
          <Typography variant="body1" color={"grayish.main"}>
            {task.desc}
          </Typography>
          <Stack gap={"8px"}>
            <Typography sx={{ color: "grayish.main" }} variant="body2">
              Current Status
            </Typography>
            <Select
              defaultValue={task.idList}
              sx={{ padding: 0 }}
              IconComponent={() => (
                <KeyboardArrowDown sx={{ color: "primary.main" }} />
              )}
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled className="placeholder-color">
                Choose Status
              </MenuItem>
              {columns.map((column) => (
                <MenuItem value={column.id}>{column.name}</MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default TaskDetailsDialog;
