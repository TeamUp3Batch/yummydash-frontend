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
