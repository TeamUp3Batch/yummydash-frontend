import React from "react";

import classes from "./cuisinecarousel.module.scss";
import MyComponent from ".";

const CuisineCarousel = () => {
  return (
    <div className={classes.carousel__wrapper}>
      <h1>Cuisines</h1>
      <MyComponent />
    </div>
  );
};

export default CuisineCarousel;
