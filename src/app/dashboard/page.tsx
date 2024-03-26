'use client';
import { Card } from '@/components/ui/card';
import BarChart from '@/components/my-ui/chart-bar';
import { useEffect, useState } from 'react';
import { getEarningsOfCurrentMonth, getLossesReturnOfCurrentMonth, getTotalVendursFraisByMonth } from '@/(db)/errning';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createTotalSelles, getHowmuchrRest, getTotalExpensesByMonth } from '@/(db)/data';
import DataCard from '@/components/my-ui/anlys/data-card';
import CompanyExpense from '@/components/my-ui/forms/create-company-expense';
const Dashboard = () => {
  const [earnings, setEarnings] = useState(0);
  const [losses, setLosses] = useState(0);
  const [companyExpenses, setCompanyExpenses] = useState(0);
  const [Frais, setFrais] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalQuantite, setTotalQuantite] = useState(0);
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
    } catch (error) {
      throw new Error('error');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="flex min-h-screen  flex-col items-center relative justify-center px-5">

      <div
        className='flex flex-col w-full relative z-0 px-4 py-3 overflow-auto gap-6 justify-start items-start'
      >
        <div className="flex  w-full  mt-12 flex-row gap-3  items-start justify-between ">
          <h1 className="text-2xl font-bold text-primary">
            الرئيسية
          </h1>
          <div className='flex gap-4 flex-wrap'>
            <CompanyExpense />
            <Button
            variant={'outline'}
            >
              <Link href="/dashboard/contributions"> المساهمات </Link>
            </Button>
            <Button
            variant={'outline'}
            >
              <Link href="/dashboard/capital-month"> حساب الارباح</Link>
            </Button>
          </div>
        </div>
        <div className="flex mt-8 w-full flex-col gap-3 justify-start items-start">
          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            <DataCard value={earnings} title='المبيعات (شهريًا)' />
            <DataCard value={losses} title='الخسائر للمنتجات التي ارجعت' />
            <DataCard value={companyExpenses} title=' مصاريف الشركة (شهريًا)' />
            <DataCard value={Frais} title=' مصاريف البائعين (شهريًا)' />
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
          
          <Card className="w-full col-span-4 flex-col lg:py-6  h-fit flex justify-center items-center lg:h-96 lg:col-span-2 p-2 shadow-none">
            <p
              className='text-lg font-bold text-primary mb-4'
            >
              البائعين الأكثر مبيعًا (الشهر الحالي)
            </p>
            <BarChart
              color='33, 95%, 56%' />
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
