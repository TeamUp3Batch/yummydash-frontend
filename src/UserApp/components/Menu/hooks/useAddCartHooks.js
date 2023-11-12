import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartId } from "../../../../slices/menuSlice";
import { updateCartItem } from "../../../../services/cartService";
import { addToCart, updateCartItemQuantity  } from "../../../../slices/menuSlice";

export function useAddToCartHooks(restaurantId, menuItem) {
  const [count, setCount] = useState(1);
  const { loggedInUser } = useSelector((state) => state.auth);
  const selectCartId = useSelector((state) => state.menu.cartId);
  const cart = useSelector((state) => state.menu.cart);
  const dispatch = useDispatch();
 
  

  useEffect(() => {
    if (selectCartId !== null) {
      
      const cartItem = cart?.menuItems?.find((item) => {
        return item.itemId === menuItem?._id;
      });
      if (cartItem) {
        setCount(cartItem.quantity);
      }
      if(cartItem === undefined || cartItem === null){
        setCount(1);
      }
    }
  }, [selectCartId, cart, menuItem]);

  // Function to increment the count
  const increment = () => {
    setCount(count + 1);

  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addedToCart = async () => {
    let cartDetails = {};
    try {
      // Create cart details
      if (selectCartId !== null) {
        cartDetails = {
          restaurantId: restaurantId,
          userId: loggedInUser._id,
          menuId: menuItem._id,
          quantity: count,
          cartId: selectCartId,
        };
      } else {
        cartDetails = {
          restaurantId: restaurantId,
          userId: loggedInUser._id,
          menuId: menuItem._id,
          quantity: count,
          cartId: null,
        };
      }

      const result = await updateCartItem(cartDetails);
      dispatch(addToCart(result.data));
      dispatch(setCartId(result.data._id));
      dispatch(updateCartItemQuantity({ menuId: menuItem._id, quantity: count })); // Update item count
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return {
    count,
    increment,
    decrement,
    addedToCart
  };
}
