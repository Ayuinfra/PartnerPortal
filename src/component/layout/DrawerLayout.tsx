import * as React from "react";

import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "@mui/material/ListItem";

import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";

import { CredentsRoute } from "../../core/routes/Routes";
import logo from "../../assets/images/infrablok-logo.png";

import { Collapse } from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,

  padding: theme.spacing(3),

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,

    duration: theme.transitions.duration.leavingScreen,
  }),

  marginLeft: `-${drawerWidth}px`,

  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,

      duration: theme.transitions.duration.enteringScreen,
    }),

    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,

    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,

    marginLeft: `${drawerWidth}px`,

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,

      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",

  alignItems: "center",

  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,

  justifyContent: "flex-end",
}));

const DrawerLayout = ({ outlet }: any) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const [openTab, setOpenTab] = React.useState(true);

  const handleClick = () => {
    setOpenTab(!openTab);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <img src={logo} alt="not found" width={200} />
        </Toolbar>
      </AppBar>

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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Accounts" />

            {openTab ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openTab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {CredentsRoute.map((item: any, index: any) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item.key} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
};

export default DrawerLayout;
