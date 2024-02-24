import React from 'react'
import { BarChartBig, CarIcon, Truck } from 'lucide-react';
import { Coffee } from 'lucide-react';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
function Sidemenu() {
    return (
        <div className='  flex  h-full z-50'>
            <div className=" w-full bg-white text-primary  flex flex-col h-[100%]  ">
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
                    <Accordion
                        color='primary'
                        type="single"
                        collapsible className="w-full mb-2 border-none">
                        <AccordionItem
                            className='border-none'
                            value="item-1">
                            <AccordionTrigger
                                className='border-none lg:max-w-48'
                            >
                                <div className="flex font-semibold justify-start items-center gap-2 hover:no-underline">
                                    <Truck
                                    className='w-5 h-5'
                                    />
                                    <p
                                        className='border-none no-underline'
                                    >
                                        الموزعون
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Link href="/dashboard/vendor">
                                    سجلات الموزعين
                                </Link>
                            </AccordionContent>
                            <AccordionContent>
                                <Link href="/dashboard/vendor/add-vendor"> 
                                        اضافة موزع
                                </Link>
                            </AccordionContent>
                            <AccordionContent>
                                <Link href="/dashboard/vendor/vendors-logs"> 
                                        سجلات المبيعات
                                </Link>
                            </AccordionContent>
                            <AccordionContent>
                                <Link href="/dashboard/vendor/retourn"> 
                                        سجلات الارجاع
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                {/* نهاية عناصر القائمة */}
            </div>
        </div>


    )
}

export default Sidemenu