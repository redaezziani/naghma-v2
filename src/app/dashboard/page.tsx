'use client';
import { Card } from '@/components/ui/card';
import LineChart from '@/components/my-ui/chart-line';
import BarChart from '@/components/my-ui/chart-bar';
import { useEffect, useState } from 'react';
import { getEarningsOfCurrentMonth, getLossesReturnOfCurrentMonth, getTotalVendursFraisByMonth } from '@/(db)/errning';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createTotalSelles, getHowmuchrRest, getTotalExpensesByMonth } from '@/(db)/data';
const Dashboard = () => {
  const [earnings, setEarnings] = useState(0);
  const [losses, setLosses] = useState(0);
  const [companyExpenses, setCompanyExpenses] = useState(0);
  const [Frais, setFrais] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalQuantite, setTotalQuantite] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [earningsResponse, lossesResponse, companyExpensesResponse, FraisResponse, totalPaidResponse , totalQuantiteResponse] = await Promise.all([
          getEarningsOfCurrentMonth(),
          getLossesReturnOfCurrentMonth(),
          getTotalExpensesByMonth(),
          getTotalVendursFraisByMonth(),
          getHowmuchrRest(),
          createTotalSelles()
        ]);
        setEarnings(earningsResponse?.data ?? 0);
        //@ts-ignore
        setLosses(lossesResponse?.data);
        setCompanyExpenses(companyExpensesResponse?.data ?? 0) ;
        setFrais(FraisResponse?.data ?? 0);
        setTotalPaid(totalPaidResponse?.data?.total_prix_a_payer ?? 0);
        setTotalUnpaid(totalPaidResponse?.data?.result ?? 0);
        setTotalQuantite(totalQuantiteResponse?.data?.quantite ?? 0);
        console.log( totalQuantiteResponse);
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
        <div className="flex  w-full  mt-20 flex-row gap-3  items-center justify-between ">
          <h1 className="text-2xl font-bold text-primary">
            الرئيسية
          </h1>
          <div className='flex gap-4 '>
            <Button>
              <Link href="/dashboard/company-expense">نفقات الشركة</Link>
            </Button>
            <Button>
              <Link href="/dashboard/contributions"> المساهمات </Link>
            </Button>
            <Button>
              <Link href="/dashboard/capital-month"> حساب الارباح</Link>
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">

            <Card className="w-full col-span-1 relative  shadow-none overflow-hidden h-20 p-2   flex justify-between items-center border rounded-lg  ">
              <div
                className=''
              >
                <p className=" text-xs">المبيعات (شهريًا)</p>
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
                الخسائر ( للمنتجات التي ارجعت)
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
                  مصاريف الشركة (شهريًا)
                </p>
                <p className="font-semibold text-xl text-destructive mt-1">
                  {companyExpenses} د.م
                </p>
              </div>
            </Card>
            <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
              <div
                className=' '
              >
                <p className="text-xs text-bold">
                  مصاريف البائعين (شهريًا)
                </p>
                <p className="font-semibold text-xl text-destructive mt-1">
                  {Frais} د.م
                </p>
              </div>
            </Card>
           
          </div>
          
          <div 
            className='grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-3  w-full'
            >
              <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
                <div
                  className=' '
                >
                  <p className="text-xs text-bold">
                    المبلغ المدفوع للبائعين  (شهريًا)
                  </p>
                  <p className="font-semibold text-xl text-[#15ef70]  mt-1">
                    {totalPaid} د.م
                  </p>
                </div>
              </Card>
              <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
                <div
                  className=' '
                >
                  <p className="text-xs text-bold">
                     المبلغ المتبقي للبائعين دفعه (شهريًا)
                  </p>
                  <p className="font-semibold text-xl text-destructive mt-1">
                    {totalUnpaid} د.م
                  </p>
                </div>
              </Card>
              <Card className="w-full col-span-1 relative  shadow-none  overflow-hidden h-20 p-2 flex justify-between items-center border rounded-lg">
              <div
                className=' '
              >
                <p className="text-xs text-bold">
                 الكمية المباعة (شهريًا)
                </p>
                <p className="font-semibold text-xl text-destructive mt-1">
                  {totalQuantite} كلغ
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
