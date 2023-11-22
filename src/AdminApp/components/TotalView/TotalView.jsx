
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const VibrantPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFD7B6',
  // backgroundImage: `url(${})`, // Set the background image
  backgroundSize: 'cover', // Ensure the image covers the entire paper
  color: theme.palette.getContrastText(theme.palette.secondary.main),
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function Statistics() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 0.5,
          width: 200,
          height: 200,
        },
      }}
    >
      <VibrantPaper elevation={3}>
       <GroupAddIcon style={{ fontSize: 48 }}/>
        <h4>Total Customer</h4>
        <h4>5251</h4>
      </VibrantPaper>
      <VibrantPaper elevation={3}>
        <StorefrontIcon style={{ fontSize: 48 }}/>
        <h4>Total Customer</h4>
        <h4>5251</h4>
      </VibrantPaper>
      <VibrantPaper elevation={3}>
        <TimeToLeaveIcon style={{ fontSize: 48 }}/>
        <h4>Total Customer</h4>
        <h4>5251</h4>
      </VibrantPaper>
      <VibrantPaper elevation={3}>
        <TrendingDownIcon style={{ fontSize: 48 }}/>
        <h4>Total Customer</h4>
        <h4>5251</h4>
      </VibrantPaper>
   
    </Box>
  );
}
