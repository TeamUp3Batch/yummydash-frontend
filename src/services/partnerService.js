import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const partnerRegister = async (data) => {
  const url = `${apiUrl}/api/partner/registerPartner`;
  try {
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const partnerLogin = async (data) => {
    const url = `${apiUrl}/api/partner/login`;
    try {
      const result = await axios.post(url, data);
      return result;
    } catch (error) {
      throw error;
    }

};
export const getMenuItemsByRestaurant = async (selectedId) => {
  const url = `${apiUrl}/api/restaurants/getMenuItemsByRestaurant/?restaurantId=${selectedId}`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export const addMenuItemToRestaurant = async (data) => {
  const url = `${apiUrl}/api/menu/addMenuItemToRestaurant`;
  try {
    const result = await axios.post(url, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMenuItem = async (data) => {
  const url = `${apiUrl}/api/menu/deleteMenuItem`;
  try {
    const result = await axios.post(url, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateMenuItemToRestaurant = async (data) => {
  const url = `${apiUrl}/api/menu/updateMenuItemToRestaurant`;
  try {
    const result = await axios.post(url, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPartners = async () => {
  const url = `${apiUrl}/api/partner/getAllPartners`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};


