import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Title from '../Title/Title';

const driverData = [
  { name: 'John Doe', address: '123 Main St, Cityville', orders: 30, active: true, available: true },
  { name: 'Jane Smith', address: '456 Oak Ave, Townsville', orders: 25, active: false, available: false },
  { name: 'Bob Johnson', address: '789 Pine Ln, Villagetown', orders: 40, active: true, available: true },
  { name: 'Alice Green', address: '321 Elm St, Countryside', orders: 15, active: true, available: false },
  { name: 'Charlie Brown', address: '567 Maple Ave, Riverside', orders: 20, active: false, available: true },
  { name: 'Eva Martinez', address: '876 Birch Ln, Hilltop', orders: 18, active: true, available: true },
  { name: 'Frank White', address: '654 Pine St, Lakeside', orders: 22, active: false, available: false },
  { name: 'Grace Davis', address: '432 Oak Ave, Mountainside', orders: 35, active: true, available: true },
  { name: 'Henry Black', address: '987 Cedar Ln, Seaside', orders: 28, active: true, available: false },
  { name: 'Isabel Rodriguez', address: '345 Birch St, Countryside', orders: 19, active: false, available: true },
];

const DriverList = () => {
  return (
    <>
    <Title>Driver</Title>
    <Grid container spacing={2}>
      {driverData.map((driver, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {driver.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Address:</strong> {driver.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Orders:</strong> {driver.orders}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong> {driver.active ? 'Active' : 'Inactive'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Availability:</strong> {driver.available ? 'Available' : 'Not Available'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default DriverList;
