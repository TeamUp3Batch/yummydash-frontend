import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const saveAddress = async (data) => {
  const url = `${apiUrl}/api/users/addNewAddress`;
  try {
    const result = await axios.post(url, data);
    if (result.status === 201) {
      return result.data.address;
    } else if (result.status === 400) {
      throw new Error("Bad Request");
    } else if (result.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Server Error");
    }
  } catch (error) {
    throw error;
  }
};

export const updatePrimaryAddress = async (selectedAddress) => {
  
  const url = `${apiUrl}/api/users/updatePrimaryAddress`;
  try {
    const result = await axios.post(url, selectedAddress);

    if (result.status === 201) {
      return result.data.address;
    } else if (result.status === 400) {
      throw new Error("Bad Request");
    } else if (result.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Server Error");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUserAddress = async (data) => {
  
  const url = `${apiUrl}/api/users/deleteUserAddress`;
  try {
    const result = await axios.post(url, data);
    if (result.status === 201) {
      return result.data.addresses;
    } else if (result.status === 400) {
      throw new Error("Bad Request");
    } else if (result.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Server Error");
    }
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  const url = `${apiUrl}/api/users/getAllUsers`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const updateUserProfile = async (data) => {

  const url = `${apiUrl}/api/users/updateUserProfileByEmail`;
  
  try {
    const result = await axios.post(url, data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async () => {
  const url = `${apiUrl}/api/users/getAllUsersForSalesforce`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}
