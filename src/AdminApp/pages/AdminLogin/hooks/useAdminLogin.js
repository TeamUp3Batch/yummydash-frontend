import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {sendOTP,verifyOTP} from "../../../../services/adminService"
import { useNavigate } from "react-router-dom";

export const useAdminLogin = () => {
  // Declare the following variables and functions
  const [login, setLogin] = useState({
    admin_email: ""
  });
  const [OTPData, setOTPData] = useState({
    admin_email: "",
    otp:""
  });
  const navigate = useNavigate();
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
      if (result.status === 'error') {
        setIsError(true);
      setMsg(result.message);
    }
      if (result.status === 'otp') {
        setShowOTPField(true); 
        setEnterOTP(true)
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
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOTP(OTPData);
      const { status, message } = response;
  
      if (status === 'error') {
        setIsError(true);
        setMsg(message);
        setShowOTPField(false);
      } else if (status === 'expired' || status === 'invalid') {
          setIsError(true);
          setMsg(message);
          setShowOTPField(false);
      } else if (status === 'verified') {
        navigate("/admin");
      }
    } catch (error) {
      setIsError(true);
      setMsg(error.response.data.message);
      console.error(error);
    }
  };
  
  


  return {
    isError,
    login,
    OTPData,
    msg,
    enterOTP,
    showOTPField,
    handleRequestOTP,
    handleOTPChange,
    handleChange,
    handleOTPSubmit
  };
};
