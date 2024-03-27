"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getVendursWithTotalSellPrice } from "@/(db)/vendur";
import { useEffect, useState } from "react";


export function BarChartExample() {
    const [vendursData , setVendursData] = useState([]);
    const handelData = async () => {
      try {
        const res = await getVendursWithTotalSellPrice();
        if (res?.status === 'success') {
          // @ts-ignore
          setVendursData(res.data);
        }
        console.log(res);
      } catch (error) {
        console.error(error);   
      }
    }
    useEffect(() => {
      handelData();
    }
    , []);
  return (
    <Card
    className="w-full border-none shadow-none h-full overflow-hidden"
    >
      <CardHeader>
        <CardTitle>
            المبيعات الشهرية لكل بائع
        </CardTitle>
        <CardDescription>
            البيانات الشهرية للمبيعات لكل بائع
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 w-full">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
            
            width={150} height={40} data={vendursData}>
              
          <Bar
          radius={[5, 5, 0, 0]}
          label={{ fill: 'white', fontSize: 9, fontWeight:'bold' }}
          dataKey="le_prix_a_paye"

           fill="currentColor"
           className=" fill-primary"
            />
            
        </BarChart>
        </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}