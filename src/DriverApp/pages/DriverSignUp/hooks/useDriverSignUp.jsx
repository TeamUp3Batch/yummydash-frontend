// useDriverSignUp

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginDriverStart,
  loginDriverSuccess,
  signUpDriverFailure,
  signUpDriverSuccess,
  loginDriverFailure,
} from "../../../../slices/driverSlice";
import * as driverService from "../../../../services/driverService";
import { useNavigate } from "react-router-dom";

export const useDriverSignUp = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
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
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [open, setOpen] = React.useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLoginChange = ({ currentTarget: input }) => {
    setLoginData({ ...loginData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginDriverStart());
      const result = await driverService.driverRegister(data);
      if (result.data.status === false) {
        dispatch(signUpDriverFailure(result.data.message));
      }
      setMsg(result.data.status);
      if (result.data.status === true) {
        dispatch(signUpDriverSuccess(result.data));
        console.log("result data", result.data);
        navigate("/driverDashboard");
      }
      // setOpenSnackbar(true);
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
      dispatch(loginDriverStart());
      const result = await driverService.driverLogin(loginData);
      if (result.data.status === false) {
        dispatch(loginDriverFailure(result.data.message));
      }
      setMsg(result.data.status);
      if (result.data.status === true) {
        dispatch(loginDriverSuccess(result.data));
        navigate("/driverDashboard");
      }
      // setOpenSnackbar(true);
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
    // open,
    loginData,
    // handleOpen,
    // handleClose,
    handleChange,
    handleSubmit,
    handleLoginSubmit,
    handleLoginChange,
  };
};
