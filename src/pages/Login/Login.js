import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Login.css";
import { Typography, TextField, Button, Box, Modal } from "@mui/material";
import ModalLogin from "../../components/ModalLogin/ModalLogin";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const url = "http://localhost:5000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "300px",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // <div>
    //   <Button onClick={handleOpen}>Login</Button>
    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   > 
    //     <Box sx={{ ...style, width: 250 }}>
    //       <div className={styles.login_container}>
    //         {/* <div className={styles.login_form_container}> */}
    //         {/* <div className={styles.left}> */}
    //         {/* <form className={styles.form_container} onSubmit={handleSubmit}> */}
    //         <Typography variant="h6" padding={1} textAlign={"center"}>
    //           Log In to Your Yummy Dash Account
    //         </Typography>
    //         <TextField
    //           type="email"
    //           margin="normal"
    //           variant="outlined"
    //           placeholder="Email"
    //           name="email"
    //           onChange={handleChange}
    //           value={data.email}
    //           required
    //           className={styles.input}
    //           align="center"
    //         />
    //         <TextField
    //           type="password"
    //           margin="normal"
    //           variant="outlined"
    //           placeholder="Password"
    //           name="password"
    //           onChange={handleChange}
    //           value={data.password}
    //           required
    //           className={styles.input}
    //           align="center"
    //         />
    //         {error && <div className={styles.error_msg}>{error}</div>}
    //         <Button
    //           sx={{ marginLeft:5 , borderRadius: 3 ,margin:1}}
    //           type="submit"
    //           variant="contained"
		// 	  align="center"
    //           className={styles.green_btn}
    //         >
    //           Sign In
    //         </Button>
    //         {/* </form> */}
    //         {/* </div> */}
    //         <div className={styles.right}>
    //           <Typography>
    //             Don't have an account?
    //             <Link to="/signup">
    //               <Button type="button" className={styles.white_btn}>
    //                 Sign Up
    //               </Button>
    //             </Link>
    //           </Typography>
    //         </div>
    //         {/* </div> */}
    //       </div>
    //     </Box>
    //   </Modal>
    //  {/* </div> */}
      <div>
        <Button onClick={handleOpen}>Login</Button>
        <ModalLogin
          isOpen={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"  
        />
      </div>
     
   
  );
};

export default Login;
