import React, { useState, useEffect } from 'react';
import { getAllOrdersByRestaurantId,  updateOrderStatusByRestaurant} from '../../services/cartService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import RestaurantHeader from '../components/RestaurantHeader/RestaurantHeader';
import OrderDetailsModal from '../components/OrderStatusModal/OrderStatusModal';


const RestaurantDashboard = () => {
  const [restaurantOrderDetails, setRestaurantOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [userOrderId, setUserOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  const restaurantId = '6527a6e0fdb8bf79ffc03c4f';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrdersByRestaurantId(restaurantId);
        console.log('data get', data)
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

  const handleConfirmOrder = async () => {
    const data = {
      cartId: restaurantOrderDetails[0]._id,
      restaurantId: restaurantId,
      userId: restaurantOrderDetails[0].userId,
      newOrderStatus: 'acceptance',
    }
   
    try {
      const result = await updateOrderStatusByRestaurant(data);
      console.log(result);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <RestaurantHeader />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            marginLeft: 200,
            marginTop: 50,
            transition: 'margin 0.3s',
          }}
        >
          <TableContainer component={Paper}>
            <Table>
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
          </TableContainer>
          <OrderDetailsModal
            open={!!selectedOrderId}
            onClose={handleCloseModal}
            selectedOrderId={selectedOrderId}
            onConfirm={handleConfirmOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
