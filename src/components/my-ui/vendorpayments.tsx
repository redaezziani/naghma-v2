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
    price: number;
}

const VendorPayments = () => {
    const [products, setProducts] = useState<IVendur[]>([]);
    const [total, setTotal] = useState(0);

    const handleProducts = async () => {
        try {
            const res = await getVendurs();
            if (res?.status === 'error') {
                setProducts([]);
                return;
            }
            // @ts-ignore
            setProducts(res?.data ?? []);
            console.log(res);
            setTotal(res?.total_price ?? 0);
        } catch (error) {
            console.log(error);
        }
    };

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
    };

    const columns: ColumnDef[] = [
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

    useEffect(() => {
        handleProducts();
    }, []);

    return (
        <div className="flex flex-col w-full overflow-hidden justify-start items-start">
             <h3 className=' w-full text-lg text-primary'>
                المدفوعات 
            </h3>
            <DataTable total={total} columns={columns} data={products} />
        </div>
    );
};

export default VendorPayments;
