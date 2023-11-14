import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../../../../slices/authSlice";
import * as authServices from "../../../../services/authService";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const dispatch = useDispatch();
  // Declare the following variables and functions
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  const [msg, setMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const result = await authServices.signUp(data); // Use the signUp function from the service
      if (result.data.status === false) {
        dispatch(signUpFailure(result.data.message));
      }
      setMsg(result.data.status);
      if (result.data.status === true) {
        dispatch(signUpSuccess(result.data));
        navigate("/main");
      }
      setOpenSnackbar(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setIsError(error.response.data.message);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return {
    isError,
    data,
    msg,
    openSnackbar,
    open,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    handleCloseSnackbar,
  };
};
