import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography, Avatar, Box, Rating } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Profile = () => {
  const { loggedInDriver } = useSelector((state) => state.driver);

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
        <PersonIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" gutterBottom>
        {`${loggedInDriver.firstName} ${loggedInDriver.lastName}`}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
  <span>
    Email: <strong>{loggedInDriver.email}</strong>
  </span>
</Typography>
<Typography variant="body2" color="textSecondary">
  <span>
    Contact: <strong>{loggedInDriver.phoneNumber}</strong>
  </span>
</Typography>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating value={loggedInDriver.rating} precision={0.1} readOnly />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginLeft: 1 }}
          ></Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Orders Delivered:{loggedInDriver.ordersDelivered}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
