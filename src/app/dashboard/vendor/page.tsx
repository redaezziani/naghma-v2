'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/my-ui/data-table';
import { Cog, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getVendurs, deleteVendur } from '@/(db)/vendur';
import { useRouter } from 'next/navigation';


export interface ColumnDef {
  accessorKey: string;
  header: string;
  cell: ({ row }: { row: any }) => JSX.Element;
}

interface IVendur {
  id: string;
  nom: string;
  le_prix_a_paye: number;
  le_prix_a_payer: number;
  frais_de_prix: number;
  balance: number;
}

const Vendors = () => {
  const [products, setProducts] = useState<IVendur[]>([]);
  const [total, setTotal] = useState(0);
  const handelProducts = async () => {
    try {
      const res = await getVendurs();
      if (res?.status === 'error') {
        setProducts([]);
        return;
      }
      setProducts(res.data);
        console.log(res);
        setTotal(res.total_price);
        console.log(res);
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
      accessorKey: 'id',
      header: 'معرف',
      cell: ({ row }: { row: any }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'nom',
      header: 'اسم',
      cell: ({ row }: { row: any }) => <div>{row.getValue('nom')}</div>,
    },
    {
      accessorKey: 'le_prix_a_paye',
      header: 'المبلغ المطلوب',
      cell: ({ row }: { row: any }) => <div>{row.getValue('le_prix_a_paye')} د.م</div>,
    },
    {
      accessorKey: 'le_prix_a_payer',
      header: 'المبلغ المدفوع',
      cell: ({ row }: { row: any }) => <div>{row.getValue('le_prix_a_payer')} د.م </div>,
    },
    {
      accessorKey: 'frais_de_prix',
      header: 'المصاريف',
      cell: ({ row }: { row: any }) => <div>{row.getValue('frais_de_prix')} د.م</div>,
    },
    {
      accessorKey: 'balance',
      header: 'الأرباح',
      cell: ({ row }: { row: any }) => <div className={row.getValue('le_prix_a_payer') - row.getValue('le_prix_a_paye') + row.getValue('frais_de_prix') > 0 ? ' text-emerald-600 font-semibold' : 'text-destructive font-semibold'}>{row.getValue('le_prix_a_payer') - row.getValue('le_prix_a_paye') + row.getValue('frais_de_prix')} د.م</div>,
    },
    {
      accessorKey: 'action',
      header: 'إجراء',
      cell: ({ row }: { row: any }) => <div className='flex justify-start items-center gap-4'>
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
       <div className='flex gap-3 flex-wrap'>
       <Button >
            <Link href="/dashboard/vendor/add-vendor">إضافة بائع</Link>
        </Button >
        <Button >
            <Link href="/dashboard/vendor/vendors-logs">
                بيع المنتج للبائع
           
            </Link>
        </Button >
        <Button >
            <Link href="/dashboard/vendor/payment">
               دفع مستحقات البائع
           
            </Link>
        </Button >
        <Button >
            <Link href="/dashboard/vendor/retourn">
               المنتجات التي ارجعت
           
            </Link>
        </Button >
       
       </div>
      <DataTable
      total = {total}
      columns={columns} data={products} />
       
    </div>
  );
};

export default Vendors;
