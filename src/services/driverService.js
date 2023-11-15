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
