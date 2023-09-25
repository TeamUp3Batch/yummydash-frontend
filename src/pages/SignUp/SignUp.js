import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
} from "@mui/material";

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
    <div className={styles.signupContainer}>
      <Container component="main">
        <Paper elevation={3} className={styles.paperContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={styles.leftContainer}>
              <Typography variant="h4" className={styles.leftText}>
                Welcome Back
              </Typography>
              <Link to="/login">
                <Button variant="outlined" color="inherit">
                  Sign In
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} className={styles.rightContainer}>
              <form className={styles.formContainer} onSubmit={handleSubmit}>
                <Typography variant="h4" className={styles.formHeader}>
                  Create Account
                </Typography>
                <TextField
                  type="text"
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
                  variant="outlined"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className={styles.input}
                />
                {error && (
                  <div className={`${styles.error} ${styles.input}`}>
                    {error}
                  </div>
                )}
                {msg && (
                  <div className={`${styles.success} ${styles.input}`}>
                    {msg}
                  </div>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={styles.button}
                >
                  Sign Up
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
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
  );
};

export default SignUp;
