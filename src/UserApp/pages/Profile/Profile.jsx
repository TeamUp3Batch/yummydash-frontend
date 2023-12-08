import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { updateUserProfile } from "../../../services/userService";
import HeaderWhite from "../HeaderWhite/HeaderWhite";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { updatePhoneNumber,updateFirstName,updateLastName } from "../../../slices/authSlice";
import { useDispatch } from "react-redux";
const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const { loggedInUser } = useSelector((state) => state.auth);
 

  const handleControlChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: loggedInUser.email,
    }
    try {
      const editedUserProfile = await updateUserProfile(data);
      if (editedUserProfile) {
        dispatch(updateFirstName(editedUserProfile.firstName));
        dispatch(updateLastName(editedUserProfile.lastName));
        dispatch(updatePhoneNumber(editedUserProfile.phoneNumber));
      } else {
        console.error("Error editing user profile: Unexpected response.");
      }
    } catch (error) {
      console.error("Error editing user profile:", error);
    }

    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const handleEditProfile = () => {
    setFormData({
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      phoneNumber: loggedInUser.phoneNumber,
    });

    setShowForm(true);
  };

  return (
    <React.Fragment>
      <HeaderWhite />
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md">
        <DialogTitle>Update profile</DialogTitle>
        <DialogContent>
          <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleControlChange} style={{ margin: '10px 0' }} fullWidth required />
          <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleControlChange} style={{ margin: '10px 0' }} fullWidth required />
          <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleControlChange} style={{ margin: '10px 0' }} fullWidth required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateProfile}>Update</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <Paper elevation={12} style={{ padding: "20px", textAlign: "center", width: "400px" }}>
          <Typography variant="h5">Account Settings</Typography> 
          <Typography>
            <span>Full Name: </span>
            <span>{loggedInUser.firstName.toUpperCase()} </span>
            <span>{loggedInUser.lastName.toUpperCase()}</span>
          </Typography>
          <Typography>
            <span>Phone Number: </span>
            {loggedInUser.phoneNumber}
          </Typography>
          <Typography>
            <span>Email: </span>
            {loggedInUser.email}
          </Typography>
         
           <Link to='../main'>
          < ArrowBackIcon  />
          </Link>
          <span><EditIcon onClick={handleEditProfile} /> </span>
        
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default Profile;
