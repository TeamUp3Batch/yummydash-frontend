import { useState, useEffect } from "react";
import Axios from "axios";



// Define the custom hook
function useGeocodeAddress() {
  const [geocodedInfo, setGeocodedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const geocodeAddress = async (address) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
      );
      setGeocodedInfo(response.data.features[0]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // You can use this effect to clear geocodedInfo after it has been displayed
    // or to perform any other cleanup tasks.
  }, [geocodedInfo]);

  return { geocodeAddress, geocodedInfo, isLoading, error };
}

export default useGeocodeAddress;
