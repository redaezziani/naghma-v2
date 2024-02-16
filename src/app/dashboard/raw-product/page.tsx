import { Card } from '@/components/ui/card'
import React from 'react'

const RawProducts = () => {
  return (
    <div
    className='flex flex-col w-full relative z-0 px-4 py-3 overflow-auto gap-6 justify-start items-start'
    >
        <nav className=" w-full fixed top-0 right-0 bg-slate-300 z-40 h-14">

        </nav>
        <div className="flex w-full  mt-28 flex-col gap-3 justify-start items-start">
            <h1 className="text-2xl font-bold text-primary">
                المنتجات الخام
            </h1>
            <p className="text-sm text-gray-500">
                هنا يمكنك إضافة وتعديل وحذف المنتجات الخام
            </p>
        </div>
       <div className="flex w-full flex-col gap-3 justify-start items-start">
        <h1
        className='text-lg font-bold text-primary'
        >
            الفيديوهات
        </h1>
       <div className="w-full grid gap-6 grid-cols-4">
            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none p-2"></Card>
            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none p-2"></Card>
            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none p-2"></Card>
            <Card className="w-full col-span-1 h-2/3 aspect-video shadow-none p-2"></Card>
        </div>
       </div>
        <div className="w-full grid grid-cols-3 gap-6">
            <Card className="w-full col-span-2 h-96 p-2 shadow-none"></Card>
            <Card className="w-full col-span-1 h-96 p-2 shadow-none"></Card>
        </div>
        <Card className="w-full grid grid-cols-3 h-96 shadow-none gap-6">
        </Card> 
    </div>
  )
}

export default RawProducts