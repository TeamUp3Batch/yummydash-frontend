import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const saveAddress = async (data) => {
    const url = `${apiUrl}/api/users/addNewAddress`;
    try {
      const result = await axios.post(url, data);
      if (result.status === 201) {
        return result.data.address;
      }
    } catch (error) {
      throw error;
    }
  };