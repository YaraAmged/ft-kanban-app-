import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { TaskI } from "../../features/columns/columnsSlice";
import TaskDetailsDialog from "../TaskDetailsDialog/TaskDetailsDialog";

interface TaskProps {
  task: TaskI;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  return (
    <>
      <Card
        onClick={() => setDetailsDialogOpen(true)}
        sx={{
          borderRadius: "8px",
          width: "100%",
          boxShadow: "0px 4px 6px 0px rgba(54, 78, 126, 0.10)",
          cursor: "pointer",
        }}
      >
        <CardContent sx={{ padding: 0, "&:last-child": { padding: 0 } }}>
          <Typography variant="M">{task.name}</Typography>
          <Typography variant="body2" color="grayish.main">
            0 of 3 subtasks
          </Typography>
        </CardContent>
      </Card>
      <TaskDetailsDialog
        open={detailsDialogOpen}
        task={task}
        handleClose={() => setDetailsDialogOpen(false)}
      />
    </>
  );
};
export default Task;
