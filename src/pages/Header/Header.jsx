import React, { useState, useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import Drawer from "@mui/material/Drawer"; // Import Drawer component
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import logo from "../../img/yummyDashLogo.png";
import flag from "../../img/canadaFlag.png";
import profile from "../../img/accountDefault.png";
import styles from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HelpIcon from "@mui/icons-material/Help";
import DeliveryAddressDialog from "../../components/DeliveryAddressDialog/DeliveryAddressDialog";
import Typography from "@mui/material/Typography";

const Header = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control the drawer
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState(" ");
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    const userName = sessionStorage.getItem("userName");
    if (loggedIn) {
      setIsUserLoggedIn(true);
      setUserName(userName.slice(1, -1).toUpperCase());
    }
  }, [isUserLoggedIn]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const logout = () => {
    sessionStorage.clear();
    setIsUserLoggedIn(false);
    setUserName(" ");
    navigate("/");
  };
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.address}>
          <p>Delivery</p>
          <p>
            {selectedAddress
              ? `${selectedAddress.unitNumber}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.zipCode}, ${selectedAddress.country}`
              : "Your Address Here"}
            <DeliveryAddressDialog onSelect={handleAddressSelect} />
          </p>
        </div>
        <div className={styles.search}>
          <input placeholder="Search Cuisines, Restaurants, or Items" />
        </div>
        <div className={styles.sort}>
          <TuneIcon style={{ color: "white" }} color="action" />
          <p>Sort</p>
        </div>
        <div className={styles.roundIcon}>
          <img src={flag} alt="Canada" />
        </div>
        <div className={styles.profile}>
          <img src={profile} alt="Profile" onClick={toggleDrawer} />
        </div>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 240,
          },
        }}
      >
        <div className={styles.drawerContent}>
          <List sx={style} component="nav" aria-label="nav pages">
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ padding: "16px" }}
                >
                  {userName}
                </Typography>
              }
            />
            <ListItemButton>
              <AccountCircleIcon />
              <ListItemText primary="View Account" />
              <Divider dark />
            </ListItemButton>
            <ListItemButton>
              <ListAltIcon />
              <ListItemText primary="Order History" />
              <Divider dark />
            </ListItemButton>
            <ListItemButton>
              <HelpIcon />
              <ListItemText primary="Need Help" />
              <Divider dark />
            </ListItemButton>
            {isUserLoggedIn && (
              <ListItemButton style={{ marginTop: "500px" }}>
                <LogoutIcon />
                <ListItemText
                  primary="Logout"
                  style={{ cursor: "pointer" }}
                  onClick={() => logout()}
                />
              </ListItemButton>
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
