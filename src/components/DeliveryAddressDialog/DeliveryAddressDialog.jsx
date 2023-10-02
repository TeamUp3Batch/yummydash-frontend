import React, { useState, useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

const DeliveryAddressDialog = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

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

  const dialogStyle = {
    position: "absolute",
    top: dialogPosition.top,
    left: dialogPosition.left,
    zIndex: 1000,
    height: "150px",
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

    // Attach the event listener when the dialog is visible
    if (isDialogVisible) {
      window.addEventListener("click", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDialogVisible]);

  return (
    <div>
      {/* Use Material-UI's Icon component with 'ArrowDropDown' */}
      <ArrowDropDownIcon
        ref={iconRef}
        onClick={openDialog}
        style={{ cursor: "pointer" }}
      />

      {isDialogVisible && (
        <Paper elevation={3} style={dialogStyle}>
          <List sx={style} component="nav" aria-label="nav pages">
            <ListItemButton>
              <h3> Delivery</h3>
              <Divider dark />
            </ListItemButton>

            <ListItemButton>
              <ListItemText
                secondary={
                  <Typography variant="h8" color="textPrimary">
                    Select Your Location
                  </Typography>
                }
              />

              <Divider dark />
              <h5 style={{ marginLeft: "10px" }}>Edit </h5>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography variant="h10" color="textSecondary">
                    Add New Address
                  </Typography>
                }
              />
              <AddIcon />
              <Divider dark />
            </ListItemButton>
          </List>
        </Paper>
      )}
    </div>
  );
};

export default DeliveryAddressDialog;
