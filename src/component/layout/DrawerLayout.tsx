import { styled, useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
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
import { Collapse, ListItemIcon } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../core/constants/RoutesPath";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { getUserFromLocalStorage } from "../../api/shared/CommonApi";
import {
  CommonContext,
  CommonContextType,
} from "../../core/context/CommonContext";
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
  const { clearContextAndLogout } = useContext(
    CommonContext
  ) as CommonContextType;
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
      icon: <HomeIcon />,
      subMenuItems: [],
    },
    {
      text: "Accounts",
      icon: <AccountBoxOutlinedIcon />,
      subMenuItems: [
        {
          text: "Profile",
          route: RoutePath.Profile,
          icon: <AccountCircleIcon />,
        },
        {
          text: "Manage Plan",
          route: RoutePath.ManagePlan,
          icon: <WorkOutlineIcon />,
        },
        { text: "Billing", route: RoutePath.Billing, icon: <PaymentIcon /> },
        { text: "Usage", route: RoutePath.Usage, icon: <DataUsageIcon /> },
        { text: "Team", route: RoutePath.Teams, icon: <PeopleIcon /> },
      ],
    },
  ];
  const userName = getUserFromLocalStorage();

  const handleLogOut = () => {
    clearContextAndLogout();

    navigate(`/`);
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
          <h3> Hello {userName?.partnerBillingDetails?.fullName}!</h3>
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
          <img src={logo} alt="not found" width={200} />
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
            key={index}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              onClick={() => handleClick(index, item)}
              selected={selectedMenuItemIndex === index}
            >
              <ListItemIcon>{item?.icon}</ListItemIcon>
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
                          <ListItemIcon>{subMenuItem.icon}</ListItemIcon>
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
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          fullWidth
          style={{ width: "90%", marginLeft: "10px" }}
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {outlet}
      </Main>
    </Box>
  );
};

export default DrawerLayout;
