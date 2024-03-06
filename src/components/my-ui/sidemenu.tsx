'use client'
import React from 'react'
import { Boxes, Gauge, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { usePathname } from 'next/navigation';
function Sidemenu() {
    const pathName = usePathname()
    const vendorList = [
        {
            name: 'سجلات الموزعين',
            path: '/dashboard/vendor'
        },
        
        {
            name: 'سجلات المبيعات',
            path: '/dashboard/vendor/vendors-logs'
        },
        {
            name: 'سجلات الارجاع',
            path: '/dashboard/vendor/retourn'
        }
    ]
    const finalProductList = [
        {
            name: 'سجلات المنتجات النهائية',
            path: '/dashboard/final-product'
        },
        {
            name: 'سجلات المبيعات',
            path: '/dashboard/final-product/final-product-logs'
        },
        {
            name: 'سجلات الارجاع',
            path: '/dashboard/final-product/retourn'
        }
    ]
    return (
        <div className='  flex  h-full bg-white flex-col justify-start items-start z-50'>
             <div className=" uppercase flex gap-2 justify-start px-4 items-center text-xl    font-semibold">
                    <Image
                    width={25}
                    height={25}
                    src="/logo.svg" alt="logo" className="w-10 h-10" />
                    <h1>
                        <Link href="/dashboard">
                            لوحة القيادة 
                        </Link>
                    </h1>
                </div>
                <hr className="w-[80%] flex mx-auto my-4 " />
            
            <div className=" w-full  text-primary  flex flex-col h-[100%] mt-16  ">
                <div className="flex flex-col gap-2  mr-5 text-md gap-y-5 mt-4 ">
                    <Link

                        href="/dashboard" className={` flex items-center gap-2 ${pathName === '/dashboard' ? 'text-primary' : 'text-gray-500'}`}>
                        <Gauge
                        className='w-6 stroke-1 h-6'
                        />
                        لوحة القيادة
                    </Link>

                        <Accordion
                            color='primary'
                            type="single"
                            collapsible className="w-full mb-2 border-none">
                            <AccordionItem
                                className='border-none'
                                value="item-1">
                                <AccordionTrigger
                                    className='border-none w-full'
                                >
                                    <div
                                        className={`flex w-full items-center font-semibold gap-2 ${pathName.includes('/dashboard/final-product') ? 'text-primary' : 'text-gray-500'}`}
                                    >
                                        <Boxes
                                        className='w-6 stroke-1 h-6'
                                        />
                                        <p
                                            className='border-none no-underline'
                                        >
                                            المنتجات النهائية
                                        </p>
                                    </div>
                                </AccordionTrigger>
                                <AnimatePresence>
                                {
                                    finalProductList.map((item, index) => (
                                       <motion.div
                                       layoutId='accordion-content'
                                       key={index}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.3}}

                                       className="div">
                                         <AccordionContent
                                        className=' px-4'
                                        key={index}
                                        >
                                            <Link
                                            className={`flex items-center px-3 py-1 gap-2 ${pathName === item.path ? ' text-primary-foreground bg-primary' : 'text-gray-500'}`}
                                            href={item.path}>
                                                {item.name}
                                            </Link>
                                        </AccordionContent>
                                       </motion.div>
                                    ))
                                } 
                                </AnimatePresence>
                            </AccordionItem>
                        </Accordion>
                    
                    <Accordion
                        color='primary'
                        type="single"
                        collapsible className="w-full mb-2 border-none">
                        <AccordionItem
                            className='border-none'
                            value="item-1">
                            <AccordionTrigger
                                className='border-none w-full'
                            >
                                <div
                                    className={`flex w-full items-center font-semibold gap-2 ${pathName.includes('/dashboard/vendor') ? 'text-primary' : 'text-gray-500'}`}
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
                            <AnimatePresence>
                            {
                                vendorList.map((item, index) => (
                                   <motion.div
                                   layoutId='accordion-content'
                                   key={index}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3}}

                                   className="div">
                                     <AccordionContent
                                    className=' px-4'
                                    key={index}
                                    >
                                        <Link
                                        className={`flex items-center px-3 py-1 gap-2 ${pathName === item.path ? ' text-primary-foreground bg-primary' : 'text-gray-500'}`}
                                        href={item.path}>
                                            {item.name}
                                        </Link>
                                    </AccordionContent>
                                   </motion.div>
                                ))
                            } 
                            </AnimatePresence>
                        </AccordionItem>
                    </Accordion>
                    </div>
                </div>
        </div>
    )
}

export default Sidemenu