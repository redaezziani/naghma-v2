'use client';

import { DataTable } from '@/components/my-ui/data-table';

export interface ColumnDef {
    accessorKey: string;
    header: string;
    cell: ({ row }: { row: any }) => JSX.Element;
}

interface IVendur {
    id: string;
    type: string;
    quantity: number;
    totalAmount: number;
}

const SelledProducts = ({...props}) => {
    const payments = props.payments ?? [];
    const total = payments.reduce((acc: number, curr: any) => acc + curr.price* curr.quantity, 0);
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
            cell: ({ row }: { row: any }) => <div>{row.getValue('price')}</div>,
        },
        
    ];

   

    return (
        <div className=" 
        flex
        flex-col
         w-full
         
         overflow-hidden
         justify-start items-start
         ">
            <h3 className=' w-full px-2 text-lg text-primary'>
                المنتجات المباعة
            </h3>
            <DataTable
                columns={columns}
                data={payments} 
            />
        </div>
    );
};

export default SelledProducts;
