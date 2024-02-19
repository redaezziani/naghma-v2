'use client';

import React, { useEffect, useState } from 'react';
import { DataTable, ColumnDef } from '@/components/my-ui/data-table';
import { Cog, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getVendurs,deleteVendur } from '@/(db)/vendur';

const Vendors = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const handelProducts = async () => {
    try {
      const res = await getVendurs();
      setProducts(res.data);
      setTotal(res.total_price);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteVendur(id);
      if (res.status === 'error') {
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
      accessorKey: 'id',
      header: 'معرف',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'nom',
      header: 'اسم',
      cell: ({ row }) => <div>{row.getValue('nom')}</div>,
    },
    {
      accessorKey: 'le_prix_a_payer',
      header: 'المبلغ المطلوب',
      cell: ({ row }) => <div>{row.getValue('le_prix_a_payer')} د.م</div>,
    },
    {
      accessorKey: 'le_prix_a_paye',
    header: 'المبلغ المدفوع',
      cell: ({ row }) => <div>{row.getValue('quantity')} كجم </div>,
    },
    {
      accessorKey: 'frais_de_prix',
      header: 'المصاريف',
      cell: ({ row }) => <div>{row.getValue('frais_de_prix')} د.م</div>,
    },
    {
      accessorKey: 'balance',
      header: 'الأرباح',
      cell: ({ row }) => <div>{row.getValue('le_prix_a_payer') - row.getValue('le_prix_a_paye') + row.getValue('frais_de_prix')} د.م</div>,
    },
    {

      accessorKey: 'action',
      header: 'إجراء',
      cell: ({ row }) => <div className='flex justify-start items-center gap-4'>
          <Trash
            onClick={() => handleDelete(row.getValue('id'))}
            className='cursor-pointer text-muted-foreground hover:text-destructive hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out'
            size={16}

          />

        <Link href={`/dashboard/raw-product/update-product/${row.getValue('id')}`}>
          <Cog
            className='cursor-pointer  text-muted-foreground hover:text-secondary-foreground hover:scale-105 hover:rotate-180 transition-all duration-300 ease-in-out'
            size={16} />
        </Link>
      </div>
    },
  ];
  useEffect(() => {
    handelProducts();
    
  }, []);
  return (
    <div className=" mt-20
    flex
    flex-col
     justify-start items-start gap-7
     w-full
    lg:w-2/3
    px-6 py-3 relative">
       <Button >
            <Link href="/dashboard/vendor/add-vendor">إضافة بائع</Link>
        </Button >
      <DataTable
      total = {total}
      columns={columns} data={products} />
       
    </div>
  );
};

export default Vendors;
