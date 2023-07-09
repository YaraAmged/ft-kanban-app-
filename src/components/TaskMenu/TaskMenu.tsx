import { MoreVert } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { TaskI } from "../../features/columns/columnsSlice";
import AddNewTaskDialog from "../AddNewTaskDialog/AddNewTaskDialog";
import DeleteTaskDialog from "../DeleteTaskDialog/DeleteTaskDialog";
interface TaskMenuProps {
  task: TaskI;
}
const TaskMenu: React.FC<TaskMenuProps> = ({ task }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        sx={{ padding: "16px" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>

      <AddNewTaskDialog
        oldTask={task}
        open={updateOpen}
        handleClose={() => setUpdateOpen(false)}
      />

      <DeleteTaskDialog
        open={deleteOpen}
        task={task}
        handleClose={() => {
          setDeleteOpen(false);
          handleClose();
        }}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          sx={{ color: theme.palette.grayish.main }}
          onClick={(e) => {
            setUpdateOpen(true);
            handleClose();
          }}
        >
          Edit Task
        </MenuItem>

        <MenuItem
          sx={{ color: theme.palette.error.main }}
          onClick={(e) => {
            setDeleteOpen(true);
            handleClose();
          }}
        >
          Delete Task
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TaskMenu;
