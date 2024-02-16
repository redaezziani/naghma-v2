"use client";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const salesData = [
  { month: "يناير", sales: 70 },
  { month: "فبراير", sales: 100 },
  { month: "مارس", sales: 50 },
  { month: "أبريل", sales: 80 },
  { month: "مايو", sales: 180 },
  { month: "يونيو", sales: 900 },
];

const LineChart = ({ tension = 0, color = "161, 94%, 30%", isTransparent = true }) => {
  const data = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: "الإيرادات",
        data: salesData.map((data) => data.sales),
        borderColor: `hsl(${color})`,
        borderWidth: 3,
        pointBorderColor: `hsl(${color})`,
        pointBorderWidth: 3,
        tension: tension,
        fill: true,
        backgroundColor: (context: { chart: { ctx: any; }; }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, isTransparent && "#0488ca00");
          // lets make it a hsl color to make it transparent and change the lightness
          gradient.addColorStop(0.8, `hsl(${color},20%)`);
          return gradient;
        },
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
        min: 50,
      },
      x: {
        ticks: {
          font: {
            size: 12,

            display: false,
          },
        },
      },
    },
  };

  return (
    // @ts-ignore
    <Line data={data} options={options}></Line>
  );
}

export default LineChart;