import React from "react";

import classes from './carousel.module.scss';
import MyComponent  from ".";

const CarouselMain = () => {
  return (
    <div className={classes.carousel__wrapper}>
      <h1>Cuisines</h1>
      <MyComponent />

    </div>
  )
}

export default CarouselMain