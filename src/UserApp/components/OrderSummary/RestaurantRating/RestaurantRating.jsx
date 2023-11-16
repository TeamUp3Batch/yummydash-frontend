import React from 'react';
import { Link } from 'react-router-dom';

import likeIcon from '../../../../icons/like-svgrepo-com.svg';
import dislikeIcon from '../../../../icons/dislike-svgrepo-com.svg';
import restphoto from '../../../../img/restaurantPhoto.jpeg';

import classes from './restaurantRating.module.scss';

const RestaurantRating = ({ active, setActive }) => {
  return (
    // <div className={active ? classes.confirmModal__active : classes.confirmModal}>
    <div className={classes.restaurantRating__active}>
      <div className={classes.__wrapper}>
        <div className={classes.__image}>
          <img src={restphoto} alt="restaurant" />
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
          <p>Let (Restaurant name) know about your experience.</p>
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

export default RestaurantRating;
