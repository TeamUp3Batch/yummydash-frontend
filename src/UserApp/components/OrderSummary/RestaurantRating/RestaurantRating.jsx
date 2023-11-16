import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetMenuState } from "../../../../slices/menuSlice";
import { resetRestaurantState } from "../../../../slices/restaurantSlice";
import likeIcon from "../../../../icons/like-svgrepo-com.svg";
import dislikeIcon from "../../../../icons/dislike-svgrepo-com.svg";
import restphoto from "../../../../img/restaurantPhoto.jpeg";
import { updateRestaurantRatingByUser } from "../../../../services/cartService";

import classes from "./restaurantRating.module.scss";

const RestaurantRating = ({
  active,
  setActive,
  cartId,
  userId,
  restaurantId,
  restaurantName
}) => {
  const dispatch = useDispatch();
  const [userRating, setUserRating] = useState(null);

  const handleLikeClick = () => {
    setUserRating(5);
  };

  const handleDislikeClick = () => {
    setUserRating(0);
  };

  const submitRating = async () => {
    if (userRating !== null) {
      try {
        const data = {
          cartId: cartId,
          userId: userId,
          restaurantId: restaurantId,
          restaurantRating: userRating,
        };
        const response = await updateRestaurantRatingByUser(data);

        // Handle response as needed
        if (response.ok) {
          // Handle success (e.g., show a success message)
        } else {
          // Handle failure (e.g., show an error message)
        }
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
      dispatch(resetMenuState());
      dispatch(resetRestaurantState());
      setActive(false);
    } else {
      // Handle if the user hasn't selected a rating (optional)
    }
  };

  return (
    // <div className={active ? classes.confirmModal__active : classes.confirmModal}>
    <div
      className={
        active ? classes.restaurantRating__active : classes.confirmModal
      }
    >
      <div className={classes.__wrapper}>
        <div className={classes.__image}>
          <img src={restphoto} alt="restaurant" />
        </div>
        <div className={classes.__icons}>
          <button onClick={handleDislikeClick}>
            <img src={dislikeIcon} alt="dislike" />
          </button>
          <button onClick={handleLikeClick}>
            <img src={likeIcon} alt="like" />
          </button>
        </div>
        <div className={classes.__text}>
          <p>Let {restaurantName} know about your experience.</p>
        </div>

        <Link to="../main">
          <div className={classes.__backButton} onClick={submitRating}>
            <h4>Submit and Back to Menu</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantRating;
