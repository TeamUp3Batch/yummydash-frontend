import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const getTotalUsers = async () => {
  const url = `${apiUrl}/api/dashboard/getTotalUsers`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalRestaurants = async () => {
  const url = `${apiUrl}/api/dashboard/getTotalRestaurants`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalDrivers = async () => {
  const url = `${apiUrl}/api/dashboard/getTotalDrivers`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSalesPerWeek = async () => {
  const url = `${apiUrl}/api/dashboard/getSalesPerWeek`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSalesPerMonth = async () => {
  const url = `${apiUrl}/api/dashboard/getSalesPerMonth`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopPerformingDriver = async () => {
  const url = `${apiUrl}/api/dashboard/getTopPerformingDriver`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalOrdersDelivered = async () => {
  const url = `${apiUrl}/api/dashboard/getTotalOrdersDelivered`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopPerformingRestaurant = async () => {
  const url = `${apiUrl}/api/dashboard/getTopPerformingRestaurant`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
