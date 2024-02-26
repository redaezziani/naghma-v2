'use client';
import { Card } from '@/components/ui/card';
import LineChart from '@/components/my-ui/chart-line';
import BarChart from '@/components/my-ui/chart-bar';
import { useEffect, useState } from 'react';
import { getEarningsOfCurrentMonth, getLossesByMonth } from '@/(db)/errning';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const Dashboard = () => {
  const [earnings, setEarnings] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [earningsResponse, lossesResponse] = await Promise.all([
          getEarningsOfCurrentMonth(),
          getLossesByMonth()
        ]);
        console.log(earningsResponse);
        console.log(lossesResponse);

        setEarnings(earningsResponse?.data ?? 0);
        setLosses(lossesResponse?.data ?? 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="flex min-h-screen  flex-col items-center relative justify-center px-5">

      <div
        className='flex flex-col w-full relative z-0 px-4 py-3 overflow-auto gap-6 justify-start items-start'
      >
          <div className="flex  w-full  mt-10 flex-row gap-3  items-center justify-between ">
            <h1 className="text-2xl font-bold text-primary">
              الرئيسية
            </h1>
            <Button>
              <Link href="/dashboard/company-expense">نفقات الشركة</Link>
            </Button>
          </div>
          
      

        <div className="flex w-full flex-col gap-3 justify-start items-start">

          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">

            <Card className="w-full col-span-1 relative  shadow-none overflow-hidden h-20 p-2   flex justify-between items-center border rounded-lg  ">
              <div
                className=''
              >
                <p className=" text-xs">الأرباح (شهريًا)</p>
                <p className="font-semibold text-xl text-[#15ef70] mt-1">
                  {earnings} د.م
                </p>
              </div>
            </Card>
            <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
              <div
                className=' '
              >
                <p className="text-xs text-bold">
                  الخسائر (شهريًا)
                </p>
                <p className="font-semibold text-xl text-destructive mt-1">
                  {losses} د.م
                </p>
              </div>
            </Card>
            <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
              <div
                className=' '
              >
                <p className="text-xs text-bold">
                  الخسائر (شهريًا)
                </p>
                <p className="font-semibold text-xl text-destructive mt-1">
                  {losses} د.م
                </p>
              </div>
            </Card>
            <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
              <div
                className=' '
              >
                <p className="text-xs text-bold">
                  الخسائر (شهريًا)
                </p>
                <p className="font-semibold text-xl text-destructive mt-1">
                  {losses} د.م
                </p>
              </div>
            </Card>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-6">
          <Card className="w-full h-fit flex justify-center lg:py-6 flex-col items-center col-span-4  lg:col-span-2 lg:h-96 p-2 shadow-none">
            <p
              className='text-lg font-bold text-primary mb-4'
            >
              الأرباح الشهرية
            </p>
            <LineChart
              color='228, 100%, 66%'
              tension={0}
            />
          </Card>
          <Card className="w-full col-span-4 flex-col lg:py-6  h-fit flex justify-center items-center lg:h-96 lg:col-span-2 p-2 shadow-none">
            <p
              className='text-lg font-bold text-primary mb-4'
            >
              البائعين الأكثر مبيعًا (الشهر الحالي)
            </p>
            <BarChart
              color='228, 100%, 66%' />
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
