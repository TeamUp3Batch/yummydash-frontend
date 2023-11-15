import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signUpPartnerStart,
  signUpPartnerSuccess,
  signUpPartnerFailure,
  loginPartnerStart,
  loginPartnerSuccess,
  loginPartnerFailure,
} from "../../../../slices/partnerSlice";
import * as partnerService from "../../../../services/partnerService";
import { useNavigate } from "react-router-dom";

export const usePartnerSignUp = () => {
  const dispatch = useDispatch();
  // Declare the following variables and functions
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
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
  const handleLoginChange = ({ currentTarget: input }) => {
    setLoginData({ ...loginData, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpPartnerStart());
      const result = await partnerService.partnerRegister(data); // Use the signUp function from the service
      if (result.data.status === false) {
        dispatch(signUpPartnerFailure(result.data.message));
      }
      setMsg(result.data.status);
      if (result.data.status === true) {
        dispatch(signUpPartnerSuccess(result.data));
        navigate("/restaurantDashboard");
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
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginPartnerStart());
      const result = await partnerService.partnerLogin(loginData); // Use the signUp function from the service
      if (result.data.status === false) {
        dispatch(loginPartnerFailure(result.data.message));
      }
      setMsg(result.data.status);
      if (result.data.status === true) {
        dispatch(loginPartnerSuccess(result.data));
        navigate("/restaurantDashboard");
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


  return {
    isError,
    data,
    msg,
    open,
    loginData,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    handleLoginSubmit,
    handleLoginChange,
  };
};
