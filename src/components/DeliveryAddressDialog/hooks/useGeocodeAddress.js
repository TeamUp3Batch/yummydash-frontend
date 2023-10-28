import { useState } from "react";
import Axios from "axios";



const useGeocodeAddress = () => {
  const [geocodedInfo, setGeocodedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const geocodeAddress = async (address) => {
    setIsLoading(true);
    setError(null);
    const mapApiUrl = process.env.REACT_APP_MAPBOX_API_KEY;

    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_GEOMAP_URL}/${encodeURIComponent(
          address
        )}.json?access_token=${mapApiUrl}`
      );
      setGeocodedInfo(response.data.features[0]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  return { geocodeAddress, geocodedInfo, isLoading, error };
}

export default useGeocodeAddress;
