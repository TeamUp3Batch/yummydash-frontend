import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '../../../icons/icons8-close.svg';
import PlusIcon from '../../../icons/icons8-plus-25.png';
import MinusIcon from '../../../icons/icons8-minus-25.png';
import classes from './dishModal.module.scss';
import { useAddToCartHooks } from '../hooks/useAddCartHooks';

const DishModal = ({ active, setActive, restaurantId, menuItem }) => {
  const { count, plus, minus, addedToCart } = useAddToCartHooks(restaurantId, menuItem);
  const [yourOrder, setYourOrder] = useState([]);

  // Define the function to add to your order
  const addToYourOrder = () => {
    setYourOrder([...yourOrder, menuItem]);
    console.log('your order ***', yourOrder);
  }

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
            <h4>{menuItem ? menuItem.name : 'Name'}</h4>
            <p>{menuItem ? menuItem.description : 'Description'}</p>
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
          </div>
          <div className={classes.dishModal__inside__footer}>
            <div className={classes.dishModal__footer__button}>
              <button onClick={addToYourOrder}>
                <p>Add To Cart</p>
                <p>$ {(count * (menuItem ? menuItem.price : 0))}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishModal;
