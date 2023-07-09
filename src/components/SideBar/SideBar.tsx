import { Add, KeyboardArrowDown } from "@mui/icons-material";
import {
  AppBarProps,
  Backdrop,
  ClickAwayListener,
  Divider,
  Hidden,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Switch,
  ThemeProvider,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Theme, styled } from "@mui/material/styles";
import * as React from "react";
import { getBoards } from "../../api/boards";
import { getColumns } from "../../api/columns";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setBoards, setSelectedBoard } from "../../features/boards/boardsSlice";
import {
  setColumnLoading,
  setColumns,
} from "../../features/columns/columnsSlice";
import { ReactComponent as SunIcon } from "../../icons/SunIcon.svg";
import { ReactComponent as EyeSlashIcon } from "../../icons/eye-slash.1.svg";
import { ReactComponent as EyeIcon } from "../../icons/eye.svg";
import { ReactComponent as LayoutIcon } from "../../icons/layout.svg";
import { ReactComponent as MoonIcon } from "../../icons/moonIcon.svg";
import { lightTheme } from "../../theme";
import AddBoardDialog from "../AddBoardDialog/AddBoardDialog";
import AddNewTaskDialog from "../AddNewTaskDialog/AddNewTaskDialog";
import BoardMenu from "../BoardMenu/BoardMenu";

interface SideBarProps extends React.PropsWithChildren {
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const drawerWidth = 300;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean; isMobile: boolean }>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  paddingTop: "121px",
  paddingLeft: "24px",
  paddingRight: "24px",
  minHeight: "100vh",
  maxWidth: "100%",
  overflow: "scroll",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? 0 : `-${drawerWidth}px`,
  ...(open &&
    !isMobile && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
}));

const AppBar = styled<
  React.FC<AppBarProps & { open: boolean; isMobile: boolean }>
