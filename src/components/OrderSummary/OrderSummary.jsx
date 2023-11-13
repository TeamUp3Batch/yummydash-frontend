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
import ConfirmModal from './ConfirmModal/ConfirmModal';

import classes from './orderSummary.module.scss';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const CheckoutForm = ({ clientSecret }) => {
  const [confirmModalActive, setConfirmModalActive] = useState(false);
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
        if (response.status === 201) {
          setConfirmModalActive(true);
          dispatch(updateCartStatus(response.data.orderStatus))
          navigate("/delivery");
        }
      } else {
        console.warn("Payment not succeeded");
      }
    } catch (err) {
      console.warn(err);
    }
      }

  return (
    
   <div>
    <div className={classes.orderSummary}>
    <div className={classes.orderSummary__wrapper}>
          <div className={classes.orderSummary__header}>
            <h2>Checkout</h2>
          </div>
          <div className={classes.orderSummary__main}>
            <h3>{checkout.restaurantName}</h3>

            {checkout
              ? checkout.lineItems.map((lineItem) => (
                  <div className={classes.orderSummary__dishes}>
                    <p className={classes.orderSummary__quantity}>{lineItem.quantity}</p>
                    <p className={classes.orderSummary__name}>{lineItem.name}</p>
                    <p className={classes.orderSummary__price}>${lineItem.price}</p>
                  </div>
                ))
              : null}
          </div>
          <div className={classes.orderSummary__checkout}>
          {checkout && checkout.totalprice && (
           <div className={classes.orderSummary__checkout__total}>
           <h3>Total</h3>
           <h3>${checkout.totalprice}</h3>
         </div>
          )}
            <CardElement />

            <Button onClick={handleCheckout}>
              <h3>Checkout</h3>
            </Button>
          </div>
        </div>
    </div>
    <ConfirmModal active={confirmModalActive} setActive={setConfirmModalActive}/>
   </div>
  );
};

export default function OrderSummary() {
  const { checkout } = useSelector((state) => state.menu);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
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
