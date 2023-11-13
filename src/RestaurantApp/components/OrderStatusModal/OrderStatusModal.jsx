
import React from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OrderDetailsModal = ({ open, onClose, selectedOrderId, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
            outline: 'none',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Order Details
          </Typography>
          {selectedOrderId && (
            <div>
              <Typography variant="body1">
                Order ID: {selectedOrderId}
              </Typography>
            </div>
          )}
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onConfirm}>Preparing</Button>
          <Button onClick={onConfirm}>Ready</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default OrderDetailsModal;
