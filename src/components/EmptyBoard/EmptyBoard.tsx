import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import AddBoardDialog from "../AddBoardDialog/AddBoardDialog";

interface EmptyBoardProps {}
const EmptyBoard: React.FC<EmptyBoardProps> = () => {
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const selectedBoard = useAppSelector(({ boards }) =>
    boards.boards.find((board) => board.id === boards.selectedBoard)
  );

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
        gap={"32px"}
        my={"auto"}
        height={"calc(100vh - 121px)"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="L" sx={{ color: "#828FA3" }}>
          This board is empty. Create a new column to get started.
        </Typography>
        <Button onClick={(e) => setUpdateOpen(true)}>+ Add New Column</Button>
      </Stack>
    </>
  );
};
export default EmptyBoard;
