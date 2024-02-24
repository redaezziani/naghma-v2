'use client';
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
/*
data: Array(5) [ {…}, {…}, {…}, … ]
​​
0: Object { id: "35c94b60-a20c-430f-8a62-b959bf118329", nom: "لابريغاد", total_sell_price: 2640 }
​​
1: Object { id: "ff885ca5-c240-4642-8bc0-62d350d3cf0f", nom: "حميد", total_sell_price: 69252 }
​​
2: Object { id: "d5a26d83-1ae6-4946-8812-d8aefadbfe10", nom: "باليالزيد", total_sell_price: 1280 }
​​
3: Object { id: "a4a1e8f3-4247-40e6-9123-a50e17b9383d", nom: "يوسف ", total_sell_price: 45779 }
​​
4: Object { id: "5a313465-4073-4868-a97f-2dfeadde2c2d", nom: "رشيد", total_sell_price: 30128 }
*/
import { getVendursWithTotalSellPrice } from "@/(db)/vendur";
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

const BarChart: React.FC<{ color?: string; isTransparent?: boolean }> = ({
  color = "161, 94%, 30%",
  isTransparent = true
}) => {
  const [vendursData , setVendursData] = React.useState([]);
  const handelData = async () => {
    try {
      const res = await getVendursWithTotalSellPrice();
      if (res?.status === 'success') {
        // @ts-ignore
        setVendursData(res.data);
      }
    } catch (error) {
      console.error(error);   
    }
  }
  useEffect(() => {
    handelData();
  }
  , []);
  const data = {
    //@ts-ignore
    labels: vendursData.map((data) => data.nom),
    datasets: [
      {
        label: "مبلغ المبيعات",
        //@ts-ignore
        data: vendursData.map((data) => data.total_sell_price),
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
          text: "المبلغ",
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
   <div className="p-4 w-full h-full flex justify-center items-center">

    <Bar
    
    type="bar" data={data}
    //@ts-ignore
    options={options}></Bar>
    </div>
  );
}

export default BarChart;
