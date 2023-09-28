import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import logo from "../../img/yummyDashLogo.png";
import profile from "../../img/accountDefault.png";
import styles from "../SimpleHeader/simpleheader.module.scss";
import LoginModel from "../../components/LoginModel/LoginModal";

const SimpleHeader = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />

        <div className={styles.roundIcon}>
          <Typography style={{ color: "white" }}>
            Yummy in your Tummy?
          </Typography>
        </div>

        <Divider orientation="vertical" flexItem />
        <div className={styles.profile}>
          <img src={profile} alt="Profile" />
        </div>
        <div className={styles.account}>
          <Link>
            <Button onClick={handleOpen} className={styles.login}>
              Log In
            </Button>
            <LoginModel
              isOpen={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            />
          </Link>

          <Link to="/signup">
            <Button className={styles.signup}>SignUp</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
