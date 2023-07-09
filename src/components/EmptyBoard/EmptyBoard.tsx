import { Button, Stack, Typography } from "@mui/material";

interface EmptyBoardProps {}
const EmptyBoard: React.FC<EmptyBoardProps> = () => {
  return (
    <Stack gap={"32px"} padding={"461px 325px"}>
      <Typography variant="L" sx={{ color: "#828FA3" }}>
        This board is empty. Create a new column to get started.
      </Typography>
      <Button>+ Add New Column</Button>
    </Stack>
  );
};
export default EmptyBoard;
