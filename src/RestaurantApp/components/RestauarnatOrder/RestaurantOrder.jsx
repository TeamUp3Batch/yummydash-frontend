import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "../RestaurantTitle/RestaurantTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  getAllOrdersByRestaurantId,
  updateOrderStatusByRestaurant,
} from "../../../services/cartService";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
import { useSelector } from "react-redux";

const RestaurantOrder = () => {
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [error, setError] = useState(null);
  const { loggedInPartner } = useSelector((state) => state.partner);
  const restaurantId = loggedInPartner.restaurantId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrdersByRestaurantId(restaurantId);
        setRestaurantOrderDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurantOrderDetails]);

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
  };
  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };
  const handleCloseError = () => {
    setError(null);
  };

  const handleConfirmOrder = async () => {
    if (!selectedOrderId) {
      return; // No order selected
    }

    const selectedOrderIndex = restaurantOrderDetails.findIndex(
      (order) => order._id === selectedOrderId
    );
    // const orderStauts

    if (selectedOrderIndex === -1) {
      return; // Selected order not found
    }

    let newOrderStatus;

    switch (restaurantOrderDetails[selectedOrderIndex].orderStatus) {
      case "payment":
        newOrderStatus = "acceptance";
        break;
      case "acceptance":
        newOrderStatus = "preparation";
        break;
      case "preparation":
        newOrderStatus = "ready";
        break;
      default:
        return; // Invalid order status
    }

    const data = {
      cartId: selectedOrderId,
      restaurantId: restaurantId,
      userId: restaurantOrderDetails[selectedOrderIndex].userId,
      newOrderStatus: newOrderStatus,
    };
    setSelectedOrderStatus(newOrderStatus);

    try {
      const result = await updateOrderStatusByRestaurant(data);
      // Update the local state with the modified order
      setRestaurantOrderDetails((prevState) => {
        const updatedOrderDetails = [...prevState];
        const selectedOrderIndex = updatedOrderDetails.findIndex(
          (order) => order._id === result._id // Assuming _id is the unique identifier
        );

        if (selectedOrderIndex !== -1) {
          updatedOrderDetails[selectedOrderIndex].orderStatus =
            result.orderStatus;
            updatedOrderDetails[selectedOrderIndex].time =
            result.orderTracker[updatedOrderDetails[selectedOrderIndex].orderStatus].timestamp;
        }

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
            <TableCell><b>Order ID</b></TableCell>
            <TableCell><b>Customer Name</b></TableCell>
            <TableCell><b>Menu Item</b></TableCell>
            <TableCell><b>Total</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Updated Time</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantOrderDetails.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.userName.toUpperCase()}</TableCell>
              <TableCell>
                {order.menuItems.map((menuItem) => (
                  <div key={menuItem._id}>
                    {menuItem.name} - {menuItem.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{parseFloat(order.total.toFixed(2))}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>
                {order.orderTracker[order.orderStatus]
                  ? new Date(
                      order.orderTracker[order.orderStatus].timestamp
                    ).toLocaleString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleOpenModal(order._id)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <OrderDetailsModal
        open={!!selectedOrderId}
        onClose={handleCloseModal}
        selectedOrderId={selectedOrderId}
        onConfirm={handleConfirmOrder}
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

export default RestaurantOrder;
