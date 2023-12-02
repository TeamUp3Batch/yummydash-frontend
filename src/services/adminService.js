import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const sendOTP = async (data) => {
  const url = `${apiUrl}/api/admin/sendOTP`;
  try {
    const response = await axios.post(url,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (data) => {
  const url = `${apiUrl}/api/admin/verifyOTP`;
  try {
    const response = await axios.post(url,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
