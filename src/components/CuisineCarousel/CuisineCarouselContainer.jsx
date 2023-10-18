import React from "react";

import classes from "./cuisinecarousel.module.scss";
import CuisineCarousel from "./CuisineCarousel";

const CuisineCarouselContainer = () => {
  return (
    <div className={classes.carousel__wrapper}>
      <h1>Cuisines</h1>
      <CuisineCarousel />
    </div>
  );
};

export default CuisineCarouselContainer;
