import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../../schema";
import * as authServices from "../../../../services/authService"; // Import your login service
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../../../slices/authSlice";




export const useLoginModal = ({ isOpen, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   
      loginSchema.parse(data);
      setError(null);

      dispatch(loginStart());
      const result = await authServices.login(data); 
      if (result.data.status === false) {
        dispatch(loginFailure(result.data.message));
      }
      if (result.data.status === true) {
        dispatch(loginSuccess(result.data));
        navigate("/main");
      }
    } catch (error) {
      if (error.errors) {
        setError(error.errors[0].message);
      }
    
    }
    onClose();
  };
  return {
    data,
    error,
    handleChange,
    handleSubmit,
  };
};
