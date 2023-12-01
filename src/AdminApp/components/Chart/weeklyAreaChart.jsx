import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useSalesPerWeek } from "./hooks/useChartView";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function WeeklyAreaChart() {
  const salesPerWeek = useSalesPerWeek();

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
          Weekly Sales
        </h5>
      </Box>
      <AreaChart width={400} height={200} data={salesPerWeek.weeklySales}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="totalSales"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </Paper>
  );
}
