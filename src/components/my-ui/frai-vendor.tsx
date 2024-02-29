'use client';

import { DataTable } from '@/components/my-ui/data-table';

export interface ColumnDef {
    accessorKey: string;
    header: string;
    cell: ({ row }: { row: any }) => JSX.Element;
}


const FraisVendor = ({...props}) => {
    const frais = props.payments ?? [];
    const total = frais.reduce((acc: number, curr: any) => acc + curr.prix , 0);
    const columns: ColumnDef[] = [
        {
            accessorKey: 'created_at',
            header: 'التاريخ',
            cell: ({ row }: { row: any }) => <div>{new Date(row.getValue('created_at')).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>,
        },
        {
            accessorKey: 'type',
            header: 'النوع',
            cell: ({ row }: { row: any }) => <div>{row.getValue('type')}</div>,
        },
        {
            accessorKey: 'prix',
            header: 'السعر',
            cell: ({ row }: { row: any }) => <div>{row.getValue('prix')} د.م</div>,
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
               جدول المصاريف
            </h3>
           {
            frais? (
                <DataTable
                columns={columns}
                data={frais} 
                total={total}
            />
            )
            : (
                <div className="flex justify-center items-center w-full h-40">
                    <p>لا توجد مصاريف</p>
                </div>
            )
           }
        </div>
    );
};

export default FraisVendor;
