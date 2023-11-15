import React from 'react';
import { Link } from 'react-router-dom';

import clockIcon from '../../../icons/clock-two-svgrepo-com.svg';
import starIcon from '../../../icons/star-svgrepo-com.svg';
import classes from './restauranrCard.module.scss';

const RestaurantCard = ({ cardDetails }) => {
  return (
    <div className={classes.restaurantCard} key={cardDetails._id}>
      <Link to={`/menu/${cardDetails._id}`}>
        <div className={classes.restaurantCard__wrapper}>
          <div className={classes.__image}>
            <img src={cardDetails.restaurantImage} alt="Restaurant" />
          </div>
          <div className={classes.__name}>
            <h3>{cardDetails.name}</h3>
            <p>{cardDetails.description}</p>
          </div>
          <div className={classes.__additional}>
            <div className={classes.__wrapper}>
              <div className={classes.__first}>
                <img src={clockIcon} alt="Clock" />
                <p>
                  {cardDetails.estimatedDeliveryTime.minEstimatedTime} -{' '}
                  {cardDetails.estimatedDeliveryTime.maxEstimatedTime} mins • $0.99 Delivery Fee{' '}
                </p>
              </div>
              <div className={classes.__second}>
                <img src={starIcon} alt="star" width="15px" />
                <p>{cardDetails.ratings}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
