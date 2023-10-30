import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const getCuisineList = async () => {
  const url = `${apiUrl}/api/cuisines/getAllCuisines`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantsByCuisine = async (selectedCuisine) => {
  const url = `${apiUrl}/api/restaurants/getRestaurantsByCuisine/?cuisine=${selectedCuisine}`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    throw error;
  }
};
export const getRestaurantsBySort = async (selectedSort) => {
  const url = `${apiUrl}/api/restaurants/getRestaurantMenusByPrice`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    throw error;
  }
};
export const getRestaurantDetailsById = async (selectedId) => {
  const url = `${apiUrl}/api/restaurants/getRestaurantDetailsById/?restaurantId=${selectedId}`;
  try {
    const result = await axios.post(url);
    return result.data;
  } catch (error) {
    throw error;
  }
};
