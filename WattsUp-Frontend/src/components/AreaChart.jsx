import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = ({ rawData }) => {
  // Mapping the rawData into a format suitable for recharts
  const data = rawData.days.map((day, index) => {
    return {
      day,
      ...rawData.data.reduce((acc, seriesData, seriesIndex) => {
        acc[`series${seriesIndex + 1}`] = seriesData[index];
        return acc;
      }, {}),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        {rawData.data.map((_, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={`series${index + 1}`}
            stroke={`#${(index * 20 + 100).toString(16)}`}
            fill={`#${(index * 20 + 100).toString(16)}`}
            fillOpacity={0.3}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
