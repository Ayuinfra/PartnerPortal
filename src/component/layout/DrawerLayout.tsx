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
import logo from "../../assets/images/infrablok-logo.png";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../core/constants/RoutesPath";

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
  const [open, setOpen] = useState(false);
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(-1);
  const navigate = useNavigate();

  const handleClick = (index: number, selectedMenuDetails: any) => {
    if (selectedMenuDetails.route) {
      navigate("/" + selectedMenuDetails.route);
    }

    setSelectedMenuItemIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Menu = [
    {
      text: "Home",
      route: RoutePath.DashboardScreen,
      subMenuItems: [],
    },
    {
      text: "Accounts",
      subMenuItems: [
        { text: "Profile", route: RoutePath.Profile },
        { text: "Billing", route: RoutePath.Billing },
      ],
    },
  ];

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

        {Menu.map((item: any, index: number) => (
          <List
            key={index} // Added a key prop
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              onClick={() => handleClick(index, item)}
              selected={selectedMenuItemIndex === index}
            >
              <ListItemText primary={item?.text} />
              {item?.subMenuItems?.length > 0 ? (
                selectedMenuItemIndex === index ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                ""
              )}
            </ListItemButton>
            <Collapse
              in={selectedMenuItemIndex === index}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item?.subMenuItems &&
                  item?.subMenuItems.map(
                    (subMenuItem: any, subIndex: number) => (
                      <ListItem key={subIndex} disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary={subMenuItem?.text}
                            onClick={() => {
                              navigate("/" + subMenuItem.route);
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  )}
              </List>
            </Collapse>
          </List>
        ))}
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        {outlet}
      </Main>
    </Box>
  );
};

export default DrawerLayout;
