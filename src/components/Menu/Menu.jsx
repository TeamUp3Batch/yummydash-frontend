import React from 'react';
import { useEffect, useState } from 'react';

//Axios
import axios from 'axios';
import { MenuURL } from '../../api/ApiLinks';

//Icons
import Star from '../../icons/star-svgrepo-com.svg';
import Info from '../../icons/info-circle-svgrepo-com.svg';

import classes from './menu.module.scss';

const Menu = () => {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    axios.get(MenuURL).then((response) => setMenuList(response.data));
  }, []);

  return (
    <div>
      {menuList.map((restaurants) => (
        <div key={restaurants._id}>
          {restaurants._id === '651e32d67a5bb9de20aaf7ec' ? (
            <div className={classes.restaurantMenu__wrapper}>
              <div className={classes.restauranMenu__header}>
                <div className={classes.restaurantMenu__photo__wrapper}>
                  <img src={restaurants.restaurantImage} alt={restaurants.name} />
                </div>
                <div className={classes.restauranMenu__text__wrapper}>
                  <h1>{restaurants.name}</h1>
                  <div className={classes.restauranMenu_add_container}>
                    <div className={classes.restauranMenu__add_text}>
                      <img src={Star} width="16px" alt="icon star" />
                      <p>{restaurants.ratings}</p>
                      <span> | </span>
                      <p>{restaurants.address.street}</p>
                      <span> | </span>
                      <p>30 - 60 min</p>
                      <span> | </span>
                      <a href="#">Service fee apply</a>
                      <p>$0.99 Delivery Fee</p>
                    </div>
                    <div className={classes.restauranMenu__add_search}>
                      <img src={Info} alt="icon info" />
                      <input placeholder="Search menu" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={classes.restauranMenu__main}>
                <div className={classes.restauranMenu__main__header}>
                  <div className={classes.restauranMenu__main__first}>
                    <h1>Place Settings</h1>
                    <p>
                      Please list the amount of place settings that you'd like, along with your
                      order.
                    </p>
                  </div>
                  <div className={classes.restauranMenu__main__second}>
                    <h1>Popular Items</h1>
                    <p>Check out the most popular items on the menu.</p>
                  </div>
                </div>

                {restaurants.menu.map((type) => (
                  <button key={type._id} className={classes.restauranMenu__dishes__wrapper}>
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
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
