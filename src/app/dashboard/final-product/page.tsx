'use client';

import React, { useEffect, useState } from 'react';
import { DataTable, ColumnDef, DataItem } from '@/components/my-ui/data-table';
import { Cog, Trash } from 'lucide-react';
import Link from 'next/link';
import { getProduits,deleteProduit, updateProduit } from '@/(db)/produit';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const UpdateProduit = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const createProduit = async (name: string, quantity: number, vendurId: number) => {
    try {
      const res = await createProduit(name, quantity, vendurId);
      if ((res as any)?.status === 'error') {
       toast.error((res as any)?.message);
        return;
      }
      handelProducts();
    } catch (error) {
      console.log(error);
    }
  }



  const handelProducts = async () => {
    try {
      const res = await getProduits();
      setProducts(res?.data??[]);
      setTotal(res?.total_price??0);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduit(id);
      if (res?.status === 'error') {
        toast.error(res.message);
        return;
      }
      setProducts(products.filter((product) => product.id !== id));

    } catch (error) {
      console.log(error);
    }
  }

  const columns: ColumnDef<any>[] = [
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
      accessorKey: 'prix_vente',
      header: 'السعر (د.م)',
      cell: ({ row }: { row: any }) => <div>{row.getValue('prix_vente')} د.م</div>,
    },
    {
      accessorKey: 'quantite',
      header: 'الكمية',
      cell: ({ row }: { row: any }) => <div>{row.getValue('quantite')} كجم </div>,
    },
    {
      accessorKey: 'total',
      header: 'المجموع',
      cell: ({ row }: { row: any }) => <div>{row.getValue('quantite') * row.getValue('prix_vente')} د.م</div>,
    },
    {

      accessorKey: 'action',
      header: 'إجراء',
      cell: ({ row }: { row: any }) => <div className='flex justify-start items-center gap-4'>
          <Trash
            onClick={() => handleDelete(row.getValue('id'))}
            className='cursor-pointer text-muted-foreground hover:text-secondary-foreground hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out'
            size={16}

          />

        <Link href={`/dashboard/final-product/update-product/${row.getValue('id')}`}>
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
     <div className='flex gap-4 justify-start items-center'>
     <Button>
        <Link href='/dashboard/final-product/add-final-product'>إضافة منتج</Link>
      </Button>
      <Button>
        <Link href='/dashboard/final-product/products-logs'>
          تحديث كمية المنتج
        </Link>
      </Button>
     </div>
      <DataTable
      total={total}
      columns={columns as ColumnDef<DataItem>[]}
      data={products} />
       
    </div>
  );
};

export default UpdateProduit;
