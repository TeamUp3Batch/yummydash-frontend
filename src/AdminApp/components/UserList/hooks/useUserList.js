import { useEffect, useState } from "react";

import { updateUserProfile, getAllUsers } from "../../../../services/userService"; 

export const useUserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [editingUserId, setEditingUserId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: null,
    email: "",
    userId: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

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

  const handleSaveEdit = async () => {
    try {
      const editedUser = await updateUserProfile(userData);

      if (editedUser) {
        const users = await getAllUsers();
        setUserList(users);
      } else {
        console.error("Error editing User.");
      }
    } catch (error) {
      console.error("Error editing User:", error);
    }

    resetForm();
    setShowEditForm(false);
  };

  const handleEditUser =(userId) =>{
    const userToEdit = userList.find((user) => user._id === userId);
    setUserData({
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      phoneNumber: userToEdit.phoneNumber,
      email: userToEdit.email,
      userId: userId,
    })
    setEditingUserId(userId);
    setShowEditForm(true);

  }
  const handleCancel = () => {
    resetForm();
    setShowEditForm(false);
  };
  const resetForm = () => {
    setUserData({
      firstName: "",
    lastName: "",
    phoneNumber: 0,
    email: "",
    userId: "",
    });
  };

  return {
    userList,
    isLoading,
    isError,
    showEditForm,
    userData,
    handleEditUser,
    setShowEditForm,
    handleSaveEdit,
    handleCancel,
    handleChange
  };
};
