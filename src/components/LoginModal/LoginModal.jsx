import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate} from "react-router-dom";
const LoginModal = ({ isOpen, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const url = "http://localhost:5000/api/auth/login";
      const result = await axios.post(url, data);
      if(result.data.status === 'logged in') {
      sessionStorage.setItem("token", result.data.token); 
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("userName", JSON.stringify(result.data.firstName));
        navigate('/main');
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
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
            value={data.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mt: 2 }}
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={data.password}
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
};

export default LoginModal;
