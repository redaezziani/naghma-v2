"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useSWR from 'swr';
import { Skeleton } from "@/components/ui/skeleton";
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

export function EreaChart() {
  const { data:errningData, error } = useSWR('/api/data/line', fetcher);
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
    className="w-full p-0 rounded-none  h-full border-none shadow-none  overflow-hidden"
    >
      {!errningData?.data ?(
         <CardHeader
         className="p-0"
         >
        <Skeleton className="w-44 p-1"/>
        <Skeleton className="w-60 p-1"/>
         
       </CardHeader>
      ):(
        <CardHeader
        className="p-0"
        >
        <CardTitle
        className=" text-slate-950 dark:text-slate-50"
        >
            الأرباح الشهرية
        </CardTitle>
        <CardDescription>
            البيانات الشهرية للأرباح الشهرية
        </CardDescription>
      </CardHeader>
      )}
      
      <CardContent className="w-full  p-0">
        <div className="h-[270px]  py-4 ">
          <ResponsiveContainer
          width="100%" height="100%">
            <AreaChart

              data={errningData?.data }
             
              
            
              
             
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
              {
              errningData?.data&&(
                  <CartesianGrid
              opacity={0.4}
                vertical={false}
              />
                )
              }
              <YAxis
                dataKey="totalEarnings"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10 }}
                tickMargin={5}

                />
                <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10 }}
                tickMargin={5}
                />
            </AreaChart>  
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}