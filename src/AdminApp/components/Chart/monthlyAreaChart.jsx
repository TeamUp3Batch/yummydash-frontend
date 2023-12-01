import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useSalesPerMonth } from "./hooks/useChartView";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function MonthlyBarChart() {
  const salesPerMonth = useSalesPerMonth();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #8884d8",
          paddingBottom: "8px",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        <h5 style={{ margin: 0, padding: "8px", color: "#000" }}>
          Monthly Sales
        </h5>
      </Box>
      <BarChart width={400} height={200} data={salesPerMonth.monthlySales}>
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSales" fill="#8884d8" />
      </BarChart>
    </Paper>
  );
}
