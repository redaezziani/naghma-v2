'use client';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import LineChart from '@/components/my-ui/chart-line';
import BarChart from '@/components/my-ui/chart-bar';
import { useEffect, useState } from 'react';
import { getEarningsOfCurrentMonth } from '@/(db)/errning';
const Dashboard = () => {
  const [earnings, setEarnings] = useState('')
  const getEarnings = async () => {
    const res = await getEarningsOfCurrentMonth();
    //@ts-ignore
    setEarnings(res?.data ?? 0)
  }
  useEffect(() => {
    getEarnings()
  }
    , [])
  return (
    <main className="flex min-h-screen  flex-col items-center relative justify-center px-5">

      <div
        className='flex flex-col w-full relative z-0 px-4 py-3 overflow-auto gap-6 justify-start items-start'
      >
        <div className="flex w-full  mt-20 flex-col gap-3 justify-start items-start">
          <h1 className="text-2xl font-bold text-primary">
            الرئيسية
          </h1>
          
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">

          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">

            <Card className="w-full col-span-1  shadow-none py-7 px-5 flex justify-between items-center border rounded-lg  ">
              <div>
                <p className=" text-xs">الأرباح (شهريًا)</p>
                <p className="font-semibold text-xl text-emerald-500 mt-1">
                  {earnings} د.م
                </p>
              </div>
              <Calendar className="w-9 h-9" />
            </Card>

            <Card className="w-full col-span-1  shadow-none  py-7 px-5 flex justify-between items-center border rounded-lg">
              <div>
                <p className="text-xs text-bold">الأرباح (سنويًا)</p>
                <p className="font-semibold text-xl mt-1">$215,000</p>
              </div>
              <Calendar className="w-9 h-9" />
            </Card>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-6">
          <Card className="w-full h-fit flex justify-center flex-col items-center col-span-4  lg:col-span-2 lg:h-96 p-2 shadow-none">
            <p
            className='text-lg font-bold text-primary mb-4'
            >
              الأرباح الشهرية
            </p>
            <LineChart
            color='228, 100%, 50%'
            tension={0.1}
            />
          </Card>
          <Card className="w-full col-span-4 flex-col  h-fit flex justify-center items-center lg:h-96 lg:col-span-2 p-2 shadow-none">
            <p
            className='text-lg font-bold text-primary mb-4'
            >
              البائعين الأكثر مبيعًا (الشهر الحالي)
            </p>
            <BarChart
            color='228, 100%, 50%' />
          </Card>
        </div>
        <Card className="w-full grid grid-cols-3 h-96 shadow-none gap-6">
        </Card>
      </div>
    </main>
  );
}

export default Dashboard;
