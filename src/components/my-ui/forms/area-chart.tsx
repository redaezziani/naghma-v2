"use client"

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getEarningsByMonth } from "@/(db)/errning";
import { useEffect, useState } from "react";


export function EreaChart() {
    const [errningData , setErrningData] = useState([]);
    const handelData = async () => {
        try {
            const res = await getEarningsByMonth();
            if (res?.status === 'success') {
                // @ts-ignore
                setErrningData(res.data);
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
    className="w-full  h-full border-none shadow-none  overflow-hidden"
    >
      <CardHeader>
        <CardTitle
        className=" text-slate-950 dark:text-slate-50"
        >
            الأرباح الشهرية
        </CardTitle>
        <CardDescription>
            البيانات الشهرية للأرباح الشهرية
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 w-full">
        <div className="h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart

              data={errningData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 0,
              }}
              
             
            >
                <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00db80" stopOpacity={0.4}/>
                  <stop offset="75%" stopColor="#00db80" stopOpacity={0.05}/>
                </linearGradient>
                </defs>
                <Area
                dataKey="totalEarnings"
                stroke="#00db80"
                fill="url(#color)"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background   shadow-primary/25 p-2 shadow-sm">
                          <div className="flex w-24  justify-center items-center flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                الأرباح
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          
                      </div>
                    )
                  }
                  return null
                }}
              />
              <CartesianGrid
              opacity={0.4}
                vertical={false}
              />
              <YAxis
                dataKey="totalEarnings"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10 }}
                />
                <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10 }}
                />
            </AreaChart>  
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}