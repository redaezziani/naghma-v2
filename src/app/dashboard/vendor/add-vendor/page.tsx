"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { createVendur } from '@/(db)/vendur';
import { toast } from 'sonner';


const AddVendorPage = () => {
  const [name , setName] = React.useState('')
  const [Loading , setLoading] = React.useState(false)
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
  }
  
  const handelSubmit = async () => {
      try {
          setLoading(true)
          const res = await createVendur(name);
          if (res?.status === 'error') {
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
      <p 
      className='text-sm text-slate-500'>هذه هي صفحة إضافة بائع جديد</p>
      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>اسم البائع</label>
        <Input
          name='name'
          onChange={handelChange}
          type='text'
          value={name}
          placeholder='اسم البائع'
        />
      </div>
      <Button className='bg-primary text-white' onClick={handelSubmit} isloading={Loading}>
        إضافة البائع
      </Button>
    </div>
  );
};

export default AddVendorPage;
