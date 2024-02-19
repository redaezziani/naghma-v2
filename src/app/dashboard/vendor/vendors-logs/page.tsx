"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { createVendur } from '@/(db)/vendur';
import { toast } from 'sonner';


const VendorLogs = () => {
  const [name, setName] = React.useState('')
  const [vendurId, setVendurId] = React.useState('');
  const [produitId, setProduitId] = React.useState('');
  const [quantite, setQuantite] = React.useState(0);
  const [prix, setPrix] = React.useState(0);
  const [prixAPaye, setPrixAPaye] = React.useState(0);
  const [Loading, setLoading] = React.useState(false)

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value)
  }

  const handelSubmit = async () => {
    try {
      setLoading(true)
      const res = await createVendur(name);
      if (res.status === 'error') {
        alert(res.message);
        return;
      }
      setLoading(false)
      setName('')
      toast.success('تم إضافة البائع بنجاح')
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
      <h1 className='text-2xl text-primary font-bold'>إضافة بائع جديد</h1>
      <p>هذه هي صفحة إضافة بائع جديد</p>

      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>رقم البائع</label>
        <select className='bg-white' id="vedorID" name="vedorID">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

      </div>
      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>رقم المنتج</label>
        <select className='bg-white' id="vedorID" name="vedorID">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
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
