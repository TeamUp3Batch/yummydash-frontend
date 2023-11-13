// OrderStatusModal.js

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const OrderDriverStatusModal = ({ open, onClose, onConfirm, orderId }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Status</DialogTitle>
      <DialogContent>
        <p>Your Order ID: {orderId}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="success" >
          Accept
        </Button>
        <Button onClick={onConfirm} color="success">
          Delivery
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDriverStatusModal;
