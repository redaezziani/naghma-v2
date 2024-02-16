'use client';
import { Card } from '@/components/ui/card';
import { Mode } from "@/components/ui/them-mode";
import { Calendar } from 'lucide-react';
import { BookCheck } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
// shad cd 
import { Progress } from "@/components/ui/progress"
import { UserProfile } from '@/components/my-ui/user-profile';
const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center px-5">
      <div className="top-4 fixed z-50 right-4">
        <Mode />
      </div>
      <div
        className='flex flex-col w-full relative z-0 px-4 py-3 overflow-auto gap-6 justify-start items-start'
      >
        <nav className=" w-full backdrop-blur-sm bg-slate-50/10 fixed top-0 right-0 flex justify-end px-4 z-40 h-14">
          <UserProfile />
        </nav>
        <div className="flex w-full  mt-20 flex-col gap-3 justify-start items-start">
          <h1 className="text-2xl font-bold text-primary">
            الرئيسية
          </h1>

        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">

          <div className="w-full grid gap-6 grid-cols-4">
            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none py-7 px-5 flex justify-between items-center  ">
              <div>
                <p className=" text-xs">الأرباح (شهريًا)</p>
                <p className="font-semibold text-xl mt-1">$40,000</p>
              </div>
              <Calendar className="w-9 h-9" />
            </Card>

            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none p-2 py-7 px-5 flex justify-between items-center">
              <div>
                <p className="text-xs text-bold">الأرباح (سنويًا)</p>
                <p className="font-semibold text-xl mt-1">$215,000</p>
              </div>
              <Calendar className="w-9 h-9" />
            </Card>

            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none p-2 py-7 px-5 flex justify-between items-center">
              <div>
                <p className="text-xs">المهام</p>
                <div className="flex flex-row w-full">
                  <p className="font-semibold text-xl mt-1">50%</p>
                  {/* <Progress value={33} /> */}
                </div>

              </div>
              <Progress value={55} className="w-[66%] mt-6" />
              <BookCheck className="w-9 h-9" />
            </Card>
            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none p-2 py-7 px-5 flex justify-between items-center">
              <div>
                <p className="text-xs">الطلبات المعلقة</p>
                <p className="font-semibold text-xl mt-1">8</p>
              </div>
              <MessageCircle className="w-9 h-9" />
            </Card>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-6">
          <Card className="w-full col-span-2 h-96 p-2 shadow-none"></Card>
          <Card className="w-full col-span-1 h-96 p-2 shadow-none"></Card>
        </div>
        <Card className="w-full grid grid-cols-3 h-96 shadow-none gap-6">
        </Card>
      </div>
    </main>
  );
}

export default Home;