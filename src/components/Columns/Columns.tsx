import { Circle } from "@mui/icons-material";
import {
  CircularProgress,
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
import EmptyBoard from "../EmptyBoard/EmptyBoard";
import Task from "../Task/Task";
const ColorMap: any = {
  "To Do": "#49C4E5",
  Doing: "#8471F2",
  Done: "#67E2AE",
};
interface ColumnProps {}
const Columns: React.FC<ColumnProps> = () => {
  const { columns, loading } = useAppSelector(({ columns }) => columns);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const column = useAppSelector(({ columns }) => columns.columns);
  const theme = useTheme();
  const selectedBoard = useAppSelector(({ boards }) =>
    boards.boards.find((board) => board.id === boards.selectedBoard)
  );
  if (!selectedBoard) return null;
  if (loading)
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        height={"calc(100vh - 121px)"}
        width={"100%"}
      >
        <CircularProgress size={50} sx={{ margin: "auto" }} />
      </Stack>
    );
  if (columns.length === 0) {
    return <EmptyBoard />;
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

      <Stack
        direction={"row"}
        height={"100%"}
        width={"max-content"}
        gap={"24px"}
      >
        {column.map((column) => (
          <List sx={{ width: "280px" }} data-testid="column-card">
            <ListSubheader sx={{ px: 0, pb: "24px", background: "none" }}>
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
              <ListItem sx={{ width: "100%", p: 0 }}>
                <Task task={card} />
              </ListItem>
            ))}
          </List>
        ))}
        <Stack
          onClick={() => setUpdateOpen(true)}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: theme.palette.primary.main,
            },
            backgroundColor:
              theme.palette.mode === "light" ? "#eaeffa" : "#23242e",
            color: theme.palette.grayish.main,
            width: "280px",
            height: "100%",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="XL"> + New Column</Typography>
        </Stack>
      </Stack>
    </>
  );
};
export default Columns;
