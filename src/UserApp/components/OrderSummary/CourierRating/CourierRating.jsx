import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetMenuState } from '../../../../slices/menuSlice';
import { resetRestaurantState } from '../../../../slices/restaurantSlice';

import likeIcon from '../../../../icons/like-svgrepo-com.svg';
import dislikeIcon from '../../../../icons/dislike-svgrepo-com.svg';
import restphoto from '../../../../img/restaurantPhoto.jpeg';

import classes from './courierRating.module.scss';

const CourierRating = () => {
  return (
    <div className={classes.courierRating__active}>
      {/* <div
    className={active ? classes.restaurantRating__active : classes.confirmModal}
    /> */}
      <div className={classes.__wrapper}>
        <div className={classes.__image}>
          <img src={restphoto} alt="restaurant" />
          <h3>Courier Feedback</h3>
          <p>How did you courier <span>(name)</span> do?</p>
        </div>
        <div className={classes.__icons}>
          <button>
            <img src={dislikeIcon} alt="dislike" />
          </button>
          <button>
            <img src={likeIcon} alt="like" />
          </button>
        </div>
        <div className={classes.__text}>
          <p>Couriers are responsible for your order's transportation and handling.</p>
        </div>

        <Link to="../main">
          <div className={classes.__backButton}>
            <h4>Submit and Back to Menu</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourierRating;
