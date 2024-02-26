"use client";
import React, { forwardRef, HTMLAttributes } from 'react';
/*
  final = {data.finalResult}
            finalStock = {data.finalResultStock}
            total = {data.total}
            totalExpenses = {data.totalExpenses}
            totalFrais = {data.totalFrais}
            initial_amount_price = {initial_amount_price}
            
*/
// lets make a table for the data
const ComponentToPrint = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    //@ts-ignore
    const { final , finalStock , total , totalExpenses , totalFrais , initial_amount_price } = props;
    return (
    <div
     className='w-full flex flex-col justify-start items-start gap-4 p-6'
    ref={ref}>
    
    </div>
    )
  }
);

export default ComponentToPrint;