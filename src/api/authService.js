import axios from 'axios'
const API_URL = process.env.REACT_APP_BACKEND_URL;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
  try {
    const url = `${API_URL}/api/users/signup`;
    const result = await axios.post(url, data);
    console.log("res", result);
    setMsg(result.data.status);
    if (result.data.status === "success") {
      sessionStorage.setItem("token", result.data.token);
      sessionStorage.setItem(
        "userName",
        JSON.stringify(result.data.firstName)
      );
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("email", result.data.email);
      navigate("/main");
    }
    setOpenSnackbar(true);
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      setError(error.response.data.message);
    }
  }
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService