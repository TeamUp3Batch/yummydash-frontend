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
  updateOrderStatusByRestaurant,
} from "../../services/cartService";
import OrderDriverStatusModal from "../components/OrderDriverStatusModal/OrderDriverStatusModal";
import { getReadyOrders } from "../../services/driverService";

import { useSelector } from "react-redux";

const Orders = () => {
  const restaurantId = "6527a6e0fdb8bf79ffc03c4f";
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [error, setError] = useState(null);
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
    let data = {};
    if (restaurantOrderDetails[0].orderStatus === "ready") {
      data = {
        cartId: restaurantOrderDetails[0]._id,
        restaurantId: restaurantId,
        userId: restaurantOrderDetails[0].userId,
        newOrderStatus: "pickup",
        driverId: loggedInDriver._id,
      };
    } else if (restaurantOrderDetails[0].orderStatus === "pickup") {
      data = {
        cartId: restaurantOrderDetails[0]._id,
        restaurantId: restaurantId,
        userId: restaurantOrderDetails[0].userId,
        newOrderStatus: "delivery",
      };
    }

    try {
      const result = await updateOrderStatusByRestaurant(data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
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
            <TableCell>Customer Details</TableCell>
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
        onConfirm={handleAcceptOrder}
        orderId={selectedOrderId}
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
