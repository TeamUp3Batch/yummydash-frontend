import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Avatar, Box, Button, TextField } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EditIcon from '@mui/icons-material/Edit';
import {updatePartnerProfileByEmail} from '../../../services/partnerService';
import { updateName, updatePhoneNumber } from '../../../slices/partnerSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { loggedInPartner } = useSelector((state) => state.partner);

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(loggedInPartner.name);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(loggedInPartner.phoneNumber);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedName(loggedInPartner.name);
    setEditedPhoneNumber(loggedInPartner.phoneNumber);
  };

  const handleSaveClick = async () => {
   
    const data = {
      name: editedName,
      phoneNumber: editedPhoneNumber,
      email: loggedInPartner.email,
    }

    try {
      const editedPartnerProfile = await updatePartnerProfileByEmail(data);
    
      if (editedPartnerProfile) {
        dispatch(updateName(editedPartnerProfile.name));
        dispatch(updatePhoneNumber(editedPartnerProfile.phoneNumber));
      } else {
        console.error("Error editing partner profile: Unexpected response.");
      }
    } catch (error) {
      console.error("Error editing partner profile:", error);
    }
   
    setEditMode(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Avatar sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}>
        <StorefrontIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" gutterBottom>
        {editMode ? (
          <TextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            label="Name"
          />
        ) : (
          `${loggedInPartner.name}`
        )}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {editMode ? (
          <TextField
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
            label="Phone Number"
          />
        ) : (
          `Phone Number: ${loggedInPartner.phoneNumber}`
        )}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {loggedInPartner.email}
      </Typography>

      {editMode ? (
        <Box>
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            Save
          </Button>
          <Box sx={{ m: 1 }} />
          <Button onClick={handleCancelClick} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      ) : (
        <Button onClick={handleEditClick} startIcon={<EditIcon />} variant="outlined">
          Edit Profile
        </Button>
      )}
    </Box>
  );
};

export default Profile;
