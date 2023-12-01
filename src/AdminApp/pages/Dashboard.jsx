import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TotalCounts from "../components/TotalCounts/TotalCounts";
import WeeklyChart from "../components/Chart/weeklyAreaChart";
import MonthlyChart from "../components/Chart/monthlyAreaChart";
import TopPerformance from "../components/TopPerformance/TopPerformance";

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
}));

export default function Dashboard() {
  return (
    <>
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12}>
          <TotalCounts />
        </StyledGrid>
        <StyledGrid item xs={12} sm={6}>
          <WeeklyChart />
        </StyledGrid>
        <StyledGrid item xs={12} sm={6}>
          <MonthlyChart />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <TopPerformance />
        </StyledGrid>
      </StyledGrid>
    </>
  );
}
