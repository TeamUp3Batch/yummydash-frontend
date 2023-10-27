import React, { useState, useRef, useEffect } from "react";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import AddressInputWithGeocoding from "../DeliveryAddressDialog/AddressInputWithGeocoding";

const DeliveryAddressDialog = ({ onSelect, onGeocodedAddressSelect }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
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

  return (
    <div>
      
      <ArrowDropDownIcon
        ref={iconRef}
        onClick={openDialog}
        style={{ cursor: "pointer" }}
      />

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
            <AddressInputWithGeocoding
              onGeocodedAddressSelect={onGeocodedAddressSelect}
            />
          </div>
        </Menu>
      )}
    </div>
  );
};

export default DeliveryAddressDialog;
