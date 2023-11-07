// import { useState } from 'react';
// import { addToCartItem, removeFromCartItem } from '../../../services/cartServices'
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../slices/menuSlice";
// import { removeFromCart } from "../../../slices/menuSlice";
// import { setCartId } from "../../../slices/menuSlice";



// export function useAddToCartHooks(restaurantId, menuItem) {
//   const [count, setCount] = useState(1);
//   const { loggedInUser } = useSelector((state) => state.auth);
//   const { cart } = useSelector((state) => state.menu);
//   const selectCartId = useSelector((state) => state.menu.cartId);

//   const dispatch = useDispatch();
  

//     const increment = async () => {
//         try {
//           setCount(count + 1);
          
//           // Create cart details
//           const cartDetails = {
//             restaurantId: restaurantId,
//             userId: loggedInUser._id,
//             menuId: menuItem._id,
//             quantity: count + 1,
//             cartId: selectCartId ? selectCartId : null,
//           };
//           const result = await addToCartItem(cartDetails);
//           dispatch(addToCart(result.data.cart));
//           dispatch(setCartId(result.data.cart._id));
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       };

//   const decrement = async () => {
    
   
//     try {
       
//         if (count > 1) {
//             setCount(count - 1);
//           }

//         const removeItem = {
//             menuId: menuItem._id,
//             quantity: count - 1,
//             cartId: cart ? cart._id : null,
//           };
//         const result = await removeFromCartItem(removeItem);
//         dispatch(removeFromCart(result.data.cart));
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//   return {
//     count,
//     increment,
//     decrement,
//   };
// }

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartId } from '../../../slices/menuSlice';
import { addToCartItem } from '../../../services/cartService';
import { addToCart } from "../../../slices/menuSlice";

export function useAddToCartHooks(restaurantId, menuItem) {
  const [count, setCount] = useState(1);
  const { loggedInUser } = useSelector((state) => state.auth);
  const selectCartId = useSelector((state) => state.menu.cartId);
  const dispatch = useDispatch();
  console.log('selectCartId', selectCartId)

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
      setCount(count + 1);
      
      // Create cart details
      if(selectCartId !== null){
        cartDetails = {
          restaurantId: restaurantId,
          userId: loggedInUser._id,
          menuId: menuItem._id,
          quantity: count ,
          cartId: selectCartId,
        };
      }else{
        cartDetails = {
          restaurantId: restaurantId,
          userId: loggedInUser._id,
          menuId: menuItem._id,
          quantity: count ,
          cartId:  null,
        };
      }
    
      const result = await addToCartItem(cartDetails);
      dispatch(addToCart(result.data.cart));
      dispatch(setCartId(result.data.cart._id));
    } catch (error) {
      console.error('Error:', error);
    }

    };



  useEffect(() => {
    
  }, [count]);

  return {
    count,
    increment,
    decrement,
    addedToCart,
  };
}
