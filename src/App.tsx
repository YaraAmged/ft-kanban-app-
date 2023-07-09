import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { getBoards } from "./api/boards";
import Columns from "./components/Columns/Columns";
import SideBar from "./components/SideBar/SideBar";
import { darkTheme, lightTheme } from "./theme";
function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    getBoards();
  }, []);
  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <SideBar setMode={setMode}>
        <Columns />
      </SideBar>
    </ThemeProvider>
  );
}

export default App;
