import React from "react";
import { Card, CardMedia, CardContent, Box, Divider, Grid } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

const RestaurantCard = ({ cardDetails }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Card>
        <Grid container>
          <Grid item md={5}>
            <CardMedia
              className="cart-items-image"
              component="img"
              alt="Product Image"
              sx={{ justifyContent: "flex-start", width: "160px" }}
              image="https://menu-images-static.skipthedishes.com/images/resized/small-8af7a92c68c4647eaee3.jpg"
            />
          </Grid>
          <Grid item md={4}>
            <CardContent>
              <div>{cardDetails.name}</div>
              <div>{cardDetails.description}</div>
            </CardContent>
          </Grid>
          <Grid item md={3}>
            <CardContent>
              <div>30-60 min</div>
              <div>
                <StarRateIcon sx={{ color: "yellow" }} />
                {cardDetails.ratings}
              </div>
            </CardContent>
          </Grid>
        </Grid>
        <Divider />
      </Card>
    </div>
  );
};

export default RestaurantCard;
