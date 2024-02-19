"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddVendorPage = () => {
  const [name, setName] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle the submission here
  };

  return (
    <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
      <h1 className='text-2xl text-primary font-bold'>إضافة بائع جديد</h1>
      <p>هذه هي صفحة إضافة بائع جديد</p>
      <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
        <label className='font-semibold'>اسم البائع</label>
        <Input
          name='name'
          onChange={handleChangeName}
          type='text'
          value={name}
          placeholder='اسم البائع'
        />
      </div>
      <Button className='bg-primary text-white' onClick={handleSubmit}>
        إضافة البائع
      </Button>
    </div>
  );
};

export default AddVendorPage;
