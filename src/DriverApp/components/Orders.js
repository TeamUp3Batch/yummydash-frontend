import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "./Title";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  getAllOrdersByRestaurantId,
  updateOrderStatusByRestaurant,
} from "../../services/cartService";
import OrderDriverStatusModal from "../components/OrderDriverStatusModal/OrderDriverStatusModal";
import { getReadyOrders } from "../../services/driverService";

import { useSelector } from "react-redux";

const Orders = () => {
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const { loggedInDriver } = useSelector((state) => state.driver);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReadyOrders();
        setRestaurantOrderDetails(data.data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
  };
  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };
  const handleCloseError = () => {
    setError(null);
  };

  const handleAcceptOrder = async () => {
    if (!selectedOrderId) {
      return; // No order selected
    }

    const selectedOrderIndex = restaurantOrderDetails.findIndex(
      (order) => order._id === selectedOrderId
    );

    if (selectedOrderIndex === -1) {
      return; // Selected order not found
    }

    let newOrderStatus;

    switch (restaurantOrderDetails[selectedOrderIndex].orderStatus) {
      case "ready":
        newOrderStatus = "pickup";
        break;
      case "pickup":
        newOrderStatus = "delivery";
        break;
      default:
        return; // Invalid order status
    }

    const data = {
      cartId: selectedOrderId,
      restaurantId: restaurantOrderDetails[selectedOrderIndex].restaurantId,
      userId: restaurantOrderDetails[selectedOrderIndex].userId,
      newOrderStatus: newOrderStatus,
      driverId: loggedInDriver._id,
    };
    setSelectedOrderStatus(newOrderStatus);

    try {
      await updateOrderStatusByRestaurant(data);

      // Update the local state with the modified order
      setRestaurantOrderDetails((prevState) => {
        const updatedOrderDetails = [...prevState];
        updatedOrderDetails[selectedOrderIndex].orderStatus = newOrderStatus;
        return updatedOrderDetails;
      });

      handleCloseModal();
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("An error occurred while updating order status.");
    }
  };

  return (
    <React.Fragment>
      <Title>Incoming Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Order Details</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Pickup Address</TableCell>
            <TableCell>Delivery Address</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Order Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantOrderDetails.map((restaurantOrderDetail) => (
            <TableRow key={restaurantOrderDetail._id}>
              <TableCell>{restaurantOrderDetail._id}</TableCell>
              <TableCell>
                ${restaurantOrderDetail.total} -{" "}
                {restaurantOrderDetail.menuItems.length} items
              </TableCell>
              <TableCell>
                {restaurantOrderDetail.userName.toUpperCase()}
              </TableCell>
              <TableCell>{restaurantOrderDetail.restaurantAddress}</TableCell>
              <TableCell>{restaurantOrderDetail.userAddress}</TableCell>
              <TableCell>{restaurantOrderDetail.orderStatus}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleOpenModal(restaurantOrderDetail._id)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <OrderDriverStatusModal
        open={!!selectedOrderId}
        onClose={handleCloseModal}
        selectedOrderId={selectedOrderId}
        onConfirm={handleAcceptOrder}
        onSelectedOrderStatus={selectedOrderStatus}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Orders;
