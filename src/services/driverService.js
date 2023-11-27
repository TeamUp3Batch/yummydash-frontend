import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const driverRegister = async (data) => {
  const url = `${apiUrl}/api/driver/registerDriver`;
  try {
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const driverLogin = async (data) => {
  const url = `${apiUrl}/api/driver/login`;
  try {
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getReadyOrders = async () => {
  const url = `${apiUrl}/api/driver/getReadyOrders`;
  try {
    const result = await axios.get(url);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getOrdersPickedByDriver = async (driverId) => {
  const url = `${apiUrl}/api/driver/getOrdersPickedByDriver?driverId=${driverId}`;
  try {
    const result = await axios.get(url);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getOrdersCompletedByDriver = async (driverId) => {
  const url = `${apiUrl}/api/driver/getOrdersCompletedByDriver?driverId=${driverId}`;
  try {
    const result = await axios.get(url);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getDriverProfile = async (driverId) => {
  const url = `${apiUrl}/api/driver/getDriverProfile?driverId=${driverId}`;
  try {
    const result = await axios.get(url);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllDrivers = async () => {
  const url = `${apiUrl}/api/driver/getAllDrivers`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDriverDetails = async (data) =>{
  const url = `${apiUrl}/api/driver/updateDriverDetails`;
  try {
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    throw error;
  }
  
}
