import React from 'react'
import { useSelector } from 'react-redux';
import {  Typography, Avatar, Box } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Profile = () => {
    const { loggedInPartner } = useSelector((state) => state.partner);
   
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}>
          <StorefrontIcon fontSize="large" />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {`${loggedInPartner.name}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {loggedInPartner.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Phone Number: {loggedInPartner.phoneNumber}
        </Typography>
        </Box>
       
    );
  };

export default Profile