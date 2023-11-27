import { useEffect, useState } from "react";
import { getAllDrivers, updateDriverDetails } from "../../../../services/driverService";

export const useDriverList = () => {
  const [driverList, setDriverList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [driverData, setDriverData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: null,
    email: "",
    driverId: "",
  });
  const [editingDriverId, setEditingDriverId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDriverData({
      ...driverData,
      [name]: value,
    });
  };
  const handleEditDriver =(driverId) =>{
    const driverToEdit = driverList.find((driver) => driver._id === driverId);
    setDriverData({
      firstName: driverToEdit.firstName,
      lastName: driverToEdit.lastName,
      phoneNumber: driverToEdit.phoneNumber,
      email: driverToEdit.email,
      driverId: driverId,
    })
    setEditingDriverId(driverId);
    setShowEditForm(true);

  }
  const resetForm = () => {
    setDriverData({
      firstName: "",
    lastName: "",
    phoneNumber: 0,
    email: "",
    driverId: "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      const editedDriver = await updateDriverDetails(driverData);

      if (editedDriver) {
        const drivers = await getAllDrivers();
        setDriverList(drivers);
      } else {
        console.error("Error editing driver.");
      }
    } catch (error) {
      console.error("Error editing driver:", error);
    }

    resetForm();
    setShowEditForm(false);
  };
  
  const handleCancel = () => {
    resetForm();
    setShowEditForm(false);
  };

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
    driverData,
    isLoading,
    isError,
    showEditForm,
    setShowEditForm,
    handleCancel,
    handleChange,
    handleEditDriver,
    handleSaveEdit,

  };
};
