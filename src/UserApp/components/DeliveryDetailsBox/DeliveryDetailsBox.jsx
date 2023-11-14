import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import clockTwo from '../../../icons/clock-two-svgrepo-com.svg';
import addressProfile from '../../../icons/profile-user-with-earth-symbol-svgrepo-com.svg';

import classes from './DeliveryDetailsBox.module.scss';

const DeliveryDetailsBox = () => {
  const { checkout } = useSelector((state) => state.menu);
  return (
    <div className={classes.deliveryBox}>
      <div className={classes.deliveryBox__wrapper}>
        <div className={classes.deliveryBox__header}>
          <h3>Your Delivery</h3>
          <Link to='../main'>
            <button>
              <p>Back to Menu</p>
            </button>
          </Link>
        </div>
        <div className={classes.deliveryBox__time}>
          <img src={clockTwo} alt="Clock" />
          <p>{checkout.estimatedTime} mins</p>
        </div>
        <div className={classes.deliveryBox__address}>
          <img src={addressProfile} alt="Address Profile" />
          <p>{checkout.userAddress.userAddress1}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailsBox;
