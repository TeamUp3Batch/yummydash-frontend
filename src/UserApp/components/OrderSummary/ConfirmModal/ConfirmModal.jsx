import React from 'react';
import { Link } from 'react-router-dom';

import CheckIconBlack from '../../../../icons/check-circle-black.svg';
import CheckIconOrange from '../../../../icons/check-circle-orange.svg';
import HomeVideo from '../../../../img/house.mp4';
import classes from './confirmModal.module.scss';

const ConfirmModal = ({ active, setActive }) => {
  return (
    <div className={active ? classes.confirmModal__active : classes.confirmModal}>
      <div className={classes.confirmModal__wrapper}>
        <div className={classes.confirmModal__wrapper_text}>
          <img src={CheckIconBlack} alt="Check Icon" />
          <br />
          <video src={HomeVideo} loop autoPlay muted></video>
          <h4>Order Confirmed</h4>
          <p>Restaurant has confirmed your order and will be responsible for its packaging</p>

          <div className={classes.confirmModal__group}>
            <div>
              <img src={CheckIconOrange} alt="Check Icon" />
              <p>Accurancy</p>
            </div>
            <div>
              <img src={CheckIconOrange} alt="Check Icon" />
              <p>Packaging</p>
            </div>
          </div>
          <Link to="../delivery">
            <div className={classes.confirmModal__wrapper_button} onClick={() => setActive(false)}>
              <h4>I UNDERSTAND</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