>(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isMobile }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !isMobile && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const SideBar: React.FC<SideBarProps> = ({ setMode, children }) => {
  const [open, setOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openTaskDialog, setOpenTaskDialog] = React.useState(false);
  const theme = useTheme();
  const boards = useAppSelector(({ boards }) => boards.boards);
  const selectedBoardId = useAppSelector(({ boards }) => boards.selectedBoard);
  const dispatch = useAppDispatch();

  const columns = useAppSelector(({ columns }) => columns.columns);

  const getAllColumns = async () => {
    if (!selectedBoardId) return;
    dispatch(setColumnLoading(true));
    const columns = await getColumns(selectedBoardId);
    dispatch(setColumns(columns));
  };
  const getAllBoards = async () => {
    const boards = await getBoards();
    dispatch(setBoards(boards));
  };
  React.useEffect(() => {
    getAllBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (selectedBoardId) getAllColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBoardId]);

  const selectedBoard = React.useMemo(
    () => boards.find((board) => board.id === selectedBoardId),
    [selectedBoardId, boards]
  );
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);
  const DrawerContent = (
    <>
      <Hidden smDown>
        <Box textAlign={"center"} sx={{ pl: "32px", mt: "32px" }}>
          <Stack direction={"row"} gap={"16px"}>
            <img
              src={process.env.PUBLIC_URL + "/images/logo.svg"}
              alt="logo"
            ></img>
            <Typography variant="XL">Kanban</Typography>
          </Stack>
        </Box>
      </Hidden>
      <Stack>
        <Stack mt={{ sm: "54px", xs: 0 }}>
          <List
            subheader={
              <ListSubheader
                component="div"
                sx={{ background: "none", padding: 0, pl: "32px" }}
              >
                <Typography
                  variant="S"
                  sx={{ color: theme.palette.grayish.main }}
                >
                  ALL BOARDS ({boards.length})
                </Typography>
              </ListSubheader>
            }
          >
            {boards.map((board) => (
              <ListItemButton
                data-testid="board-button"
                key={board.id}
                selected={selectedBoardId === board.id}
                onClick={() => dispatch(setSelectedBoard(board.id))}
              >
                <ListItemIcon>
                  <LayoutIcon fill="currentcolor" />
                </ListItemIcon>
                <ListItemText
                  primary={board.name}
                  primaryTypographyProps={{ variant: "M" }}
                />
              </ListItemButton>
            ))}

            <ListItemButton
              sx={{ color: theme.palette.primary.main }}
              onClick={() => setOpenDialog(true)}
            >
              <ListItemIcon>
                <LayoutIcon fill="currentcolor" />
              </ListItemIcon>
              <ListItemText
                primary="+ Create New Board"
                primaryTypographyProps={{ variant: "M" }}
              />
            </ListItemButton>
          </List>
        </Stack>
      </Stack>

      <AddBoardDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      <Stack sx={{ marginTop: "auto", mb: "32px" }} gap={"8px"}>
        <Stack
          padding={"14px 0px"}
          justifyContent={"center"}
          direction="row"
          spacing={"20px"}
          alignItems="center"
          sx={{
            margin: "0px 24px",
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: "8px",
          }}
          width={{ sm: "251px", xs: "auto" }}
        >
          <SunIcon />
          <ThemeProvider theme={lightTheme}>
            <Switch
              checked={theme.palette.mode === "dark"}
              onChange={(e) => setMode(e.target.checked ? "dark" : "light")}
              sx={(theme) => ({
                width: 40,
                height: 20,
                p: 0,
                "& .MuiSwitch-track": {
                  backgroundColor: theme.palette.primary.main,
                  opacity: "1 !important",
                  borderRadius: 12,
                },
                "& .MuiSwitch-thumb": {
                  width: 14,
                  height: 14,
                  transform: "translate(-4px,-6px)",
                  background: "#fff",
                },
                "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                  transform: "translate(-8px,-6px)",
                },
                "&:hover": {
                  "& .MuiSwitch-track": {
                    background: theme.palette.primary.light,
                  },
                },
              })}
            />
          </ThemeProvider>
          <MoonIcon />
        </Stack>
        <Hidden smDown>
          <ListItemButton onClick={() => setOpen(false)}>
            <ListItemIcon>
              <EyeSlashIcon />
            </ListItemIcon>
            <ListItemText
              primary="Hide Sidebar"
              primaryTypographyProps={{ variant: "M" }}
            />
          </ListItemButton>
        </Hidden>
      </Stack>
    </>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        isMobile={isMobile}
        position="fixed"
        open={open}
        sx={{
          boxShadow: "none",
          borderBottom: `solid 1px ${theme.palette.lines.main} `,
        }}
        color="default"
      >
        <Toolbar
          sx={{
            height: { sm: 96, xs: 70 },
            background: theme.palette.background.paper,
          }}
        >
          <Stack
            direction={"row"}
            gap={2}
            justifyContent={"space-between"}
            width={"100%"}
            height={"100%"}
          >
            <Stack direction={"row"} alignItems={"center"} gap={"32px"}>
              <Stack direction={"row"} px={1} gap={"16px"}>
                {(!open || isMobile) && (
                  <img
                    src={process.env.PUBLIC_URL + "/images/logo.svg"}
                    alt="logo"
                  ></img>
                )}
                {!open && (
                  <Hidden smDown>
                    <Typography variant="XL">Kanban</Typography>
                  </Hidden>
                )}
              </Stack>
              {!open && (
                <Hidden smDown>
                  <Divider
                    sx={{ backgroundColor: theme.palette.grayish.light }}
                    orientation="vertical"
                  />
                </Hidden>
              )}

              <Stack
                direction={"row"}
                gap={"8px"}
                alignItems={"center"}
                onClick={isMobile ? () => setOpen(true) : undefined}
              >
                <Typography variant="XL">{selectedBoard?.name}</Typography>
                <Hidden smUp>
                  <Icon color="primary">
                    <KeyboardArrowDown />
                  </Icon>
                </Hidden>
              </Stack>
            </Stack>
            {selectedBoardId && (
              <Stack direction={"row"} alignItems={"center"} gap={"24px"}>
                <Button
                  disabled={columns.length === 0}
                  onClick={() => setOpenTaskDialog(true)}
                >
                  <Hidden smDown>+ Add New Task</Hidden>
                  <Hidden smUp>
                    <Add sx={{ fontSize: 12 }} />
                  </Hidden>
                </Button>
                <BoardMenu />
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <AddNewTaskDialog
        open={openTaskDialog}
        handleClose={() => setOpenTaskDialog(false)}
      />
      <Hidden smDown>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {DrawerContent}
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Backdrop open={open} sx={{ zIndex: 999999 }}>
          {open && (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box
                sx={{
                  position: "fixed",
                  top: 80,
                  borderRadius: "8px",
                  width: "264px",
                  transform: "translate(-50%)",
                  left: "50%",
                  background: theme.palette.background.paper,
                  zIndex: 900,
                }}
              >
                {DrawerContent}
              </Box>
            </ClickAwayListener>
          )}
        </Backdrop>
      </Hidden>

      <Main open={open} isMobile={isMobile}>
        {children}
        <Hidden smDown>
          <Button
            onClick={() => setOpen(true)}
            sx={{
              position: "fixed",
              bottom: "32px",
              left: "0",
              transform: "translateX(-50%)",
              pl: "74px",
              pr: "22px",
              py: "18.5px",
            }}
          >
            <EyeIcon />
          </Button>
        </Hidden>
      </Main>
    </Box>
  );
};

export default SideBar;
