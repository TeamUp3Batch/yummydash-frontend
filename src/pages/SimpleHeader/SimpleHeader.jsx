import React from "react";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import logo from "../../img/yummyDashLogo.png";
import profile from "../../img/accountDefault.png";
import styles from "../SimpleHeader/simpleheader.module.scss";
import LoginModal from "../../components/LoginModal/LoginModal";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const SimpleHeader = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.account}>
          <Button onClick={handleOpen} className={styles.login}>
            <AccountCircleSharpIcon fontSize="large" />
            Log In
          </Button>
          <LoginModal
            isOpen={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          />
          <Link to="/signup">
            <Button className={styles.signup}>SignUp</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
