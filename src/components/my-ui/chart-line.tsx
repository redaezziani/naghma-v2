"use client";
import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { getEarningsByMonth } from "@/(db)/errning";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
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

const LineChart = ({ tension = 0, color = "161, 94%, 30%", isTransparent = true }) => {
  const [errningData, setErrningData] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEarningsByMonth();
        if (res?.status === 'success') {
          // Sort the data by month before setting it
          //@ts-ignore
          const sortedData = res.data.sort((a, b) => a.month - b.month);
          //@ts-ignore
          setErrningData(sortedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const formattedMonths = errningData.map(entry => {
      let monthName = "";
      //@ts-ignore
      switch (entry.month) {
        case 1:
          monthName = "يناير";
          break;
        case 2:
          monthName = "فبراير";
          break;
        case 3:
          monthName = "مارس";
          break;
        case 4:
          monthName = "أبريل";
          break;
        case 5:
          monthName = "مايو";
          break;
        case 6:
          monthName = "يونيو";
          break;
        case 7:
          monthName = "يوليو";
          break;
        case 8:
          monthName = "أغسطس";
          break;
        case 9:
          monthName = "سبتمبر";
          break;
        case 10:
          monthName = "أكتوبر";
          break;
        case 11:
          monthName = "نوفمبر";
          break;
        case 12:
          monthName = "ديسمبر";
          break;
        default:
          break;
      }
      return monthName;
    });
    //@ts-ignore
    setMonths(formattedMonths);
  }, [errningData]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "الإيرادات",
        // @ts-ignore
        data: errningData.map(entry => entry.totalEarnings),
        borderColor: `hsl(${color})`,
        borderWidth: 3,
        pointBorderColor: `hsl(${color})`,
        pointBorderWidth: 3,
        tension: tension,
        fill: false,
      },
    ],
  };

  const options = {
    interaction: {
      intersect: false
    },
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
   <div className="p-4 w-full h-full flex justify-center items-center">
     <Line data={data}
    //@ts-ignore
    options={options} />
   </div>
  );
}

export default LineChart;
