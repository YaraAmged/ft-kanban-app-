import { ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getBoards } from "./api/boards";
import SideBar from "./components/SideBar/SideBar";
import Task from "./components/Task/Task";
import { darkTheme, lightTheme } from "./theme";
import Columns from "./components/Columns/Columns";
function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [deleteOpenDialog, setDeleteOpenDialog] = React.useState(true);

  useEffect(() => {
    getBoards();
  }, []);
  return (
    <>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <SideBar setMode={setMode}>
          <Columns />
        </SideBar>
        {/* <AddNewTaskDialog
          open={deleteOpenDialog}
          handleClose={() => setDeleteOpenDialog(false)}
        /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
