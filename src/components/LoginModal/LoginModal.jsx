import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { loginStart, loginSuccess, loginFailure } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import * as authServices from "../../services/authService"; // Import your login service

const LoginModal = ({ isOpen, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const result = await authServices.login(data); // Use the login function from the service
      console.log("result",result)
      if (result.data.status === false) {
        dispatch(loginFailure(result.data.message));
      }
      if (result.data.status === true) {
        dispatch(loginSuccess(result.data));
        navigate("/main");
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
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
          backgroundColor: "white",
          borderRadius: "8px",
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
          {error && (
            <Alert severity="error">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
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
