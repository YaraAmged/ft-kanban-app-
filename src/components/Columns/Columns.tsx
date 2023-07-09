import { Circle } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListSubheader,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import AddBoardDialog from "../AddBoardDialog/AddBoardDialog";
import Task from "../Task/Task";
import EmptyBoard from "../EmptyBoard/EmptyBoard";
const ColorMap: any = {
  "To Do": "#49C4E5",
  Doing: "#8471F2",
  Done: "#67E2AE",
};
interface ColumnProps {}
const Columns: React.FC<ColumnProps> = () => {
  const columns = useAppSelector(({ columns }) => columns.columns);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const column = useAppSelector(({ columns }) => columns.columns);
  const theme = useTheme();
  const selectedBoard = useAppSelector(({ boards }) =>
    boards.boards.find((board) => board.id === boards.selectedBoard)
  );
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (columns.length === 0) {
    <EmptyBoard />;
  }
  return (
    <>
      {updateOpen && (
        <AddBoardDialog
          oldBoard={selectedBoard}
          open={updateOpen}
          handleClose={() => setUpdateOpen(false)}
        />
      )}

      <Stack direction={"row"}>
        {column.map((column) => (
          <List>
            <ListSubheader sx={{ pb: "24px", background: "none" }}>
              <Stack direction={"row"} gap={"12px"}>
                <Circle
                  sx={{
                    color: ColorMap[column.name] || "pink",
                    width: "15px",
                    height: "15px",
                  }}
                />
                <Typography sx={{ textTransform: "uppercase" }} variant="S">
                  {column.name} ({column.cards.length})
                </Typography>
              </Stack>
            </ListSubheader>
            {column.cards.map((card) => (
              <ListItem>
                <Task card={card} />
              </ListItem>
            ))}
          </List>
        ))}
        <Stack
          onClick={(e) => {
            setUpdateOpen(true);
            handleClose();
          }}
          sx={{
            backgroundColor:
              theme.palette.mode === "light" ? "#eaeffa" : "#23242e",
            color: theme.palette.grayish.main,
          }}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"392px 55.5px"}
        >
          <Typography variant="XL"> + New Column</Typography>
        </Stack>
      </Stack>
    </>
  );
};
export default Columns;
