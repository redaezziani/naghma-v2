'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import React, { useEffect } from 'react'
import { getProduits, updateProduit } from "@/(db)/produit"

interface IUpdateProduit {
    prix_vente: number;
    nom: string;
    quantite: number;
}
const UpdateProduct = () => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [products, setProducts] = React.useState<any[]>([]);
  const [id, setId] = React.useState('');
  const [data, setData] = React.useState<IUpdateProduit>({
    prix_vente: 0,
    nom: '',
    quantite: 0
  });
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
const handleSubmit = async () => {
    setIsLoading(true);
    try {
        const response = await updateProduit(id, data);
        if (response?.status === 'success') {
            toast({
                title: "عملية ناجحة!",
                description: response?.message ?? 'تمت العملية بنجاح.',
            })
        } else {
            toast({
                variant: 'destructive',
                title: "عملية فاشلة!",
                description: response?.message ?? 'حدثت مشكلة أثناء العملية.',
            })
        }
    } catch (error) {
        console.log(error);
        toast({
            variant: 'destructive',
            title: "عملية فاشلة!",
            description: 'حدثت مشكلة أثناء العملية.',
        })
    } finally {
        setIsLoading(false);
        setOpen(false);
    }
}

  const handelProducts = async () => {
    try {
      const res = await getProduits();
      setProducts(res?.data??[]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handelProducts();
  }
  , []);
    
  return (
    <Sheet
    open={open}
    onOpenChange={() => setOpen(!open)}
    >
    <SheetTrigger asChild>
    <Button
      variant={'outline'}
      >
          تحديث كمية المنتج
      </Button>
    </SheetTrigger>
    <SheetContent
    className="w-full"
    >
    <div
      className='flex flex-col gap-4  py-3  w-full justify-start items-start mt-10'
    >
      <h1
        className='text-2xl text-primary font-bold'
      >
      تحديث المنتج
      </h1>
      <p
      className=' text-sm text-slate-500'
      >
      هده الصفحة تمكنك من تحديت اسم المنتج و كدا سعره
      </p>
      <div className='flex w-full  gap-3 justify-start flex-col items-start'>
          <label className='font-semibold'>اسم البائع</label>
          <Select
          onValueChange={(value) => setId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر البائع" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                اختر المنتج
                </SelectLabel>
                {products.map((product: any) => (
                  <SelectItem key={product.id} value={product.id}>{product.nom}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      <div
      className='flex w-full  gap-3 justify-start flex-col  items-start'
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
      
      <div className="flex w-full  gap-3 justify-start flex-col  items-start ">
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
        <div
        className='flex w-full  gap-3 justify-start flex-col  items-start'
        >
          <Label
            className=' font-semibold'
          >
            الكمية
          </Label>
          <Input
            name='quantite'
            onChange={handleChangeName}
            type='number'
            value={data.quantite}
            placeholder='الكمية'
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
    </SheetContent>
  </Sheet>
  )
}

export default UpdateProduct