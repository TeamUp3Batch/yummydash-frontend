import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Radio from "@mui/joy/Radio";
import AddressSearchMapBox from "../DeliveryAddressDialog/AddressSearchMapBox";
import { updatePrimaryAddress } from "../../services/userService";

const DeliveryAddressDialog = ({ onSelect, onSearchAddressSelect }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const { loggedInUser } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState(null);
  const iconRef = useRef(null);
  const [isAddAddressDialogVisible, setAddAddressDialogVisible] =
    useState(false);

  const openDialog = () => {
    if (iconRef.current) {
      const iconPosition = iconRef.current.getBoundingClientRect();
      setDialogPosition({
        top: iconPosition.bottom + window.scrollY,
        left: iconPosition.left + window.scrollX,
      });
    }
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const openAddAddressDialog = () => {
    setAddAddressDialogVisible(true);
  };

  const closeAddAddressDialog = () => {
    setAddAddressDialogVisible(false);
  };

  const handleRadioSelect = async (address) => {
    onSelect(address);
    const selectedAddress = addresses.find((item) => item._id === address._id);

    if (selectedAddress) {
      const userSelectedAddress = {
        email: loggedInUser.email,
        id: selectedAddress._id,
      };

      const savedAddress = await updatePrimaryAddress(userSelectedAddress);
    }
  };

  const dialogStyle = {
    position: "absolute",
    top: dialogPosition.top,
    left: dialogPosition.left,
    zIndex: 1000,
    height: "400px",
    width: "300px",
  };

  const innerDialogStyle = {
    position: "absolute",
    top: dialogPosition.top,
    left: dialogPosition.left,
    zIndex: 1000,
    width: "300px",
  };

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDialogVisible && !iconRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    if (isDialogVisible) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDialogVisible]);

  useEffect(() => {
    const storedAddresses = loggedInUser.address;
    if (storedAddresses) {
      setAddresses(storedAddresses);
    }
  }, [loggedInUser.address]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}>Your Delivery Address:</span>
        <ArrowDropDownIcon
          ref={iconRef}
          onClick={openDialog}
          style={{ cursor: "pointer" }}
        />
      </div>

      <Menu
        anchorEl={iconRef.current}
        open={isDialogVisible}
        onClose={closeDialog}
        PaperProps={{
          elevation: 3,
          sx: dialogStyle,
        }}
      >
        <List sx={style} component="nav" aria-label="nav pages">
          <ListItemButton>
            <h3> Delivery</h3>
            <Divider dark />
          </ListItemButton>

          <ListItemButton>
            <ListItemText
              secondary={
                <Typography component="span" variant="h8" color="textPrimary">
                  Select Your Location
                </Typography>
              }
            />
            <Divider dark />
            <h5 style={{ marginLeft: "10px" }}>Edit</h5>
          </ListItemButton>
          <ListItemButton onClick={openAddAddressDialog}>
            <ListItemText
              primary={
                <Typography
                  component="span"
                  variant="h10"
                  color="textSecondary"
                >
                  Add New Address
                </Typography>
              }
            />
            <AddIcon />
            <Divider dark />
          </ListItemButton>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <ListItem>
              <ListItemText
                primary={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {addresses && addresses.length > 0 ? (
                      addresses.map((address) => (
                        <List key={address._id}>
                          <ListItem>
                            <LocationOnIcon />
                            <ListItemText
                              primaryTypographyProps={{ fontSize: "12px" }}
                            >
                              {address.userAddress1}
                            </ListItemText>
                            <Radio
                              checked={selectedAddress._id === address._id}
                              onChange={() => handleRadioSelect(address)}
                              value={address._id}
                              name="address-radio"
                            />
                          </ListItem>
                        </List>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                }
              />
            </ListItem>
          </div>
        </List>
      </Menu>

      {isAddAddressDialogVisible && (
        <Menu
          anchorEl={iconRef.current}
          open={isAddAddressDialogVisible}
          onClose={closeAddAddressDialog}
          PaperProps={{
            elevation: 3,
            sx: innerDialogStyle,
          }}
        >
          <div>
            <AddressSearchMapBox
              onSearchAddressSelect={onSearchAddressSelect}
            />
          </div>
        </Menu>
      )}
    </div>
  );
};

export default DeliveryAddressDialog;
