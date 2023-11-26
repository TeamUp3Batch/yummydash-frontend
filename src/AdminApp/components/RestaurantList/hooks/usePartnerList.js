import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPartners } from "../../../../services/partnerService";

export const usePartnerList = () => {
  const [partnerList, setPartnerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
        const partners = await getAllPartners();
        setPartnerList(partners);
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
    partnerList,
    isLoading,
    isError
  };
};
