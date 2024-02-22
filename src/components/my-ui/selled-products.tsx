'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/my-ui/data-table';
import { getVendurs, deleteVendur } from '@/(db)/vendur';
import { useRouter } from 'next/navigation';


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

const SelledProducts = () => {
    const [products, setProducts] = useState<IVendur[]>([]);
    const [total, setTotal] = useState(0);
    const handelProducts = async () => {
        try {
            const res = await getVendurs();
            if (res?.status === 'error') {
                setProducts([]);
                return;
            }
            setProducts(res?.data??[]);
            console.log(res);
            setTotal(res?.total_price??0);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteVendur(id);
            if (res?.status === 'error') {
                alert(res.message);
                return;
            }
            setProducts(products.filter((product) => product.id !== id));

        } catch (error) {
            console.log(error);
        }
    }

    const columns: ColumnDef[] = [
        {
            accessorKey: 'type',
            header: 'النوع',
            cell: ({ row }: { row: any }) => <div>{row.getValue('type')}</div>,
        },
        {
            accessorKey: 'quantity',
            header: 'الكمية',
            cell: ({ row }: { row: any }) => <div>{row.getValue('quantity')}</div>,
        },
        {
            accessorKey: 'totalAmount',
            header: 'المبلغ الإجمالي',
            cell: ({ row }: { row: any }) => <div>{row.getValue('totalAmount')} د.م</div>,
        },
    ];

    useEffect(() => {
        handelProducts();
    }, []);

    return (
        <div className=" 
        flex
        flex-col
         w-full
         
         overflow-hidden
         justify-start items-start
         ">
            <h3 className=' w-full text-lg text-primary'>
                المنتجات المباعة
            </h3>
            <DataTable
                total={total}
                columns={columns}
                data={products}
            />
        </div>
    );
};

export default SelledProducts;
