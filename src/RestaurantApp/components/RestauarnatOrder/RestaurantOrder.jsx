import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "../RestaurantTitle";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getAllOrdersByRestaurantId,  updateOrderStatusByRestaurant} from '../../../services/cartService';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal'



const RestaurantOrder = () => {
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [error, setError] = useState(null);

  const restaurantId = '6527a6e0fdb8bf79ffc03c4f';

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrdersByRestaurantId(restaurantId);
        setRestaurantOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [restaurantId]);

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
    let data = {}
    if(restaurantOrderDetails[0].orderStatus === 'payment') {
        data = {
        cartId: restaurantOrderDetails[0]._id,
        restaurantId: restaurantId,
        userId: restaurantOrderDetails[0].userId,
        newOrderStatus: 'acceptance' 
      }
    } else if(restaurantOrderDetails[0].orderStatus === 'acceptance') {
        data = {
        cartId: restaurantOrderDetails[0]._id,
        restaurantId: restaurantId,
        userId: restaurantOrderDetails[0].userId,
        newOrderStatus: 'preparation' 
      }
    } else if(restaurantOrderDetails[0].orderStatus === 'preparation') {
      data = {
        cartId: restaurantOrderDetails[0]._id,
        restaurantId: restaurantId,
        userId: restaurantOrderDetails[0].userId,
        newOrderStatus: 'ready' 
      }
    }
   
   
    try {
      const result = await updateOrderStatusByRestaurant(data);
      handleCloseModal();
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while updating order status.');
    }
  }

  
 
  return (
    <React.Fragment>
      <Title>Incoming Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Order ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Menu Item</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {restaurantOrderDetails.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>
                      {order.menuItems.map((menuItem) => (
                        <div key={menuItem._id}>
                          {menuItem.name} - {menuItem.quantity}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
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
          />
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default RestaurantOrder;
