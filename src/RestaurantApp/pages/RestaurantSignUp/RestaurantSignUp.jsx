import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Avatar,
  Box,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';

const RestaurantSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signup data:", formData);
    // You can make an API call to handle the signup process
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <RestaurantIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Patner Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="businessName"
            label="Business Name"
            name="businessName"
            autoComplete="bname"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="businessPhonenumber"
            label="Business Phonenumber"
            name="business Phonenumber"
            autoComplete="bphonenumber"
            autoFocus
            onChange={handleChange}
            />
         
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Business Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Button color="primary" onClick={handleLoginClick}>
          Already have an account? Log in
        </Button>
      </Box>

      {/* Login Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isLoginModalOpen}
        onClose={handleLoginModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isLoginModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="div" gutterBottom>
              Patner Login
            </Typography>
            <form>
              <TextField
                margin="normal"
                required
                fullWidth
                id="loginEmail"
                label="Email Address"
                name="loginEmail"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="loginPassword"
                label="Password"
                type="password"
                id="loginPassword"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default RestaurantSignUp;
