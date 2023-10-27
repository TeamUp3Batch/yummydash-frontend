import React, { useEffect } from "react";
import useGeocodeAddress from "./hooks/useGeocodeAddress";
import { TextField, Button } from "@mui/material";

const AddressInputWithGeocoding = ({ onGeocodedAddressSelect }) => {
  const {
    geocodeAddress,
    geocodedInfo,
    isGeoAddressLoading,
    isGeoAddressError,
  } = useGeocodeAddress();
  const [address, setAddress] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
    geocodeAddress(newAddress);
  };

  const handleSave = () => {
    setIsSaving(true);
    onGeocodedAddressSelect(geocodedInfo.place_name);
    
  };

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
          {/* <p>Latitude: {geocodedInfo.center[1]}</p> i need to push this to the database */}
          {/* <p>Longitude: {geocodedInfo.center[0]}</p> */}
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

