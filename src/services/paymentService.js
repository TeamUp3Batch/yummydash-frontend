import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;


export const proceedToCheckout = async(data) =>{
  const url = `${apiUrl}/api/cart/checkout`;
    try {
    const result = await axios.post(url,data);
    return result.data;
  } catch (error) {
    throw error;
  }

}

export const fetchClientSecret = async (data) => {
  const url = `${apiUrl}/api/cart/placeOrder`;
  try {
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (data) => {
  const url = `${apiUrl}/api/cart/updateOrderStatus`;
  try {
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    throw error;
  }
};