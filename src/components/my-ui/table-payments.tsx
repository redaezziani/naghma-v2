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
          const res = await menusPayments(id)
          if (res?.status=='error') {
              toast.error(res.message)
          }
          console.log(res)
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
            cell: ({ row }: { row: any }) => <div>{row.getValue('type')}</div>,
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
