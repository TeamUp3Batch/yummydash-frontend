import React from "react";
import Star from "../../icons/star-svgrepo-com.svg";
import Info from "../../icons/info-circle-svgrepo-com.svg";
import classes from "./menu.module.scss";

const Menu = ({ restaurantDetails }) => {
  if (!restaurantDetails) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div key={restaurantDetails._id}>
        <div className={classes.restaurantMenu__wrapper}>
          <div className={classes.restauranMenu__header}>
            {/* Your content using restaurantDetails */}
          </div>

          <div className={classes.restauranMenu__main}>
            {/* Your content using restaurantDetails */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
