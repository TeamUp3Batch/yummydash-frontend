import React from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useAdminLogin } from './hooks/useAdminLogin';

const AdminLogin = () => {
  const { 
    isError,
    login,
    OTPData,
    msg,
    enterOTP,
    handleChange,
    handleOTPChange,
    handleRequestOTP,
    handleOTPSubmit,
    showOTPField,
  } = useAdminLogin({});

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        {showOTPField === false ? (
          <form onSubmit={handleRequestOTP}>
            <TextField
              label="Admin Email"
              type="email"
              name="admin_email"
              value={login.admin_email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Request OTP
            </Button>
            {isError && <Typography color="error">{msg}</Typography>}
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <TextField
              label="Admin Email"
              type="email"
              name="admin_email"
              value={OTPData.admin_email}
              onChange={handleOTPChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="OTP"
              type="text"
              name="otp"
              value={OTPData.otp}
              onChange={handleOTPChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Verify OTP
            </Button>
          </form>
        )}
        {isError && <Typography color="error">{msg}</Typography>}
      </Box>
    </Container>
  );
};

export default AdminLogin;
