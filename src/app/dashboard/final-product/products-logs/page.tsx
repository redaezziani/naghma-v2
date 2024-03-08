"use client"
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getAllProduits } from '@/(db)/produit';
import { createProduitLog } from '@/(db)/produtc-log';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';




interface IProduit {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
}

interface IProduitLog {
  produit_id: string;
  production: number;
}
const ProductLogs = () => {
  const [listProduits, setListProduits] = React.useState<IProduit[]>([])
  const [produitId, setProduitId] = React.useState('');
  const [quantite, setQuantite] = React.useState(0);
  const [Loading, setLoading] = React.useState(false)


  const handelChangeProduitId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduitId(e.target.value)
  }

  const handelSubmit = async () => {
    try {
      setLoading(true)
      const data = {
        produit_id: produitId,
        production: quantite
      }
      const res = await createProduitLog(data);
      if (res?.status === 'error') {
        //@ts-ignore
        toast.error(res.message);
        return;
      }
      setProduitId(listProduits[0]?.id)

      setQuantite(0)

      toast.success('تم إضافة البائع بنجاح')
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  }
  // lets use the promise.all
  const handelGetProduits = async () => {
    try {
      const res = await getAllProduits();
      if (res?.status === 'error') {
        //@ts-ignore
        alert(res.message);
        return;
      }
      const produits: IProduit[] = res?.data?.map((item: { id: string; nom: string; }) => ({
        id: item.id,
        nom: item.nom,
        prix: 0,
        quantite: 0
      })) ?? [];
      setListProduits(produits);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    handelGetProduits()

  }
    , [])

  return (
    <div className="w-full py-6 px-3">
      <Card className='flex  shadow-none rounded-none flex-col gap-4  px-3   py-3 w-full justify-start items-start mt-20'>
        <h1 className='text-2xl text-primary font-bold'>
          تحديث كمية المنتج
        </h1>
        <p
          className=' text-sm text-slate-500'
        >
          يمكنك عبر هده الصفحة تحديد كمية المنتج عبر اختيار اسمه
        </p>



        <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
          <label className='font-semibold'>رقم المنتج</label>
          <Select
            onValueChange={(value) => setProduitId(value)}
            defaultValue={listProduits[0]?.id}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر المنتج" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  اختر المنتج
                </SelectLabel>
                {
                  listProduits ?
                    listProduits.map((item, i) => (
                      <SelectItem key={i} value={item.id}>
                        {item.nom}
                      </SelectItem>
                    ))

                    : <span>
                      لا يوجد منتجات
                    </span>
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
          <label className='font-semibold'>الكمية</label>
          <Input

            name='quantite'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantite(Number(e.target.value))}
            type='number'
            value={quantite}
            placeholder='الكمية'
          />
        </div>
        <Button className='bg-primary text-white' onClick={handelSubmit} isloading={Loading}>
          نحديث البيانات

        </Button>
      </Card>
    </div>
  );
};

export default ProductLogs;
