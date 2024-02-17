'use client';
import { updateProduct, getProduct } from '@/(db)/product-pr';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const UpdateProductPage = ({...props}) => {
  const {params} = props
  const [data , setData] = React.useState({
    name: '',
    price: 0,
    quantity: 0
  })
  const [product , setProduct] = React.useState({})
  const handelProduct = async ()=>{
    const res = await getProduct(params.id[0])
    if (res.status === 'error') {
      alert(res.message)
      return
    }
    setProduct(res.data)
  }
  const [isLoading , setIsLoading] = React.useState(false)
  const handelChangeName = (e)=>{
    // lets check if the type is number insert it as number
    if(e.target.type === 'number'){
      setData({...data, [e.target.name]: Number(e.target.value)})
      return
    }
    setData({...data, [e.target.name]: e.target.value})  
  }
  const id= params.id[0]
  const handelSubmit = async (e)=>{
    try {
      e.preventDefault()
      setIsLoading(true)
      if (data.name === '' || data.price === 0 || data.quantity === 0) {
        return
      }
      const send ={
        id,
        ...data
      }
      const res= await updateProduct(send)
      if (res.status === 'error') {
        alert(res.message)
        return
      }
      alert(res.message)
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }

  }

  React.useEffect(()=>{
    handelProduct()
  },[])
  return (
    <div
      className='flex flex-col gap-4  w-full justify-start items-start'
    >
      <h1
        className='text-2xl text-primary font-bold'
      >
        تحديث المنتج {product.name}
      </h1>
      <p>
        هذه هي صفحة تحديث المنتج
      </p>
      <div className="flex w-full lg:w-1/2 gap-3 justify-start flex-col  items-start ">
        <Label
          className=' font-semibold'
        >
          اسم المنتج
        </Label>
        <Input
          name='name'
          onChange={handelChangeName}
          type='text'
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
          onChange={handelChangeName}
          type='number'
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
          onChange={handelChangeName}
          type='number'
          placeholder='كمية المنتج'
        />
       </div>
      <Button
        className='bg-primary text-white'
        onClick={handelSubmit}
        isloading={isLoading}
        disabled={isLoading}
      >
        تحديث المنتج
      </Button>

    </div>
  )
}

export default UpdateProductPage