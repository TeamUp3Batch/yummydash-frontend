import React, { useEffect, useState } from "react";
import useGeocodeAddress from "./hooks/useGeocodeAddress";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../../services/userService";
import { updateAddress } from "../../slices/authSlice";

const AddressInputWithGeocoding = ({ onGeocodedAddressSelect }) => {
  const { loggedInUser, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [savedAddress, setSavedAddress] = useState(null);

  const {
    geocodeAddress,
    geocodedInfo,
    isGeoAddressLoading,
    isGeoAddressError,
  } = useGeocodeAddress();
  const inputStyle = {
    color: "#0C151D",
    fontweight: 400,
    padding: "4px 12px ",
    fontSize: "16px",
    boxSizing: "border-box",
    borderRadius: "1px",
    width: "100%",
    margin: "2px 0px 10px",
  };

  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
    geocodeAddress(newAddress);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    onGeocodedAddressSelect(geocodedInfo.place_name);
    const geocodedInfoData = {
      email: loggedInUser.email,
      userAddress1: geocodedInfo.place_name,
      latitude: geocodedInfo.center[1],
      longitude: geocodedInfo.center[0],
      isPrimaryAddress: true,
    };

    try {
      const savedAddress = await saveAddress(geocodedInfoData);
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
    if (geocodedInfo) {
      onGeocodedAddressSelect(geocodedInfo.place_name);
    }
  }, [geocodedInfo, onGeocodedAddressSelect]);

  return (
    <>
      <TextField
        name="address"
        placeholder="Address"
        type="text"
        autoComplete="address-line1"
        value={address}
        onChange={handleAddressChange}
        style={inputStyle}
      />
      {isGeoAddressLoading && <p>Loading...</p>}
      {isGeoAddressError && <p>Error: {isGeoAddressError.message}</p>}
      {geocodedInfo && (
        <div>
          <p>{geocodedInfo.place_name}</p>
        </div>
      )}
      <div>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={handleSave}
          disabled={isSaving}
          style={{
            margin: "0 auto",
            display: "block",
          }}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </>
  );
};

export default AddressInputWithGeocoding;
