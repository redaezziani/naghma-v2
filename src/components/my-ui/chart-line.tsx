'use client';
import React, { useEffect, useState } from "react";
import { getEarningsByMonth } from "@/(db)/errning";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export function EarningsLineChart() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getEarningsByMonth();
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      throw new Error("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
      <CardContent className="p-2 h-full w-full ">
        <div className="p- h-[80%]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="month" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalEarnings"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                }}
                stroke="currentColor"
                className="stroke-primary"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    
  )
}
