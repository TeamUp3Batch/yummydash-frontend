import React from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import StatusMessages, {useMessages} from './StatusMessages';

import {
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardHeader,
  Divider,
} from "@mui/material";

const buttonStyle = {
  color: "white",
  backgroundColor: "#F36805",
  borderRadius: "50em",
  textTransform: "none",
  width: "100%", // Cover the width
  padding: "8px 16px", // Padding on both left and right
  textAlign: "center",
};

export default function OrderSummary() {
  const stripe = useStripe();
  const elements = useElements();
  const [messages, addMessage] = useMessages();
  return (
    <Paper>
      <Card>
        <CardContent style={{ textAlign: "center" }}>
          <CardHeader title="Checkout" />
          <Typography variant="body2">Subway</Typography>
          <Divider/>
          <Typography variant="body2">Green Goddess</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" style={buttonStyle}>
            Checkout
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}
