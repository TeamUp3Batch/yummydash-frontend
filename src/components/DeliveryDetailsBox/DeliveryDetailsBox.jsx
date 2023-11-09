import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonPinIcon from "@mui/icons-material/PersonPin";

const DeliveryDetailsBox = () => {
  const { checkout } = useSelector((state) => state.menu);
  return (
    <Card>
      <CardHeader
        variant="caption"
        color="text.secondary"
        subheader="Your Delivery"
        style={{ fontSize: "10px", fontWeight: "bold" }}
        action={
          <CardActions disableSpacing>
            <Button
              aria-label="back-to-menu"
              style={{ padding: "0", fontSize: "10px", textTransform: "none" }}
            >
              Back to Menu
             {/* // navigate("/main"); */}
            </Button>
          </CardActions>
        }
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <AccessTimeIcon />
          {checkout.estimatedTime} mins
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <PersonPinIcon />
          {checkout.userAddress.userAddress1}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DeliveryDetailsBox;
