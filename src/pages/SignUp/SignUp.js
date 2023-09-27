import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import ModalLogin from "../../components/ModalLogin/ModalLogin";

import styles from "./SignUp.css"; // Import the CSS file with the provided styles

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const SignUp = () => {
  // Declare the following variables and functions
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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
      const url = "http://localhost:5000/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      setOpenSnackbar(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
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
          <form>
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
              {error && (
                <div className={`${styles.error} ${styles.input}`}>{error}</div>
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
                {/* <Button>
                  <Link to="/login">Login</Link>
                </Button> */}
                 <Button onClick={handleOpen}>Login</Button>
                  <ModalLogin
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
        >
          {/* <Alert onClose={handleCloseSnackbar} severity="success">
          {msg}
        </Alert> */}
        </Snackbar>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
