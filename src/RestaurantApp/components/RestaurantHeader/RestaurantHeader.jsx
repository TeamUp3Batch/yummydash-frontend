import React  from "react";
import styles from "./restuarantHeader.module.scss";
import logo from "../../../img/yummyDashLogo.png";
import RestaurantDrawer from "../RestaurantDrawer/RestaurantDrawer";

const RestuarantHeader = () => {
  
  
  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
      <RestaurantDrawer /> 
        <img className={styles.logo} src={logo} alt="Logo" />
        
          </div>

    </div>
  );
};

export default RestuarantHeader;
