import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { CardI } from "../../features/columns/columnsSlice";

interface TaskProps {
  card: CardI;
}
const Task: React.FC<TaskProps> = ({ card }) => {
  return (
    <Card sx={{ boxShadow: "0px 4px 6px 0px rgba(54, 78, 126, 0.10)" }}>
      <CardContent sx={{ padding: 0, "&:last-child": { padding: 0 } }}>
        <Typography variant="M">{card.name}</Typography>
        <Typography variant="body2">0 of 3 subtasks</Typography>
      </CardContent>
    </Card>
  );
};
export default Task;
