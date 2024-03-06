'use client';

import { getPayments } from '@/(db)/data';
import { menusPayments } from '@/(db)/vendur';
import { DataTable } from '@/components/my-ui/data-table';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
export interface ColumnDef {
    accessorKey: string;
    header: string;
    cell: ({ row }: { row: any }) => JSX.Element;
}

const TablePayments = ({...props}) => {
    const [payments, setPayments] = useState(props.payments);
    const total = payments.reduce((acc: number, curr: any) => acc + curr.price, 0);
    const handelPayments = async (id:string) => {
        try {
          if (!id) toast.error('حدث خطأ ما')
          if (!confirm('هل أنت متأكد من حذف هذا السجل؟')) {
                toast.error('تم إلغاء العملية')
                return
          }
          const res = await menusPayments(id)
          if (res?.status=='error') {
              toast.error(res.message)
          }
          toast.success(res?.message)
        } catch (error) {
            console.log('handelPayments',error)
        }
    }
    const columns: ColumnDef[] = [
        {
            accessorKey: 'id',
            header: 'id',
            cell: ({ row }: { row: any }) => <div>{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'date',
            header: 'التاريخ',
            cell: ({ row }: { row: any }) => <div>{new Date(row.getValue('date')).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>,
        },
        {
            accessorKey: 'type',
            header: 'النوع',
            cell: ({ row }: { row: any }) => <div
            className={`px-2 py-1 rounded-md text-xs font-semibold ${row.getValue('type')=='cash'?'bg-green-100 w-fit text-green-500':row.getValue('type')=='bank-check'?'bg-[#fa9b2637] w-fit text-[#fa9b26]':row.getValue('type')=='return'?'bg-red-100 w-fit text-red-500':'bg-slate-100 w-fit text-slate-500'}`}
            >{row.getValue('type')=='cash'?'نقدا':row.getValue('type')=='bank-check'?'شيك':row.getValue('type')=='return'?'إرجاع':'غير معروف'}</div>,
        },
        {
            accessorKey: 'price',
            header: 'السعر',
            cell: ({ row }: { row: any }) => <div>{row.getValue('price')} د.م</div>,
        },
        {
            accessorKey: 'actions',
            header: 'العمليات',
            cell: ({ row }: { row: any }) => <div>
                <Trash
                    onClick={() => handelPayments(row.getValue('id'))}
                    className="cursor-pointer w-4 h-4 text-slate-400 hover:text-red-500 transition-all ease-in-out duration-300"
                />
            </div>,
        },
    ];
    
    
    return (
        <div className=" 
        flex
        flex-col
         w-full
         gap-4
         overflow-hidden
         justify-start items-start
         ">
            <h3 className=' w-full px-2 text-lg text-primary'>
               جدول المدفوعات
            </h3>
           {
            payments? (
                <DataTable
                columns={columns}
                data={payments} 
                total={total}
            />
            )
            : (
                <div className="flex justify-center items-center w-full h-40">
                    <p>لا توجد منتجات مباعة</p>
                </div>
            )
           }
        </div>
    );
};

export default TablePayments;
