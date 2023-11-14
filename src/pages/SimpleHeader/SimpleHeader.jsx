import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../img/yummyDashLogo.png";
import styles from "../SimpleHeader/simpleheader.module.scss";
import LoginModal from "../../components/LoginModal/LoginModal";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


const SimpleHeader = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.account}>
        <Link to="/admin">
            <Button className={styles.signup}>
            <AdminPanelSettingsIcon  sx={{fontSize: 30}}/>
            Admin
            </Button>
          </Link>
          <Link to="/restaurantSignUp">
            <Button className={styles.signup}>
            <RestaurantIcon  sx={{fontSize: 30}}/>
            Partner
            </Button>
          </Link>
          <Link to="/driverSignUp">
            <Button className={styles.signup}>
            <DriveEtaIcon  sx={{fontSize: 30}}/>
            Driver
            </Button>
          </Link>
          <Button onClick={handleOpen} className={styles.login}>
            <AccountCircleSharpIcon  sx={{fontSize: 40}}/>
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
