
import React, { useEffect, useState }  from 'react';
import { Button } from "@mui/material";
import useMapboxSearch from './hooks/useMapbBoxSearch'; 
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../../slices/authSlice";
import { saveAddress } from "../../../services/userService";


const AddressSearchMapBox = ({onSearchAddressSelect}) =>{
  const { address, latitude, longitude } = useMapboxSearch();
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [savedAddress, setSavedAddress] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const buttonStyle = {
      color: '#FFFFFF',
      backgroundColor: '#F36805', 
      margin: "0 auto",
      display: "block",
    };
 
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    onSearchAddressSelect(address);
    const searchAddressInfoData = {
      email: loggedInUser.email,
      userAddress1: address,
      latitude: latitude,
      longitude: longitude,
      isPrimaryAddress: true,
    };

    try {
      const savedAddress = await saveAddress(searchAddressInfoData);
      if (savedAddress) {
        setSavedAddress(savedAddress);
        dispatch(updateAddress(savedAddress));
      } else {
        console.error("Error saving address: Unexpected response.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  useEffect(() => {
    if (address) {
      onSearchAddressSelect(address);
    }
  }, [address, onSearchAddressSelect]);
  

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '300px' }}></div>
      <div>
        <Button
          type="submit"
          variant="contained"
          style={buttonStyle}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
    
  );
}

export default AddressSearchMapBox;

