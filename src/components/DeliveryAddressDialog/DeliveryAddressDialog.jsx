import React, { useState, useRef, useEffect } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/joy/Radio";
import axios from "axios";
import { ListItem, TextField } from "@mui/material";

const DeliveryAddressDialog = ({ onSelect }) => {
  // ******************************************************
  //  *  *                 Use State Hooks         *  *
  // ******************************************************
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  const [isAddAddressDialogVisible, setAddAddressDialogVisible] =
    useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [data, setData] = useState({
    email: sessionStorage.getItem("email"),
    unitNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Canada",
  });

  const [addresses, setAddresses] = useState(null);
  const handleRadioSelect = (address) => {
    onSelect(address); // Call the callback function to update the selected address in the parent component
  };

  // ******************************************************
  // *  *   Starting Dialog Styling          *  *
  // ******************************************************

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

  //******************************************************
  //   *  * Stating  Add Address Dialog Styling *  *
  //******************************************************
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
    // height: "400px",
    width: "300px",
  };

  const innerDialogStyle = {
    position: "absolute",
    top: dialogPosition.top,
    left: dialogPosition.left,
    zIndex: 1000,
    height: "400px",
    width: "300px",
  };
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const inputStyle = {
    color: "#0C151D",
    fontweight: 400,
    padding: "1px 2px",
    fontSize: "16px",
    boxSizing: "border-box",
    borderRadius: "1px",
    width: "100%",
  };

  // ******************************************************
  //     *  *         Event handlers   *  *
  // ******************************************************

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    // Save the data to the database
    e.preventDefault();
    console.log("Data to be saved:", data);
    try {
      console.log("data", data);
      // const url = `${process.env.REACT_APP_API_URL}/api/users/addNewAddress`;
      const url = "http://localhost:5000/api/users/addNewAddress";
      const result = await axios.post(url, data);
      console.log("resultvsdvsdvsd", result);
      if (result.status === 201) {
        sessionStorage.removeItem("address");
        sessionStorage.setItem("address", JSON.stringify(result.data.address));
        setAddresses(result.data.address);
        setAddAddressDialogVisible(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // ******************************************************
  //  *  *         Use Effect Hooks        *  *
  // ******************************************************

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

  useEffect(() => {
    const storedAddresses = JSON.parse(sessionStorage.getItem("address"));
    if (storedAddresses) {
      setAddresses(storedAddresses);
    }
  }, []);

  // ******************************************************
  //  *  *        Render  UI  Here  (JSX)     *  *
  // ******************************************************

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
                  <Typography component="span" variant="h8" color="textPrimary">
                    Select Your Location
                  </Typography>
                }
              />

              <Divider dark />
              <h5 style={{ marginLeft: "10px" }}>Edit </h5>
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
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
                        <List key={address.id}>
                          <ListItem>
                           <LocationOnIcon/>
                          <ListItemText primaryTypographyProps={{fontSize: '12px'}} >
                         
                            {address.unitNumber} {address.street} {address.city}{" "}
                            {address.state} {address.zipCode} {address.country}
                          
                          
                          </ListItemText>
                          <Radio
                            checked={selectedAddress === address}
                            onChange={() => handleRadioSelect(address)}
                            value={address.id}
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
        </Paper>
      )}
      {/* Nested Add Address Dialog */}
      {isAddAddressDialogVisible && (
        <Paper style={innerDialogStyle}>
          <div>
            <TextField
              type="text"
              name="unitNumber"
              placeholder="Unit Number"
              value={data.unitNumber}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <TextField
              type="text"
              name="street"
              placeholder="Street"
              value={data.street}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <TextField
              type="text"
              name="city"
              placeholder="City"
              value={data.city}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <TextField
              type="text"
              name="state"
              placeholder="State"
              value={data.state}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <TextField
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={data.zipCode}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <TextField
              type="text"
              name="country"
              placeholder="Country"
              value="Canada"
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <ListItemButton
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button onClick={closeAddAddressDialog}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </ListItemButton>
        </Paper>
      )}
    </div>
  );
};

export default DeliveryAddressDialog;
