import React, { useState } from 'react';

import CloseIcon from '../../../icons/icons8-close.svg';
import PlusIcon from '../../../icons/icons8-plus-25.png';
import MinusIcon from '../../../icons/icons8-minus-25.png';
import classes from './dishModal.module.scss';

const DishModal = ({ active, setActive, type }) => {
  const [count, setCount] = useState(1);

  const plus = () => {
    setCount(count + 1);
  };

  const minus = () => {
    count > 1 ? setCount(count - 1) : setCount(count);
  };
  return (
    <div className={active ? classes.dishModal__active : classes.dishModal}>
      <div className={classes.dishModal__wrapper}>
        <div className={classes.dishModal__wrapper__inside}>
          <div className={classes.dishModal__inside__header}>
            <button onClick={() => setActive(false)}>
              <img src={CloseIcon} alt="close Button" />
            </button>
          </div>
          <div className={classes.dishModal__inside__main}>
            <h4>Name of Dishes</h4>
            <p>description</p>
            <div className={classes.dishModal__inside__count}>
              <div className={classes.count}>
                <button onClick={minus}>
                  <img src={MinusIcon} alt="Minus" />
                </button>
                <h2>{count}</h2>
                <button onClick={plus}>
                  <img src={PlusIcon} alt="Plus" />
                </button>
              </div>
            </div>
            <p>Send Menu Feedback</p>
          </div>
          <div className={classes.dishModal__inside__footer}>
            <div className={classes.dishModal__footer__button}>
              <button>
                <p>Add To Cart</p>
                <p>$ {(count * 15.74).toFixed(2)}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishModal;
