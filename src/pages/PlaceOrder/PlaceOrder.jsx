import React from "react";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import DeliveryDetailsBox from "../../components/DeliveryDetailsBox/DeliveryDetailsBox"
import classes from "./placeOrder.module.scss"
const Order = () => {
  return (
    <div className={classes.placeOrderContainer}>
      <div className={classes.deliveryDetailsBox}>
     
      <DeliveryDetailsBox/>
      </div>
      <div className={classes.orderSummary}>
      <OrderSummary />
      </div>
    </div>
  );
};

export default Order;
