'use client';
import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const distributorSalesData = [
  { distributor: "موزع 1", amount: 19000 },
  { distributor: "موزع 2", amount: 1000 },
  { distributor: "موزع 3", amount: 500 },
  { distributor: "موزع 4", amount: 800 },
  { distributor: "موزع 5", amount: 1800 },
  { distributor: "موزع 6", amount: 9000 },
];

const BarChart: React.FC<{ color?: string; isTransparent?: boolean }> = ({
  color = "161, 94%, 30%",
  isTransparent = true
}) => {
  const data = {
    labels: distributorSalesData.map((data) => data.distributor),
    datasets: [
      {
        label: "مبلغ المبيعات",
        data: distributorSalesData.map((data) => data.amount),
        backgroundColor: `hsl(${color})`,
        borderWidth: 1,
        borderColor: `hsl(${color})`,
        hoverBackgroundColor: `hsl(${color}, 70%)`,
        hoverBorderColor: `hsl(${color}, 70%)`,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
        title: {
          display: false,
          text: "المبيعات",
          padding: {
            bottom: 10,
          },
          font: {
            size: 10,
          },
        },
        min: 0,
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Bar
    
    type="bar" data={data}
    //@ts-ignore
    options={options}></Bar>
  );
}

export default BarChart;
