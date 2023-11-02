import React, { useState, useEffect } from "react";
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
import SortingDialog from "../../components/SortingDialog/SortingDialog";
import Typography from "@mui/material/Typography";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { logout } from "../../slices/authSlice";

const Header = ({setSorting}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSearchAddress, setSelectedSearchAddress] = useState("");
  const [selectedSorting, setSelectedSorting] = useState(null);

  const { loggedInUser, error } = useSelector((state) => state.auth);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const Capitalize = (str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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

  const handleSearchAddressSelect = (address) => {
    typeof address === "string"
      ? setSelectedSearchAddress(address)
      : setSelectedSearchAddress(address.userAddress1);
  };

  useEffect(() => {
    const primaryAddress = loggedInUser.address.find(
      (address) => address.isPrimaryAddress === true
    );
    if (primaryAddress) {
      setSelectedSearchAddress(primaryAddress.userAddress1);
    }
  }, [loggedInUser.address]);

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  // const handleAddressSelect = (address) => {
  //   setSelectedAddress(address);
  // };
  const handleSorting = (sortData) =>{
    setSelectedSorting(sortData);
    setSorting(sortData);
  }

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.address}>
          <p style={{ textAlign: "justify", whiteSpace: "pre-line" }}>
            <DeliveryAddressDialog
              onSelect={handleSearchAddressSelect}
              onSearchAddressSelect={handleSearchAddressSelect}
            />
            {selectedSearchAddress}
          </p>
        </div>
        <div className={styles.search}>
          <input placeholder="Search Cuisines, Restaurants, or Items" />
        </div>
        <div className={styles.sort}>
          <SortingDialog onSelect={handleSorting} />
          <p>Sort</p> <p>{ (selectedSorting) ? 'By '+Capitalize(selectedSorting) : '' }</p>
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
