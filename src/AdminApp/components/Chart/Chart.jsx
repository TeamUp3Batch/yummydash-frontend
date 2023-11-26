import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Category 1', value: 10 },
  { name: 'Category 2', value: 15 },
  { name: 'Category 3', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function Chart() {
  return (
    <PieChart width={300} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
