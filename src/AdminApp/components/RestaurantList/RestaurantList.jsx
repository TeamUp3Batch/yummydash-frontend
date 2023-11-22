import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Title from '../Title/Title';

const restaurantData = [
  { title: 'Restaurant 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', active: true },
  { title: 'Restaurant 2', content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', active: false },
  { title: 'Restaurant 3', content: 'Fusce auctor nulla non quam lacinia, sit amet fermentum quam volutpat.', active: true },
  { title: 'Restaurant 4', content: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', active: false },
  { title: 'Restaurant 5', content: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.', active: true },
  { title: 'Restaurant 6', content: 'Nulla quis lorem ut libero malesuada feugiat.', active: false },
  { title: 'Restaurant 7', content: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.', active: true },
  { title: 'Restaurant 8', content: 'Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.', active: false },
  { title: 'Restaurant 9', content: 'Vivamus suscipit tortor eget felis porttitor volutpat.', active: true },
  { title: 'Restaurant 10', content: 'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', active: false },
];

const RestaurantList = () => {
  return (
    <>
    <Title>Restaurant</Title>
    <Grid container spacing={2}>
      {restaurantData.map((restaurant, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {restaurant.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {restaurant.content}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Active:</strong> {restaurant.active ? 'Yes' : 'No'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default RestaurantList;
