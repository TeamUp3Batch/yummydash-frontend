import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

function ModalComponent({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login form submitted:", formData);
    // Close the modal after login or handle login logic
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "300px",
          p: 2,
          textAlign: "center",
          backgroundColor: "white", // Add a background color
          borderRadius: "8px", // Add border-radius for rounded corners
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalComponent;
