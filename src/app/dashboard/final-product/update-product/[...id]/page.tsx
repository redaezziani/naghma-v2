'use client';
import { createProduit } from '@/(db)/produit';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { toast } from 'sonner';
interface IProduit {
    nom: string;
    prix_vente: number;
    quantite: number;
}

const AddfinalProduct = () => {
  const [data , setData] = React.useState<IProduit>({
    nom: '',
    prix_vente: 0,
    quantite: 0
  })
  const [isLoading , setIsLoading] = React.useState(false)
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>)=>{
    // lets check if the type is number insert it as number
    if(e.target.type === 'number'){
      setData({...data, [e.target.name]: Number(e.target.value)})
      return
    }
    setData({...data, [e.target.name]: e.target.value})  
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    try {
      e.preventDefault()
      setIsLoading(true)
      if (data.nom === '' || data.prix_vente === 0 || data.quantite === 0) {
        return
      }
      
      const res= await createProduit(data)
      if (res?.status === 'error') {
        alert(res.message)
        return
      }
      setData({
        nom: '',
        prix_vente: 0,
        quantite: 0
      })
      toast.success('تم إضافة المنتج بنجاح')

    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }

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
      <div className="flex w-full lg:w-1/2 gap-3 justify-start flex-col  items-start ">
        <Label
          className=' font-semibold'
        >
          اسم المنتج
        </Label>
        <Input
          name='nom'
          onChange={handleChangeName}
          type='text'
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
      <div className="flex w-full lg:w-1/2 gap-3 justify-start flex-col  items-start ">
        <Label
          className=' font-semibold'
        >
          كمية المنتج
        </Label>
        <Input
          name='quantite'
          onChange={handleChangeName}
          type='number'
          value={data.quantite}
          placeholder='كمية المنتج'
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