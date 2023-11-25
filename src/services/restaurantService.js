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

export const getRestaurantsByCuisine = async (
  selectedCuisine,
  selectedSort
) => {
  const url = `${apiUrl}/api/restaurants/getRestaurantsByCuisine/?cuisine=${selectedCuisine}&sort=${selectedSort}`;
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
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const restaurantSearch = async (searchQuery) => {
  const url = `${apiUrl}/api/restaurants/restaurantSearch/?searchItem=${searchQuery}`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    throw error;
  }
};
