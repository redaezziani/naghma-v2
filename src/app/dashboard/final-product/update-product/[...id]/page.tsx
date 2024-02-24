'use client';
import { updateProduit } from '@/(db)/produit';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { toast } from 'sonner';

interface IUpdateProduit {
  prix_vente: number;
  nom: string;
}

const UpdateProduit = ({...props} : any) => {
  const id = props.params.id[0] as string;
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<IUpdateProduit>({
    prix_vente: 0,
    nom: ''
  });
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await updateProduit(id,data);
    if (response?.status === 'success') {
      toast.success(response.message);
    } else {
      toast.error(response?.message);
    }
    setIsLoading(false);
  }


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

export default UpdateProduit