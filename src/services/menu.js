import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const Cuisines = async () => {
  const RestURL = `${apiUrl}/api/cuisines/getAllRestaurants`;
  try {
    const response = await axios.get(RestURL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Menu = async () => {
  const MenuURL = `${apiUrl}/api/restaurants/getAllRestaurants`;
  try {
    const response = await axios.get(MenuURL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
