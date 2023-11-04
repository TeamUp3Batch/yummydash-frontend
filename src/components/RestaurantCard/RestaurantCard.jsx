import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

const RestaurantCard = ({ cardDetails }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <div key={cardDetails._id}>
        <Link to={`/menu/${cardDetails._id}`}>
          <Card>
            <Grid container>
              <Grid item md={4}>
                <CardMedia
                  className="cart-items-image"
                  component="img"
                  alt="Product Image"
                  sx={{ justifyContent: "flex-start", width: "200px", padding:"5px" }}
                  image={cardDetails.restaurantImage}
                />
              </Grid>
              <Grid item md={4}>
                <CardContent>
                  <Typography variant="h1">{cardDetails.name}</Typography>
                  <Typography variant="subtitle2">
                    {cardDetails.description}
                  </Typography>
                </CardContent>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item md={3}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography>{cardDetails.estimatedDeliveryTime.minEstimatedTime} - {cardDetails.estimatedDeliveryTime.maxEstimatedTime} mins</Typography>
                  <div>
                    <StarRateIcon sx={{ color: "yellow" }} />
                    {cardDetails.ratings}
                  </div>
                </CardContent>
              </Grid>
            </Grid>
            <Divider />
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
