'use client';

import { DataTable } from '@/components/my-ui/data-table';

export interface ColumnDef {
    accessorKey: string;
    header: string;
    cell: ({ row }: { row: any }) => JSX.Element;
}

const TablePayments = ({...props}) => {
    const payments = props.payments ?? [];
    const total = payments.reduce((acc: number, curr: any) => acc + curr.price, 0);
    const columns: ColumnDef[] = [
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
