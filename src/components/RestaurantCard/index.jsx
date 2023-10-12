import React from "react";
import { Card, CardMedia, CardContent, Divider, Grid, Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

const RestaurantCard = ({ cardDetails }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Card>
        <Grid container>
          <Grid item md={4}>
            <CardMedia
              className="cart-items-image"
              component="img"
              alt="Product Image"
              sx={{ justifyContent: "flex-start", width: "200px" }}
              image="https://menu-images-static.skipthedishes.com/images/resized/small-8af7a92c68c4647eaee3.jpg"
            />
          </Grid>
          <Grid item md={4}>
            <CardContent>
              <Typography variant="h1">{cardDetails.name}</Typography>
              <Typography variant="subtitle2">{cardDetails.description}</Typography>
            </CardContent>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item md={3}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Typography>30-60 min</Typography>
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
