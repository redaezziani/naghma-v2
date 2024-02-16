'use client';

import { Button } from "@/components/ui/button";
import { createProduct, getProducts } from "@/(db)/product-pr";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Mode } from "@/components/ui/them-mode";
const Home = () => {
  const [product, setProduct] = useState({ name: "", price: 0, quantity: 0 });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: name === 'price' || name === 'quantity' ? Number(value) : value });
  }
  
  const create = async (e:any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      };
      console.log(data);
      const res = await createProduct(product);
      console.log(res);
    } catch (error) {
      console.log(error); 
    }
    finally {
      setLoading(false);
    }

  };

  return (
    <main className="flex min-h-screen flex-col items-center relative justify-center p-24">
      <div className="top-4 fixed right-4">
      <Mode />
      </div>
      <form
        className=" flex flex-col gap-3 justify-start items-start  w-[29rem] "
        action="">
        <h3
          className="text-2xl font-bold"
        >
          إنشاء منتج
        </h3>
        <div className="flex flex-col gap-3 w-full justify-start items-start">
          <Label htmlFor="name">الاسم</Label>
          <Input
            name="name"
            type="text"
            placeholder="اسم المنتج ..."
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3 w-full justify-start items-start">
          <Label htmlFor="price">السعر</Label>
          <Input
            name="price"
            type="number"
            placeholder="سعر المنتج ..."
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3 w-full justify-start items-start">
          <Label htmlFor="quantity">الكمية</Label>
          <Input
            name="quantity"
            type="number"
            placeholder="كمية المنتج ..."
            onChange={handleChange}
          />
        </div>
          <Button
            isloading={loading}
            className="w-full"
            onClick={create}
          >
            إنشاء المنتج
          </Button>
      </form>
    </main>
  );
}

export default Home;
