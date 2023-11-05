import React, { useState } from 'react';

import Modal from './Modal/Modal';
import DishModal from './DishModal/DishModal';

import Star from '../../icons/star-svgrepo-com.svg';
import Info from '../../icons/info-circle-svgrepo-com.svg';
import classes from './menu.module.scss';

const Menu = ({ restaurantDetails }) => {
  const [modalActive, setModalActive] = useState(false);
  const [dishModalActive, setDishModalActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  if (!restaurantDetails) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div key={restaurantDetails._id}>
        <div className={classes.restaurantMenu__wrapper}>
          <div className={classes.restauranMenu__header}>
            <div className={classes.restaurantMenu__photo__wrapper}>
              <img src={restaurantDetails.restaurantImage} alt={restaurantDetails.name} />
            </div>
            <div className={classes.restauranMenu__text__wrapper}>
              <h1>{restaurantDetails.name}</h1>
              <div className={classes.restauranMenu_add_container}>
                <div className={classes.restauranMenu__add_text}>
                  <img src={Star} width="16px" alt="icon star" />
                  <p>{restaurantDetails.ratings}</p>
                  <span> | </span>
                  <p>{restaurantDetails.address.street}</p>
                  <span> | </span>
                  <p>
                    {restaurantDetails.estimatedDeliveryTime.minEstimatedTime} -{' '}
                    {restaurantDetails.estimatedDeliveryTime.maxEstimatedTime} mins
                  </p>
                  <span> | </span>
                  <button onClick={() => setModalActive(true)}>Service fee apply</button>
                  <p>$0.99 Delivery Fee</p>
                </div>
                <div className={classes.restauranMenu__add_search}>
                  <button onClick={() => setModalActive(true)}>
                    <img src={Info} alt="icon info" />
                    <span className={classes.restauranMenu__add_search_tooltip}>More Info</span>
                  </button>
                  <input
                    onChange={onChangeSearchValue}
                    value={searchValue}
                    placeholder="Search menu"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.restauranMenu__main}>
            <div className={classes.restauranMenu__main__header}>
              <div className={classes.restauranMenu__main__first}>
                <h1>Place Settings</h1>
                <p>
                  Please list the amount of place settings that you'd like, along with your order.
                </p>
              </div>
              <div className={classes.restauranMenu__main__second}>
                <h1>Popular Items</h1>
                <p>Check out the most popular items on the menu.</p>
              </div>
            </div>

            {restaurantDetails.menu
              .filter((type) => type.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((type) => (
                <button key={type._id} className={classes.restauranMenu__dishes__wrapper} onClick={() => setDishModalActive(true)}>
                  <div className={classes.restauranMenu__dishes__inside}>
                    <p>Category: {type.category}</p>
                    <div>
                      <h3>{type.name}</h3>
                      <p>{type.description}</p>
                      <h4>${type.price}</h4>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      <Modal active={modalActive} setActive={setModalActive} />
      <DishModal active={dishModalActive} setActive={setDishModalActive} />
    </div>
  );
};

export default Menu;