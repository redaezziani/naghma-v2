'use client';
import { updateProduit } from '@/(db)/produit';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { toast } from 'sonner';


const AddfinalProduct = () => {

  return (
    <div
      className='flex flex-col gap-4 px-6 py-3  w-full justify-start items-start mt-20'
    >
      <h1
        className='text-2xl text-primary font-bold'
      >
      تحديث المنتج
      </h1>
      <p>
        يمكنك تحديث المنتج من هنا
      </p>
      <div
      className='flex w-full lg:w-1/2 gap-3 justify-start flex-col  items-start'
      >
        <Label>
          اسم المنتج
        </Label>
        <Input
          name='nom'
          onChange={handleChangeName}
          value={data.nom}
          placeholder='اسم المنتج'
        />
      </div>
      
      <div className="flex w-full lg:w-1/2 gap-3 justify-start flex-col  items-start ">
        <Label
          className=' font-semibold'
        >
          سعر المنتج
        </Label>
        <Input
          name='prix_vente'
          onChange={handleChangeName}
          type='number'
          value={data.prix_vente}
          placeholder='سعر المنتج'
        />
       </div>
      
      <Button
        className='bg-primary text-white'
        onClick={handleSubmit}
        isloading={isLoading}
        disabled={isLoading}
      >
     تحديث المنتج
      </Button>

    </div>
  )
}

export default AddfinalProduct