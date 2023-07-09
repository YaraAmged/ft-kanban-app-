import { MoreVert } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import AddNewTaskDialog from "../AddNewTaskDialog/AddNewTaskDialog";
import DeleteBoardDialog from "../DeleteBoardDialog/DeleteBoardDialog";

function BoardMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [deleteOpen, setdeleteOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectedBoard = useAppSelector(({ boards }) =>
    boards.boards.find((board) => board.id === boards.selectedBoard)
  );
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
      {updateOpen && (
        <AddNewTaskDialog
          //   oldTask={selectedBoard}
          open={updateOpen}
          handleClose={() => setUpdateOpen(false)}
        />
      )}
      <DeleteBoardDialog
        open={deleteOpen}
        handleClose={() => setdeleteOpen(false)}
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
            setdeleteOpen(true);
            handleClose();
          }}
        >
          Delete Task
        </MenuItem>
      </Menu>
    </div>
  );
}

export default BoardMenu;
