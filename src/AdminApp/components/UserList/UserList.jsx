import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Title from '../Title/Title';

const userData = [
    { username: 'Alice', phone: '123-456-7890', address: '123 Main St, Cityville' },
    { username: 'Bob', phone: '987-654-3210', address: '456 Oak Ave, Townsville' },
    { username: 'Charlie', phone: '555-123-4567', address: '789 Pine Ln, Villagetown' },
    { username: 'David', phone: '111-222-3333', address: '321 Elm St, Countryside' },
    { username: 'Eva', phone: '555-987-6543', address: '567 Maple Ave, Riverside' },
    { username: 'Frank', phone: '888-777-6666', address: '876 Birch Ln, Hilltop' },
    { username: 'Grace', phone: '333-444-5555', address: '654 Pine St, Lakeside' },
    { username: 'Henry', phone: '777-888-9999', address: '432 Oak Ave, Mountainside' },
    { username: 'Isabel', phone: '123-555-7890', address: '987 Cedar Ln, Seaside' },
    { username: 'Jack', phone: '999-777-5555', address: '345 Birch St, Countryside' },
  ];

const UserList = () => {
  return (
    <>
    <Title> User </Title>
    <Grid container spacing={2}>
      {userData.map((user, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Phone:</strong> {user.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Address:</strong> {user.address}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default UserList;
