import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../../services/userService";

export const useUserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(undefined);
      try {
        const users = await getAllUsers();
        setUserList(users);
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
    userList,
    isLoading,
    isError
  };
};
