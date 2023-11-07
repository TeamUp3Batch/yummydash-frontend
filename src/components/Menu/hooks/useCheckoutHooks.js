import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { proceedToCheckout } from "../../../services/paymentService";
import { checkout } from "../../../slices/menuSlice"
export function useCheckoutHooks(restaurantDetails) {
  const { loggedInUser } = useSelector((state) => state.auth);
  const selectCartId = useSelector((state) => state.menu.cartId);
  const cart = useSelector((state) => state.menu.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const proceedCheckout = async () => {
    try {
      // Create cart 
      const restaurantId = restaurantDetails._id;
      if (restaurantId !== null && cart !== null) {
        const userId = loggedInUser._id;
        const cartId = selectCartId
        const data = await proceedToCheckout({ cartId, restaurantId, userId });
        console.log("checkout data", data);
        if (data.status === "success") {
          dispatch(checkout(data));
          navigate("/order");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    proceedCheckout,
  };
}
