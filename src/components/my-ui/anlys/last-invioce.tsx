"use client";
import React, { forwardRef, HTMLAttributes } from 'react';
const ComponentToPrint = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    //@ts-ignore
    const { final , finalStock , total , totalExpenses , totalFrais , initial_amount_price } = props;
    return (
    <div
     className='w-full flex flex-col justify-start items-start gap-4 p-6'
    ref={ref}>
     <div className="w-full flex justify-between items-center ">
       <div className="flex flex-col gap-2 justify-start items-start">
       <h2
        className=' text-xl font-bold text-slate-700'
        >
          شركة نغمة للقهوة
        </h2>
        <p
        className=' text-xs font-semibold  text-slate-600'
        >
          العنوان: 
          <span
          className=' text-slate-500 mr-2 font-medium'
          >
            المغرب - القنيطرة - بئر الرامي
          </span>
        </p>
       </div>
        <img 
        className=' w-16  aspect-auto '
        src="/naghma.png" alt="image" />
      </div>
      <h4
      className=' mt-3 font-semibold text-slate-600'
      >
        الارباح الشهرية
      </h4>
      <table
      className='w-full border-2 border-slate-200'
      >
        <thead
        className='bg-slate-100 text-center'
        >
          <tr
          className='text-xs font-semibold text-slate-700'
          >
            <th
            className='p-2'
            >
              البداية
            </th>
          
          </tr>
        </thead>
        <tbody
        className='text-center'
        >
          <tr
          className='text-xs font-semibold text-slate-700'
          >
          </tr>  
        </tbody>
      </table>
    </div>
    )
  }
);

export default ComponentToPrint;