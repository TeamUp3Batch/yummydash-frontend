import React from 'react';

import classes from './modal.module.scss';

const Modal = ({ active, setActive }) => {
  return (
    <div className={active ? classes.modal__active : classes.modal}>
      <div className={classes.modal__wrapper}>
        <div className={classes.modal__wrapper_text}>
          <h4>Delivery Fees</h4>
          <p>
            Delivery is $0.99 based on the drive time to your location. You must have a food and
            beverage subtotal over $15 to order.
          </p>
          <h4>Service Fee</h4>
          <p>
            A 10% service fee applies ($2.00 min - $5.00 max). The exact amount of service fee will
            be displayed at checkout. Our service fee allows Skip to maintain strong service levels
            in order to better serve our local partners and continue to provide more variety to our
            customers.
          </p>
          <h4>Today's Delivery Hours</h4>
          <p>
            12:00 AM - 2:00 AM
            <br />
            6:00 AM - 2:30 AM
          </p>
        </div>
        <div className={classes.modal__wrapper_button} onClick={() => setActive(false)}>
          <h4>OK</h4>
        </div>
      </div>
    </div>
  );
};

export default Modal;
