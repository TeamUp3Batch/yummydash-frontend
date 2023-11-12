import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { useLoginModal } from "./hooks/useLoginModal";

const LoginModal = ({ isOpen, onClose }) => {
  const { data, error, handleChange, handleSubmit } = useLoginModal({
    isOpen,
    onClose,
  });

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
