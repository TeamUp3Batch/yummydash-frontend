import React from 'react';

import classes from './modal.module.scss';

const ToolTipModal = ({ active, setActive }) => {
  return (
    <div className={active ? classes.modal__active : classes.modal}>
      <div className={classes.modal__wrapper}>
        <div className={classes.modal__wrapper_text}>
          <h4>Delivery Fees</h4>
          <p>
            Delivery is $0
          </p>
          <h4>Service Fee</h4>
          <p>
           No Service Fees
          </p>
        </div>
        <div className={classes.modal__wrapper_button} onClick={() => setActive(false)}>
          <h4>OK</h4>
        </div>
      </div>
    </div>
  );
};

export default ToolTipModal;
