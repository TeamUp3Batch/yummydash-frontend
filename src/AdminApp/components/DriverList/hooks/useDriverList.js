import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDrivers } from "../../../../services/driverService";

export const useDriverList = () => {
  const [driverList, setDriverList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
        const drivers = await getAllDrivers();
        setDriverList(drivers);
      } catch (error) {
        console.error("Error:", error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    driverList,
    isLoading,
    isError
  };
};
