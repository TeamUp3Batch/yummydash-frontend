import React  from "react";
import styles from "./driverHeader.module.scss";
import logo from "../../../img/yummyDashLogo.png";

const DriverHeader = () => {
  
  
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
      <h1>Driver Portal</h1>>
        <img className={styles.logo} src={logo} alt="Logo" />
        
          </div>

    </div>
  );
};

export default DriverHeader;
