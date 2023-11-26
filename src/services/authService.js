import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const signUp = async (data) => {
  const url = `${apiUrl}/api/users/signup`;
  try {
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
    const url = `${apiUrl}/api/auth/login`;
    try {
      const result = await axios.post(url, data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  