import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartId } from "../../../slices/menuSlice";
import { updateCartItem } from "../../../services/cartService";
import { addToCart, updateCartItemQuantity  } from "../../../slices/menuSlice";

export function useAddToCartHooks(restaurantId, menuItem) {
  const [count, setCount] = useState(1);
  const { loggedInUser } = useSelector((state) => state.auth);
  const selectCartId = useSelector((state) => state.menu.cartId);
  const cart = useSelector((state) => state.menu.cart); // Get the cart from the Redux store
  const dispatch = useDispatch();
  console.log("selectCartId", selectCartId);

  useEffect(() => {
    if (selectCartId !== null) {
      
      console.log("here we go",selectCartId)
      console.log("cart.menuitems",cart.menuItems)
      console.log("menuitem",menuItem)
      const cartItem = cart.menuItems.find((item) => {
        console.log("item.menuId:", item.itemId); 
        console.log("item.menuId2:", menuItem._id); 
        return item.itemId === menuItem._id;
      });
      console.log("cartItem",cartItem)
      
      if(cartItem === undefined || cartItem === null){
        setCount(1);
      }
      if (cartItem) {
        console.log("give me count",cartItem.quantity)
        setCount(cartItem.quantity);
      }
    }
  }, [selectCartId, cart, menuItem]);

  // Function to increment the count
  const increment = () => {
    setCount(count + 1);
    console.log("incremented code",count)
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      console.log("decremented",count)
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
      console.log("cartdetails",cartDetails)

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
