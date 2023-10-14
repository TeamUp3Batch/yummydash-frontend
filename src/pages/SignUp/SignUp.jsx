import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Box,
} from "@mui/material";
import SimpleHeader from "../SimpleHeader/SimpleHeader";
import Footer from "../../components/Footer/Footer";
import LoginModal from "../../components/LoginModal/LoginModal";
import Alert from "@mui/material/Alert";
import styles from "./signUp.module.scss";
import AlertTitle from "@mui/material/AlertTitle";
import {
  signUpStart,
  signUpFailure,
  signUpSuccess,
} from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import * as authServices from "../../services/authService"; // Import your authentication service

const SignUp = () => {
  const dispatch = useDispatch();

  // Declare the following variables and functions
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  const [msg, setMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const result = await authServices.signUp(data); // Use the signUp function from the service
      if (result.data.status === false) {
        dispatch(signUpFailure(result.data.message));
      }
      console.log("res", result);
      setMsg(result.data.status);
      if (result.data.status === true) {
        dispatch(signUpSuccess(result.data));
        console.log("navigating to main");
        navigate("/main");
      }
      setOpenSnackbar(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setIsError(error.response.data.message);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <SimpleHeader />
      <div className={styles.signupContainer}>
        <Container component="main">
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={400}
              alignItems={"center"}
              justifyContent={"center"}
              margin={"auto"}
              marginTop={3}
              marginBottom={3}
              padding={2}
              borderRadius={5}
              boxShadow={"5px 5px 10px #cccccc"}
              sx={{
                hover: {
                  boxShadow: "10px 10px 10px #cccccc",
                },
              }}
            >
              <Typography variant="h3" padding={3} textAlign={"center"}>
                Sign Up
              </Typography>
              <Typography variant="h6" padding={2} textAlign={"center"}>
                Your Information
              </Typography>
              <TextField
                type="text"
                margin="normal"
                variant="outlined"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className={styles.input}
              />
              <TextField
                type="text"
                margin="normal"
                variant="outlined"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className={styles.input}
              />
              <TextField
                type="email"
                margin="normal"
                variant="outlined"
                label="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <TextField
                type="text"
                margin="normal"
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                value={data.phoneNumber}
                required
                className={styles.input}
              />
              <TextField
                type="password"
                margin="normal"
                variant="outlined"
                label="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {isError && (
                <Alert severity="error">
                  <AlertTitle>{isError}</AlertTitle>
                </Alert>
              )}
              {msg && (
                <div className={`${styles.success} ${styles.input}`}>{msg}</div>
              )}
              <Button
                sx={{ marginTop: 3, borderRadius: 3 }}
                type="submit"
                variant="contained"
                color="warning"
                className={styles.button}
              >
                Create Account
              </Button>
              <Typography variant="h6" padding={2} textAlign={"center"}>
                Already have an account?
                <Button onClick={handleOpen}>Login</Button>
                <LoginModal
                  isOpen={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                />
              </Typography>
            </Box>
          </form>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
