import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="w-full bg-muted flex flex-col gap-4 relative justify-center items-center h-screen">
        <Link
            href="/dashboard"
            
            className=" text-slate-400 hover:text-primary duration-500 ease-in-out left-10 top-6 absolute"
        >
        <ArrowLeftIcon size={18} />
        </Link>
        <img
        className='w-96 h-96 relative z-10'
        src="/No-Results.svg" alt="" />
        <h1 className="text-[10rem] opacity-15 z-0 absolute font-bold text-primary  ">404</h1>
        <p className="text-lg font-semibold text-primary">الصفحة المطلوبة غير موجودة</p>
    </div>
  )
}

export default NotFoundPage