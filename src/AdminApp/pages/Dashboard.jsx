import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TotalView from '../components/TotalView/TotalView';
import Statistics from '../components/Statistics/Statistics';
import TableView from '../components/TableView/TableView';
import Chart from '../components/Chart/Chart';

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function Dashboard() {
  return (
    <Box>
      <Grid container spacing={2}>
        <StyledGrid item xs={12} sm={6}>
          <TotalView />
        </StyledGrid>
        <StyledGrid item xs={12} sm={6}>
          <Statistics />
        </StyledGrid>
        <StyledGrid item xs={12} sm={8}>
          <TableView />
        </StyledGrid>
        <StyledGrid item xs={12} sm={4}>
          <Chart />
        </StyledGrid>
      </Grid>
    </Box>
  );
}
