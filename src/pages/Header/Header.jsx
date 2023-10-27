import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import logo from "../../img/yummyDashLogo.png";
import flag from "../../img/canadaFlag.png";
import styles from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HelpIcon from "@mui/icons-material/Help";
import DeliveryAddressDialog from "../../components/DeliveryAddressDialog/DeliveryAddressDialog";
import Typography from "@mui/material/Typography";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

import { logout } from "../../slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGeocodedAddress, setSelectedGeocodedAddress] = useState("");

  const { loggedInUser, error } = useSelector((state) => state.auth);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const openProfile = () => {
    try {
      navigate("/Profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGeocodedAddressSelect = (address) => {
    setSelectedGeocodedAddress(address);
  };

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.address}>
          <p>
            <DeliveryAddressDialog
              onSelect={handleGeocodedAddressSelect}
              onGeocodedAddressSelect={handleGeocodedAddressSelect}
            />
           {selectedGeocodedAddress ? (
            <p>{selectedGeocodedAddress}</p>
          ) : (
            <p>Your Address Here</p>
          )}
          </p>
        </div>
        <div className={styles.search}>
          <input placeholder="Search Cuisines, Restaurants, or Items" />
        </div>
        <div className={styles.sort}>
          <TuneIcon style={{ color: "white" }} color="action" />
          <p>Sort</p>
        </div>
        <div className={styles.profile}>
          <img src={flag} alt="Canada" />
        </div>
        <div>
          <AccountCircleSharpIcon
            fontSize="large"
            onClick={toggleDrawer}
            sx={{ color: "white", fontSize: 55 }}
          />
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
                  {loggedInUser.firstName.toUpperCase()}
                </Typography>
              }
            />
            <ListItemButton>
              <AccountCircleIcon />
              <ListItemText
                primary="View Account"
                style={{ cursor: "pointer" }}
                onClick={() => openProfile()}
              />
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
            <ListItemButton style={{ marginTop: "500px" }}>
              <LogoutIcon />
              <ListItemText
                primary="Logout"
                style={{ cursor: "pointer" }}
                onClick={() => handleLogout()}
              />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
