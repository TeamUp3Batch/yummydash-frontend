import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendOTP, verifyOTP } from "../../../../services/adminService";
import { useNavigate } from "react-router-dom";

import {
  loginSuccess,
  loginFailure,
  logout
} from "../../../../slices/adminSlice";
export const useAdminLogin = () => {
  const [login, setLogin] = useState({
    admin_email: "",
  });
  const [OTPData, setOTPData] = useState({
    admin_email: "",
    otp: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const [enterOTP, setEnterOTP] = useState(null);
  const [showOTPField, setShowOTPField] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setLogin({ ...login, [input.name]: input.value });
  };
  const handleOTPChange = ({ currentTarget: input }) => {
    setOTPData({ ...OTPData, [input.name]: input.value });
  };
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    try {
      const result = await sendOTP(login);
      if (result.status === "error") {
        setIsError(true);
        setMsg(result.message);
      }
      if (result.status === "otp") {
        setShowOTPField(true);
        setEnterOTP(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setIsError(true);
        setMsg(error.response.data.message);
      }
    }
  };
  const verifyEmailOTP = async () => {
    try {
      const response = await verifyOTP(OTPData);
      const { status, message } = response;

      if (status === "error") {
        setIsError(true);
        setMsg(message);
        setShowOTPField(false);
        dispatch(loginFailure(response));
      } else if (status === "expired" || status === "invalid") {
        setIsError(true);
        setMsg(message);
        setShowOTPField(false);
        dispatch(loginFailure(response));
      } else if (status === "verified") {
        dispatch(loginSuccess(response));
        navigate("/admin");
      }
    } catch (error) {
      setIsError(true);
      setMsg(error.response.data.message);
      dispatch(loginFailure(error));
      console.error(error);
    }
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    await verifyEmailOTP();
  };

  return {
    isError,
    login,
    OTPData,
    msg,
    enterOTP,
    showOTPField,
    verifyEmailOTP,
    handleRequestOTP,
    handleOTPChange,
    handleChange,
    handleOTPSubmit,
  };
};
