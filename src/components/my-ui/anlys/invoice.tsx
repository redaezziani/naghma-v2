"use client";
import React, { forwardRef, ForwardedRef, HTMLAttributes } from 'react';

const ComponentToPrint = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    //@ts-ignore
    const vendur = props.vendur ?? {};
    //@ts-ignore
    const payments = props.payments ?? [];
    //@ts-ignore
    const sales = props.sales ?? [];
    // lets group the payments by  type and sum the price in array of objects
    let grouped: any[] = [];
    payments.forEach((curr: any) => {
      const existingGroup = grouped.find((group: any) => group.type === curr.type);
      if (existingGroup) {
        existingGroup.price += curr.price;
      } else {
        grouped.push({ type: curr.type, price: curr.price, date: curr.date });
      }
    });
    let sells_grouped: any[] = [];
    sales.forEach((curr: any) => {
      const existingGroup = sells_grouped.find((group: any) => group.productName === curr.productName);
      if (existingGroup) {
        existingGroup.quantity += curr.quantity;
        existingGroup.totalPrice += curr.price * curr.quantity;
      } else {
        sells_grouped.push({ productName: curr.productName, quantity: curr.quantity, totalPrice: curr.price * curr.quantity });
      }
    });
     let total_sells = sells_grouped.reduce((acc: number, curr: any) => acc + curr.totalPrice, 0);
    const total = payments.reduce((acc: number, curr: any) => acc + curr.price, 0);
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
      
      <div className='flex  mt-11 text-xs font-semibold flex-col gap-3'>
        <p>اسم البائع : <span className=' '>{vendur.nom}</span></p>
        <p>المبلغ الذي يجب أن يدفع : <span className='font-medium'>{vendur.le_prix_a_paye} د.م </span></p>
        <p>المبلغ الذي تم إرجاعه : <span className='font-medium'>{vendur.le_prix_a_payer} د.م </span></p>
        <p>النفقات والمصاريف : <span className='font-medium'>{vendur.frais_de_prix} د.م </span></p>
        <p>
          المبلغ المتبقي لدفعه :
          <span className={
            ` font-medium`}
          >{vendur.balance} د.م </span></p>
        <p>
          إجمالي الكمية المأخوذة :
          <span className=' font-medium'> {vendur.total_sell_quantity} كلغ</span></p>
      </div>
      <h4
      className=' mt-3 font-semibold text-slate-600'
      >
      جدول الدفعات :
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
              التاريخ
            </th>
            <th
            className='p-2'
            >
              النوع
            </th>
            <th
            className='p-2'
            >
              السعر
            </th>
          </tr>
        </thead>
        <tbody
        className='text-xs text-slate-700'
        >
          {
            grouped.map((payment: any, index: number) => {
              return (
                <tr
                key={index}
                className='text-center'
                >
                  <td
                  className='p-2'
                  >
                    {new Date(payment.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </td>
                  <td
                  className='p-2'
                  >
                    {payment.type}
                  </td>
                  <td
                  className='p-2'
                  >
                    {payment.price} د.م
                  </td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot
        
        className='text-xs font-semibold text-slate-900'
        >
          <tr
          
          className='text-center'
          >
            <td
            className='p-2'
            >
              الإجمالي
            </td>
            <td
            className='p-2'
            >
              {total} د.م
            </td>
          </tr>
        </tfoot>
      </table>
      <h4
      className=' mt-3 font-semibold text-slate-600'
      >
      جدول المبيعات :
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
              اسم المنتج
            </th>
            <th
            className='p-2'
            >
              الكمية
            </th>
            <th
            className='p-2'
            >
              السعر
            </th>
          </tr>
        </thead>
        <tbody
        className='text-xs text-slate-700'
        >
          {
            sells_grouped.map((sell: any, index: number) => {
              return (
                <tr
                key={index}
                className='text-center'
                >
                  <td
                  className='p-2'
                  >
                    {sell.productName}
                  </td>
                  <td
                  className='p-2'
                  >
                    {sell.quantity} كلغ
                  </td>
                  <td
                  className='p-2'
                  >
                    {sell.totalPrice} د.م
                  </td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot
        className='text-xs font-semibold text-slate-900'
        >
          <tr
          className='text-center'
          >
            <td
            className='p-2'
            >
              الإجمالي
            </td>
            <td
            className='p-2'
            >
              {total_sells} د.م
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    )
  }
);

export default ComponentToPrint;