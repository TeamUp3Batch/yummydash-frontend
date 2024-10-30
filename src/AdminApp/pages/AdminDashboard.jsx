import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import BentoIcon from "@mui/icons-material/Bento";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../img/yummyDashLogo.png";
import {
  logout
} from "../../slices/adminSlice";
import DriverList from "../components/DriverList/DriverList";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import RestaurantView from "../components/RestaurantList/RestaurantView/RestaurantView";
import UserList from "../components/UserList/UserList";
import Dashboard from "./Dashboard";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(
    ["background-color", "color", "width", "margin"],
    {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }
  ),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(
      ["background-color", "color", "width", "margin"],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }
    ),
  }),
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
}));

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000", // Black
    },
    secondary: {
      main: "#fffee", // White
    },
  },
});

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const [open, setOpen] = React.useState(true);
  const [selectedSection, setSelectedSection] = React.useState("dashboard");
  const [showRestaurantView, setShowRestaurantView] = React.useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleBreadcrumbClick = () => {
    setShowRestaurantView(false);
    setSelectedRestaurantId(null);
  };

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "dashboard":
        return <Dashboard />;
      case "Restaurant List":
        if (showRestaurantView) {
          return (
            <RestaurantView
              restaurantId={selectedRestaurantId}
              setShowRestaurantView={setShowRestaurantView}
            />
          );
        } else {
          return (
            <RestaurantList
              setShowRestaurantView={setShowRestaurantView}
              setSelectedRestaurantId={setSelectedRestaurantId}
              handleBreadcrumbClick={handleBreadcrumbClick}
            />
          );
        }
      case "Driver List":
        return <DriverList />;
      case "User List":
        return <UserList />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
            <img style={{ width: "5%" }} src={logo} alt="Logo" />
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            <Link
              href="#"
              color="inherit"
              underline="none"
              onClick={() => handleSectionClick("dashboard")}
            >
              <ListItem >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="none"
              onClick={() => handleSectionClick("Restaurant List")}
            >
              <ListItem >
                <ListItemIcon>
                  <BentoIcon />
                </ListItemIcon>
                <ListItemText primary="Restaurant List" />
              </ListItem>
            </Link>

            <Link
              href="#"
              color="inherit"
              underline="none"
              onClick={() => handleSectionClick("Driver List")}
            >
              <ListItem >
                <ListItemIcon>
                  <AirportShuttleIcon />
                </ListItemIcon>
                <ListItemText primary="Driver List" />
              </ListItem>
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="none"
              onClick={() => handleSectionClick("User List")}
            >
              <ListItem >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="User List" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {renderSectionContent()}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
