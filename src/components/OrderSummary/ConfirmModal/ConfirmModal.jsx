import React from 'react';
import { Link } from 'react-router-dom';

import CheckIconBlack from '../../../icons/check-circle-black.svg';
import CheckIconOrange from '../../../icons/check-circle-orange.svg';
import HomeVideo from '../../../img/WhatsApp Video 2023-11-04 at 17.50.57_19e1579d.mp4';
import classes from './confirmModal.module.scss';

const ConfirmModal = ({ active, setActive }) => {
  const buttonEvent = () => {
    setActive(false);
  };

  return (
    <div className={classes.confirmModal__active}>
      <div className={classes.confirmModal__wrapper}>
        <div className={classes.confirmModal__wrapper_text}>
          <img src={CheckIconBlack} alt="Check Icon" />
          <br />
          <video src={HomeVideo} loop autoPlay muted></video>
          <h4>Order Confirmed</h4>
          <p>Restaurant has confirmed your order and will be responsible for its:</p>

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
          <Link to="../main">
            <div className={classes.confirmModal__wrapper_button} onClick={buttonEvent}>
              <h4>I UNDERSTAND</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
