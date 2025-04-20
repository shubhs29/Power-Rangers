import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ElectricityBarChart = ({ rawData }) => {
  const data = rawData.dates.map((date, index) => ({
    date,
    usage: rawData.daily_usage[index],
    cost: rawData.daily_cost[index],
  }));

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            interval={4}
            height={100}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="usage" fill="#8884d8" name="Usage (kWh)" />
          <Bar dataKey="cost" fill="#82ca9d" name="Cost (₹)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElectricityBarChart;
