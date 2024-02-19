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

const VendorLogs = () => {
  const [listProduits, setListProduits] = React.useState([])
  const [listVendurs, setListVendurs] = React.useState([])
  const [vendurId, setVendurId] = React.useState('');
  const [produitId, setProduitId] = React.useState('');
  const [quantite, setQuantite] = React.useState(0);
  const [prix, setPrix] = React.useState(0);
  const [prixAPaye, setPrixAPaye] = React.useState(0);
  const [Loading, setLoading] = React.useState(false)

  const handelChangeVendurId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendurId(e.target.value)
  }

  const handelChangeProduitId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduitId(e.target.value)
  }

  const handelChangeQuantite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantite(Number(e.target.value))
  }

  const handelChangePrix = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrix(Number(e.target.value))
  }

  const handelChangePrixAPaye = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrixAPaye(Number(e.target.value))
  }

  const handelSubmit = async () => {
    try {
      setLoading(true)
      const data = {
        vendur_id: vendurId,
        produit_id: produitId,
        quantite,
        prix,
        prix_a_paye: prixAPaye
      }
      console.log(data);
      const res = await createVendur_log(data)
      if (res.status === 'error') {
        toast.error(res.message)
        return
      }
      setVendurId('')
      setProduitId('')
      setQuantite(0)
      setPrix(0)
      setPrixAPaye(0)

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
      if (res.status === 'error') {
        alert(res.message);
        return;
      }
      setListProduits(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handelGetVendurs = async () => {
    try {
      const res = await getAllVendurs();
      if (res.status === 'error') {
        alert(res.message);
        return;
      }
      setListVendurs(res.data)
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
      <h1 className='text-2xl text-primary font-bold'>إضافة بائع جديد</h1>
      <p>هذه هي صفحة إضافة بائع جديد</p>

      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>رقم البائع</label>
        <select
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
      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>السعر</label>
        <Input
          name='prix'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrix(Number(e.target.value))}
          type='number'
          value={prix}
          placeholder='السعر'
        />
      </div>
      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>السعر المدفوع</label>
        <Input
          name='prixAPaye'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrixAPaye(Number(e.target.value))}
          type='number'
          value={prixAPaye}
          placeholder='السعر المدفوع'
        />
      </div>
      <Button className='bg-primary text-white' onClick={handelSubmit} isloading={Loading}>
        إضافة البائع
      </Button>
    </div>
  );
};

export default VendorLogs;
