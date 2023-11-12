import React, { useState, useEffect } from "react";
import { updateOrderStatus } from "../../services/paymentService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCartStatus } from "../../slices/menuSlice";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  Paper,
  CardHeader,
  Divider,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const buttonStyle = {
  color: "white",
  backgroundColor: "#F36805",
  borderRadius: "50em",
  textTransform: "none",
  width: "100%", // Cover the width
  padding: "8px 16px", // Padding on both left and right
  textAlign: "center",
};

const CheckoutForm = ({ clientSecret }) => {
  const { checkout } = useSelector((state) => state.menu);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.paymentIntent.status === "succeeded") {
        const updateObj = {
          cartId: checkout.cartId,
          restaurantId: checkout.restaurantId,
          userId: checkout.userId,
          newOrderStatus: "payment",
        };
        const response = await updateOrderStatus(updateObj);
        console.log("hello",response)
        if (response.status === 201) {
          dispatch(updateCartStatus(response.data.orderStatus))
          navigate("/delivery");
          // if (response.data.cart === undefined) {
          //   // dispatch(removeCart(null));
          //   // dispatch(setCartId(null));
          // } else {
          //   dispatch(removeCart(response.data.cart));
          // }
        }
      } else {
        console.warn("Payment not succeeded");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div>
      <Card style={{ width: "100%" }}>
        <CardContent>
          <Typography
            style={{ fontWeight: "bold", fontSize: "14px" }}
            color="textSecondary"
            gutterBottom
          >
            Checkout
          </Typography>
          <Typography
            variant="body2"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            {checkout.restaurantName}
          </Typography>
          <Divider
            style={{ backgroundColor: "#000", height: "2px", margin: "16px 0" }}
          />
          <Grid container>
            {checkout
              ? checkout.lineItems.map((lineItem) => (
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="body1" component="div">
                      {lineItem.quantity} {lineItem.name} {lineItem.price}
                    </Typography>
                  </Grid>
                ))
              : null}
          </Grid>

          <Divider
            style={{ backgroundColor: "#000", height: "2px", margin: "16px 0" }}
          />
          {checkout && checkout.totalprice && (
            <Typography>{checkout.totalprice}</Typography>
          )}
          <CardElement />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            style={{
              background: "#4caf50",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default function OrderSummary() {
  const [clientSecret, setClientSecret] = useState("");
  const { checkout } = useSelector((state) => state.menu);

  useEffect(() => {
    console.log("checkout", checkout.totalprice);
    const fetchClientSecret = async () => {
      const priceInCents = parseInt(checkout.totalprice * 100);
      const url = `${apiUrl}/api/cart/placeOrder`;
      try {
        const response = await axios.post(url, { amount: priceInCents });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        throw error;
      }
    };

    fetchClientSecret();
  }, [checkout.totalprice]);

  return (
    <Paper>
      <Elements stripe={stripePromise}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </Paper>
  );
}
