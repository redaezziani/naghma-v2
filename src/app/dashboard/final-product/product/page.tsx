'use client';
import { createProduct } from '@/(db)/product-pr';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { toast } from 'sonner';

const AddfinalProduct = () => {
  const [data , setData] = React.useState({
    name: '',
    price: 0,
    quantity: 0
  })
  const [isLoading , setIsLoading] = React.useState(false)
  const handleChangeName = (e)=>{
    // lets check if the type is number insert it as number
    if(e.target.type === 'number'){
      setData({...data, [e.target.name]: Number(e.target.value)})
      return
    }
    setData({...data, [e.target.name]: e.target.value})  
  }
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault()
      setIsLoading(true)
      if (data.name === '' || data.price === 0 || data.quantity === 0) {
        return
      }
      
      const res= await createProduct(data)
      if (res.status === 'error') {
        alert(res.message)
        return
      }
      setData({
        name: '',
        price: 0,
        quantity: 0
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
        إضافة منتج جديد
      </h1>
      <p>
      هذه الصفحة مخصصة لإضافة المنتج النهائي
      </p>
      <div className="flex w-full lg:w-1/2 gap-3 justify-start flex-col  items-start ">
        <Label
          className=' font-semibold'
        >
          اسم المنتج
        </Label>
        <Input
          name='name'
          onChange={handleChangeName}
          type='text'
          value={data.name}
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
          name='price'
          onChange={handleChangeName}
          type='number'
          value={data.price}
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
          name='quantity'
          onChange={handleChangeName}
          type='number'
          value={data.quantity}
          placeholder='كمية المنتج'
        />
       </div>
      <Button
        className='bg-primary text-white'
        onClick={handleSubmit}
        isloading={isLoading}
        disabled={isLoading}
      >
        إضافة المنتج
      </Button>

    </div>
  )
}

export default AddfinalProduct