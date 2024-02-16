import React from 'react'

//  lucide icons
import { BarChartBig } from 'lucide-react';
import { Coffee } from 'lucide-react';
import { Package } from 'lucide-react';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
function Sidemenu() {
    return (
        <div className='  flex  h-full z-50'>
        <div className=" w-full bg-orange-500 text-white  flex flex-col h-[100%]  ">
        {/* الشعار  */}
        <div className=" uppercase flex gap-2 justify-center items-center text-xl  mt-5  font-semibold">
            <span> <Coffee /></span>
            <h1> <Link href="/">نغمة</Link></h1>
        </div>
        {/* نهاية الشعار  */}
        <hr className="w-[80%] flex mx-auto my-4 " />
        {/* عناصر القائمة */}
        <div className="flex flex-col gap-2  mr-5 text-md gap-y-5 mt-4 ">
            <a href="/dashboard" className=" font-semibold flex items-center gap-2">
                <BarChartBig />
                لوحة القيادة

            </a>
            <a href="dashboard/raw-product" className=" font-semibold flex items-center gap-2">
                <Package  />
                المنتج الاولي
            </a>
            <a href="#" className=" font-semibold flex items-center gap-2">
                <PackageOpen />
                 المنتج النهائي
            </a>
        </div>
        {/* نهاية عناصر القائمة */}
    </div>
        </div>

 
    )
}

export default Sidemenu