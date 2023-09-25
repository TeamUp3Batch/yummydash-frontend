import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import TuneIcon from "@mui/icons-material/Tune";
// import SmsIcon from "@mui/icons-material/Sms";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import logo from "../../img/yummyDashLogo.png";
import flag from "../../img/CanadaFlag.png";
import profile from "../../img/account-default.png";
// import LoginButton from "../../components/LoginButton";
// import SignUpButton from "../../components/SignUpButton";
import styles from "../SimpleHeader/simpleheader.module.scss";

const SimpleHeader = () => {
  const { loginWithRedirect,isAuthenticated, user } = useAuth0();

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
        
        <div className={styles.roundIcon}>
          {/* <div className={styles.needHelp}> */}
           
          {/* </div> */}
          {/* <div className={styles.flag}>
            <img src={flag} alt="Canada" />
          </div> */}
          <Typography style={{color:'white'}}>Yummy in your Tummy?</Typography>
        </div>
        
        <Divider orientation="vertical" flexItem />
        <div className={styles.profile}>
        <img src={profile} alt="Profile" />
        </div>
        <div className={styles.account}>
        <Link to="/login">
          <button className={styles.login} style={{color:'white'}}>
            Log In
          </button>
          </Link>
          <Link to="/signup">
          <button className={styles.signup}>
            SignUp
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
