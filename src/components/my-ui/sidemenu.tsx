'use client'
import React from 'react'
import { Boxes, Gauge, Truck } from 'lucide-react';
import { Coffee } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { usePathname } from 'next/navigation';
function Sidemenu() {
    const pathName = usePathname()
    return (
        <div className='  flex  h-full z-50'>
            <div className=" w-full bg-white text-primary  flex flex-col h-[100%]  ">
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

                        href="/dashboard" className={` flex items-center gap-2 ${pathName === '/dashboard' ? 'text-primary' : 'text-gray-500'}`}>
                        <Gauge
                        className='w-6 stroke-1 h-6'
                        />
                        لوحة القيادة
                    </Link>

                    <Link href="/dashboard/final-product" className={`flex font-medium items-center gap-2 ${pathName === '/dashboard/final-product' ? 'text-primary' : 'text-gray-500'}`}>
                        <Boxes
                        className='w-6 stroke-1 h-6'
                        />
                        المنتج النهائي
                    </Link>
                    <div >
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
                                <div
                                    className={`flex items-center font-semibold gap-2 ${pathName.includes('/dashboard/vendor') ? 'text-primary' : 'text-gray-500'}`}
                                >
                                    <Truck
                                    className='w-6 stroke-1 h-6'
                                    />
                                    <p
                                        className='border-none no-underline'
                                    >
                                        الموزعون
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Link
                                className={`flex items-center gap-2 ${pathName === '/dashboard/vendor' ? 'text-primary' : 'text-gray-500'}`}
                                href="/dashboard/vendor">
                                    سجلات الموزعين
                                </Link>
                            </AccordionContent>
                            <AccordionContent>
                                <Link
                                className={`flex items-center gap-2 ${pathName === '/dashboard/vendor/add-vendor' ? 'text-primary' : 'text-gray-500'}`}
                                href="/dashboard/vendor/add-vendor"> 
                                        اضافة موزع
                                </Link>
                            </AccordionContent>
                            <AccordionContent>
                                <Link
                                className={`flex items-center gap-2 ${pathName === '/dashboard/vendor/vendors-logs' ? 'text-primary' : 'text-gray-500'}`}
                                href="/dashboard/vendor/vendors-logs"> 
                                        سجلات المبيعات
                                </Link>
                            </AccordionContent>
                            <AccordionContent>
                                <Link
                                className={`flex items-center gap-2 ${pathName === '/dashboard/vendor/retourn' ? 'text-primary' : 'text-gray-500'}`}
                                href="/dashboard/vendor/retourn"> 
                                        سجلات الارجاع
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Sidemenu