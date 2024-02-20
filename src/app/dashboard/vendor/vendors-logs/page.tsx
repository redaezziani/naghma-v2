"use client"
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createVendur } from '@/(db)/vendur';
import { toast } from 'sonner';
import { createVendur_log } from '@/(db)/vendur-log';
import { getAllProduits } from '@/(db)/produit';
import { getAllVendurs } from '@/(db)/vendur';

// the function createVendur_log is take 

/*

interface IVendur_log {
    vendur_id: string;
    produit_id: string;
    quantite: number;
    prix: number;
    prix_a_paye: number;
}
*/

interface IVendur {
    id: string;
    nom: string;
    le_prix_a_paye: number;
    le_prix_a_payer: number;
}

interface IProduit {
    id: string;
    nom: string;
    prix: number;
    quantite: number;
}
const VendorLogs = () => {
  const [listProduits, setListProduits] = React.useState<IProduit[]>([])
  const [listVendurs, setListVendurs] = React.useState<IVendur[]>([])
  const [vendurId, setVendurId] = React.useState('');
  const [produitId, setProduitId] = React.useState('');
  const [quantite, setQuantite] = React.useState(0);
  const [Loading, setLoading] = React.useState(false)

  const handelChangeVendurId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendurId(e.target.value)
  }

  const handelChangeProduitId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduitId(e.target.value)
  }

  const handelSubmit = async () => {
    try {
      setLoading(true)
      const data = {
        vendur_id: vendurId,
        produit_id: produitId,
        quantite
      }
      console.log(data);
      const res = await createVendur_log(data)
      if (res?.status === 'error') {
        toast.error(res.message)
        return
      }
      setVendurId('')
      setProduitId('')
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

  const handelGetVendurs = async () => {
    try {
      const res = await getAllVendurs();
      if (res?.status === 'error') {
        alert(res.message);
        return;
      }
      const vendurs: IVendur[] = res?.data?.map((item: { id: string; nom: string; }) => ({
        id: item.id,
        nom: item.nom,
        le_prix_a_paye: 0,
        le_prix_a_payer: 0
      })) ?? [];
      setListVendurs(vendurs);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handelGetProduits()
    handelGetVendurs()
    
  }
    , [])

  return (
    <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
      <h1 className='text-2xl text-primary font-bold'>تحديث  بيانات البائع</h1>
      <p>
        يمكنك من هنا تحديث   بيانات  البائع
      </p>
      
      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>رقم البائع</label>
        <select
          defaultValue={listVendurs[0]?.id}
          onChange={handelChangeVendurId} // Use onChange instead of onSelect
          className='bg-white'
          id="vendurID" // Unique ID for the select element
          name="vendurID">
          {listVendurs.map((vendur: any) => (
            <option key={vendur.id} value={vendur.id}>{vendur.nom}</option> // Ensure each option has a unique key
          ))}
        </select>


      </div>
      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>رقم المنتج</label>
        <select
          defaultValue={listProduits[0]?.id}
          onChange={handelChangeProduitId} // Use onChange instead of onSelect
          className='bg-white'
          id="produitID" // Unique ID for the select element
          name="produitID">
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

export default VendorLogs;
