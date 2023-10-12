import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Menu from "@mui/material/Menu"; // Import Menu component
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
import { useDispatch } from 'react-redux';

const DeliveryAddressDialog = ({ onSelect }) => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const { loggedInUser, isLoading, error } = useSelector((state) => state.auth);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);
  const [isAddAddressDialogVisible, setAddAddressDialogVisible] =
    useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [data, setData] = useState({
    email: loggedInUser.email,
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

  //******************
  //   *  * Stating  Add Address Dialog Styling *  *
  //******************
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
    width: "350px",
  };
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const inputStyle = {
    color: "#0C151D",
    fontweight: 400,
    padding: "4px 12px ",
    fontSize: "16px",
    boxSizing: "border-box",
    borderRadius: "1px",
    width: "100%",
    margin: "2px 0px 10px",
  };

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
    try {
      const url = `${apiUrl}/api/users/addNewAddress`;
      const result = await axios.post(url, data);
      console.log('resultvsdvsdvsd', result);
      if (result.status === 201) {
        sessionStorage.removeItem('address');
        sessionStorage.setItem('address', JSON.stringify(result.data.address));
        setAddresses(result.data.address);
        setAddAddressDialogVisible(false);
  
        // Clear input values by resetting the data state
        setData({
          email: sessionStorage.getItem('email'),
          unitNumber: '',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Canada',
        });
      }
    } catch (error) {
      console.log("error", error);
    }
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
    // const storedAddresses = JSON.parse(sessionStorage.getItem("address"));
    // if (storedAddresses) {
    //   setAddresses(storedAddresses);
    // }
    const storedAddresses = loggedInUser.address;
    if(storedAddresses){
      setAddresses(storedAddresses);
    }
  }, []);

  return (
    <div>
      {/* Use Material-UI's Icon component with 'ArrowDropDown' */}
      <ArrowDropDownIcon
        ref={iconRef}
        onClick={openDialog}
        style={{ cursor: "pointer" }}
      />

      {/* Replace Paper with Menu */}
      <Menu
        anchorEl={iconRef.current} // Use the iconRef as the anchor element
        open={isDialogVisible}
        onClose={closeDialog}
        PaperProps={{
          elevation: 3,
          sx: dialogStyle, // Style for the Menu component
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
                        <List key={address.id}>
                          <ListItem>
                            <LocationOnIcon />
                            <ListItemText
                              primaryTypographyProps={{ fontSize: "12px" }}
                            >
                              {address.unitNumber} {address.street}{" "}
                              {address.city} {address.state} {address.zipCode}{" "}
                              {address.country}
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
      </Menu>

      {/* Nested Add Address Dialog */}
      {isAddAddressDialogVisible && (
        <Menu
          anchorEl={iconRef.current} // Use the iconRef as the anchor element
          open={isAddAddressDialogVisible}
          onClose={closeAddAddressDialog}
          PaperProps={{
            elevation: 3,
            sx: innerDialogStyle, 
          }}
        >
          <div>
            <TextField
              id="outlined-basic"
              type="text"
              name="unitNumber"
              value={data.unitNumber}
              onChange={handleInputChange}
              style={inputStyle}
              label="Unit Number"
              variant="outlined"
              
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              type="text"
              name="street"
              label="Street"
              placeholder="Street"
              value={data.street}
              variant="outlined"
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div>
            <TextField
            id="outlined-basic"
              type="text"
              name="city"
              label="City"
              value={data.city}
              onChange={handleInputChange}
              style={inputStyle}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
             id="outlined-basic"
              type="text"
              name="state"
              label="State"
              value={data.state}
              onChange={handleInputChange}
              style={inputStyle}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              type="text"
              name="zipCode"
              label="Zip Code"
              value={data.zipCode}
              onChange={handleInputChange}
              style={inputStyle}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
            id="outlined-basic"
              type="text"
              name="country"
              value="Canada"
              onChange={handleInputChange}
              style={inputStyle}
              variant="outlined"
            />
          </div>
          <ListItemButton
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button variant="outlined" color="error" onClick={closeAddAddressDialog}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
          </ListItemButton>
        </Menu>
      )}
    </div>
  );
};

export default DeliveryAddressDialog;
