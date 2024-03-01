'use client';

import { DataTable } from '@/components/my-ui/data-table';


export interface ColumnDef {
    accessorKey: string;
    header: string;
    cell: ({ row }: { row: any }) => JSX.Element;
}

const CompanyLoss = ({...props}) => {
    const loss = props.losses ?? [];
    const total = loss.reduce((acc: number, curr: any) => acc + curr.price, 0);
    const columns: ColumnDef[] = [
        {
            accessorKey: 'date',
            header: 'التاريخ',
            cell: ({ row }: { row: any }) => <div>{new Date(row.getValue('date')).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>,
        },
        {
            accessorKey: 'productName',
            header: 'المنتج',
            cell: ({ row }: { row: any }) => <div>{row.getValue('productName')}</div>,
        },
        {
            accessorKey: 'quantity',
            header: 'الكمية',
            cell: ({ row }: { row: any }) => <div>{row.getValue('quantity')} كلغ</div>,
        },
        {
            accessorKey: 'price',
            header: 'السعر',
            cell: ({ row }: { row: any }) => <div>{row.getValue('price').toFixed(2)} دج</div>,
        },
        
    ];

   

    return (
        <div className={`
        flex
        flex-col
         w-full
         ${loss.length > 0 ? 'block' : 'hidden'}
         overflow-hidden
         justify-start items-start
         `}>
            <h3 className=' w-full px-2 text-lg text-primary'>
                المنتجات المفقودة
            </h3>
            <DataTable
                columns={columns}
                data={loss} 
                total={total}
            />
        </div>
    );
};

export default CompanyLoss;
