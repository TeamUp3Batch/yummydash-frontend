import React, { useState } from "react";

import Modal from "./Modal/Modal";
import DishModal from "./DishModal/DishModal";

import Star from "../../icons/star-svgrepo-com.svg";
import Info from "../../icons/info-circle-svgrepo-com.svg";
import Close from "../../icons/icons8-close.svg";
import emptyCart from "../../icons/icons8-food-bag-100.png";
import classes from "./menu.module.scss";

const Menu = ({ restaurantDetails }) => {
  const [modalActive, setModalActive] = useState(false);
  const [dishModalActive, setDishModalActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  // Handle menu item click
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setDishModalActive(true);
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
              <img
                src={restaurantDetails.restaurantImage}
                alt={restaurantDetails.name}
              />
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
                    {restaurantDetails.estimatedDeliveryTime.minEstimatedTime} -{" "}
                    {restaurantDetails.estimatedDeliveryTime.maxEstimatedTime}{" "}
                    mins
                  </p>
                  <span> | </span>
                  <button onClick={() => setModalActive(true)}>
                    Service fee apply
                  </button>
                  <p>$0.99 Delivery Fee</p>
                </div>
                <div className={classes.restauranMenu__add_search}>
                  <button onClick={() => setModalActive(true)}>
                    <img src={Info} alt="icon info" />
                    <span className={classes.restauranMenu__add_search_tooltip}>
                      More Info
                    </span>
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
            <div className={classes.empty}>
              <Modal active={modalActive} setActive={setModalActive} />
              <DishModal
                active={dishModalActive}
                setActive={setDishModalActive}
                restaurantId={restaurantDetails._id}
                menuItem={selectedMenuItem} 
              />
            </div>
            <div className={classes.restauranMenu__main__wrapper}>
              <div className={classes.restauranMenu__main__header}>
                <div className={classes.restauranMenu__main__first}>
                  <h1>Place Settings</h1>
                  <p>
                    Please list the amount of place settings that you'd like,
                    along with your order.
                  </p>
                </div>
                <div className={classes.restauranMenu__main__second}>
                  <h1>Popular Items</h1>
                  <p>Check out the most popular items on the menu.</p>
                </div>
              </div>

              {restaurantDetails.menu
                .filter((type) =>
                  type.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((type) => (
                  <button
                    key={type._id}
                    className={classes.restauranMenu__dishes__wrapper}
                    onClick={() => handleMenuItemClick(type)} // Pass the clicked menu item
                  >
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
            <div className={classes.restaurantMenu__checkout}>
              {/* <div className={classes.checkout__empty}>
                <img src={emptyCart} alt="Empty Cart" />
                <h3>Start adding items from the menu to build your order.</h3>
              </div> */}

              <div className={classes.checkout__cart}>
                <h3>Your order</h3>
                <div className={classes.checkout__itemRow}>
                  <div
                    className={classes.checkout__item}
                    onClick={() => setDishModalActive(true)}
                  >
                    <p className={classes.checkout__cart__quantity}>5</p>
                    <p className={classes.checkout__cart__name}>Coca-Cola</p>
                    <p className={classes.checkout__cart__price}>$25</p>
                  </div>

                  <button>
                    <img src={Close} alt="Close" />
                  </button>
                </div>
                <div className={classes.checkout__itemRow}>
                  <div
                    className={classes.checkout__item}
                    onClick={() => setDishModalActive(true)}
                  >
                    <p className={classes.checkout__cart__quantity}>5</p>
                    <p className={classes.checkout__cart__name}>Coca-Cola</p>
                    <p className={classes.checkout__cart__price}>$25</p>
                  </div>

                  <button>
                    <img src={Close} alt="Close" />
                  </button>
                </div>

                <div className={classes.checkout__total}>
                  <div className={classes.checkout__total__header}>
                    <h4>Food & Beverage Subtotal</h4>
                    <h4>$25</h4>
                  </div>
                  <button>
                    <h3>Checkout</h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
