import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Avatar,
  Box,
  Rating,
  TextField,
  Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { getDriverProfile, updateDriverProfileByEmail } from '../../services/driverService';
import { 
  updateDriver, 
  updateDriverPhoneNumber, 
  updateDriverFirstName,
  updateDriverLastName,
} from '../../slices/driverSlice';


const Profile = () => {
  const dispatch = useDispatch();
  const { loggedInDriver } = useSelector((state) => state.driver);

  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(loggedInDriver.firstName);
  const [editedLastName, setEditedLastName] = useState(loggedInDriver.lastName);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(loggedInDriver.phoneNumber);
  const [rating, setRating] = useState(loggedInDriver.userRating);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const driver = await getDriverProfile(loggedInDriver._id);
        dispatch(updateDriver(driver.data.driverProfile));
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };
    fetchDriverData();
  }, []);

  useEffect(() => {
    setRating(loggedInDriver.userRating);
  }, [loggedInDriver.userRating]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedFirstName(loggedInDriver.firstName);
    setEditedLastName(loggedInDriver.lastName);
    setEditedPhoneNumber(loggedInDriver.phoneNumber);
  };

  const handleSaveClick = async () => {
    const data = {
      email: loggedInDriver.email,
      firstName: editedFirstName,
      lastName: editedLastName,
      phoneNumber: editedPhoneNumber,
    };
    try {
      const response = await updateDriverProfileByEmail(data);
      dispatch(updateDriverFirstName(response.firstName));
      dispatch(updateDriverLastName(response.lastName));
      dispatch(updateDriverPhoneNumber(response.phoneNumber));
     
    } catch (error) {
      console.error('Error updating driver profile:', error);
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
        <PersonIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" gutterBottom>
        {editMode ? (
          <>
            <TextField
              value={editedFirstName}
              onChange={(e) => setEditedFirstName(e.target.value)}
              label="First Name"
            />
            <TextField
              value={editedLastName}
              onChange={(e) => setEditedLastName(e.target.value)}
              label="Last Name"
            />
          </>
        ) : (
          `${loggedInDriver.firstName} ${loggedInDriver.lastName}`
        )}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {editMode ? (
          <TextField
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
            label="Contact"
          />
        ) : (
          <span>
            Contact: <strong>{loggedInDriver.phoneNumber}</strong>
          </span>
        )}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        <span>
          Email: <strong>{loggedInDriver.email}</strong>
        </span>
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={rating} precision={0.1} readOnly />
          <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}></Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Orders Delivered:{loggedInDriver.ordersDelivered}
        </Typography>
      </Box>

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
