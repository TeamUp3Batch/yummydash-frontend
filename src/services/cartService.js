import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const addToCartItem = async (data) => {
    const url = `${apiUrl}/api/cart/addToCart`;
    try {
      const result = await axios.post(url, data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const removeFromCartItem = async (data) => {
    const url = `${apiUrl}/api/cart/removeFromCart`;
    try {
      const result = await axios.post(url, data);
      return result; 
    } catch (error) {
      throw error;
    }
  }

  
  export const updateCartItem = async (data) => {
    const url = `${apiUrl}/api/cart/updateCart`;
    try {
      const result = await axios.post(url, data);
      return result; 
    } catch (error) {
      throw error;
    }
  }

  export const deleteCart = async (data) => {
    const url = `${apiUrl}/api/cart/removeItemOrRemoveCart`;
    try {
      const result = await axios.post(url, data);
      return result; 
    } catch (error) {
      throw error;
    }
  }