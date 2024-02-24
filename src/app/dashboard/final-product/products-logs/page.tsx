"use client"
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createVendur } from '@/(db)/vendur';
import { toast } from 'sonner';
import { createVendur_log } from '@/(db)/vendur-log';
import { getAllProduits } from '@/(db)/produit';
import { getAllVendurs } from '@/(db)/vendur';




interface IProduit {
    id: string;
    nom: string;
    prix: number;
    quantite: number;
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
        quantite
      }

    
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
    <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
      <h1 className='text-2xl text-primary font-bold'>
       تحديث كمية المنتج 
      </h1>
      <p>
        يمكنك تحديث كمية المنتج من هنا
      </p>
      
      

      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>رقم المنتج</label>
        <select
          defaultValue={listProduits[0]?.id}
          onChange={handelChangeProduitId} // Use onChange instead of onSelect
          className='w-1/2 p-2 cursor-pointer rounded-md border bg-white text-primary focus:outline-none focus:border-primary'
          id="produitID" // Unique ID for the select element
          name="produitID">
            <option disabled value="" selected>
              اختر المنتج
            </option>
          {listProduits.map((produit: any) => (
            <option key={produit.id} value={produit.id}>{produit.nom}</option> // Ensure each option has a unique key
          ))}
        </select>
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
    </div>
  );
};

export default ProductLogs;
