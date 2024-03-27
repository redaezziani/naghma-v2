"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getVendursWithTotalSellPrice } from "@/(db)/vendur";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import { Skeleton } from "@/components/ui/skeleton";
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

export function BarChartExample() {
  const { data:vendursData, error } = useSWR('/api/data/bar', fetcher);
   if (error){
    return(
      <img src="/err.png"
      className=" w-44 aspect-square hue-rotate-180"
      alt=""
      />
    )
   }
  return (
    <Card
    className="w-full p-0 rounded-none   border-none shadow-none h-full overflow-hidden"
    >
      {!vendursData?.data ?(
         <CardHeader
         className="p-0"
         >
        <Skeleton className="w-44 p-1"/>
        <Skeleton className="w-60 p-1"/>
         
       </CardHeader>
      ):(
      <CardHeader
      className=" p-0"
      >
        <CardTitle>
            المبيعات الشهرية لكل بائع
        </CardTitle>
        <CardDescription>
            البيانات الشهرية للمبيعات لكل بائع
        </CardDescription>
      </CardHeader>
      )}
      <CardContent className=" p-0 w-full">
        <div className="h-[290px] py-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
            
            width={150} height={40} data={vendursData?.data}>
              {
              vendursData?.data&&(
                  <CartesianGrid
              opacity={0.4}
                vertical={false}
              />
                )
              }
          <Bar
          radius={[5, 5, 0, 0]}
          label={{ fill: 'white', fontSize: 9, fontWeight:'bold' }}
          dataKey="le_prix_a_paye"

           fill="currentColor"
           className=" fill-primary"
            />
           <XAxis
                dataKey="nom"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 9 }}
            />
        </BarChart>
        </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}