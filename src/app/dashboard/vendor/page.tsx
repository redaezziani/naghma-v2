'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/my-ui/data-table';
import { Plus, UserRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getVendurs} from '@/(db)/vendur';
import { toast } from 'sonner';
import CreateVendur from '@/components/my-ui/forms/create-vendur';
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
        toast.error(res?.message);
      }
      setProducts(res?.data ?? []);
      setTotal(res?.total_price ?? 0);
    } catch (error) {
      console.log(error);
    }
  }
  const links = [
    {
      name: 'سجلات الموزعين',
      path: '/dashboard/vendor'
    },
    {
      name: 'سجلات المبيعات',
      path: '/dashboard/vendor/vendors-logs'
    },
    {
      name: 'سجلات الارجاع',
      path: '/dashboard/vendor/retourn'
    },
    {
      name: 'المصاريف',
      path: '/dashboard/vendor/expenses'
    }    
  ]
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
      cell: ({ row }: { row: any }) => <div className={row.getValue('le_prix_a_payer') - row.getValue('le_prix_a_paye') + row.getValue('frais_de_prix') === 0 ? ' text-emerald-600 font-semibold' : 'text-destructive/80 font-semibold'}>
          {Math.abs(row.getValue('le_prix_a_payer') - row.getValue('le_prix_a_paye') + row.getValue('frais_de_prix'))} د.م
      </div>,
    },
    {
      accessorKey: 'action',
      header: 'إجراء',
      cell: ({ row }: { row: any }) => <div className='flex justify-start items-center gap-4'>
        <Link href={`/dashboard/vendor/${row.getValue('id')}`}>
          <UserRound
            className='cursor-pointer  text-muted-foreground hover:font-bold hover:text-primary transition-all duration-300 ease-in-out'
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
    px-6 py-3 relative">
      <div className='flex gap-3 flex-wrap mt-7 bg-white py-8 w-full px-2'>
        <CreateVendur />
        {
          links.map((link, index) => (
            <Button
            variant={'outline'}
            >
              <Link href={link.path}>
                {link.name}
              </Link>
            </Button >
          ))
        }
      </div>
      <DataTable
        total={total}
        columns={columns}
        data={products} />
    </div>
  );
};

export default Vendors;
