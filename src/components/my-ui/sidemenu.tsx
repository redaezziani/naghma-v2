import React from 'react'
import { AnimatePresence,motion } from 'framer-motion';

//  lucide icons
import { BarChartBig, CarIcon } from 'lucide-react';
import { Coffee } from 'lucide-react';
import { PackageOpen } from 'lucide-react';
import { Users } from 'lucide-react';
import Link from 'next/link';
function Sidemenu() {
    return (
        <div className='  flex  h-full z-50'>
        <div className=" w-full bg-accent/15 text-primary  flex flex-col h-[100%]  ">
        {/* الشعار  */}
        <div className=" uppercase flex gap-2 justify-center items-center text-xl  mt-5  font-semibold">
            <span> <Coffee /></span>
            <h1>
            <Link href="/dashboard">
                لوحة القيادة
            </Link>
            </h1>
        </div>
        <hr className="w-[80%] flex mx-auto my-4 " />
        <div className="flex flex-col gap-2  mr-5 text-md gap-y-5 mt-4 ">
            <Link
            
            href="/dashboard" className=" flex items-center gap-2">
                <BarChartBig />
                لوحة القيادة
            </Link>
            
            <Link href="/dashboard/final-product" className=" flex items-center gap-2">
                <PackageOpen />
                 المنتج النهائي
            </Link>
            <button  className=" flex relative w-full items-start justify-start gap-2">
                <CarIcon />
                الموزعون
                <div className="w-full flex flex-col justify-start items-start gap-3 absolute right-0 -bottom-6">
                    <Link href="/dashboard/vendor">
                            الموزعون
                    </Link>
                    <Link href="/dashboard/vendor/add">
                            إضافة موزع
                    </Link>
                </div>
            </button>
        </div>
        {/* نهاية عناصر القائمة */}
    </div>
        </div>

 
    )
}

export default Sidemenu