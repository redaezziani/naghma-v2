"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function Vendor_profile() {

    return (
        <div className=" mt-20 
        flex
        flex-col
         justify-start items-start gap-7
         w-full
        lg:w-2/3
        px-6 py-3 relative">
                <h1 className='text-2xl font-bold text-primary '>
                ملف البائع
                </h1>
                <div className='flex flex-col gap-3'>
                    <p>الاسم</p>
                    <p>المبلغ الواجب ادائه </p>
                    <p>المبلغ المدفوع</p>
                    <p>المصاريف</p>
                    <hr />
                    <p> الأرباح :</p>

                </div>

        </div>
    )
}

export default Vendor_profile