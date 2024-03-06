"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createVendur_log } from '@/(db)/vendur-log';
import { getAllProduits } from '@/(db)/produit';
import { getAllVendurs } from '@/(db)/vendur';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface IVendur {
  id: string;
  nom: string;
  le_prix_a_paye: number;
  le_prix_a_payer: number;
}

interface IProduit {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
}
const VendorLogs = () => {
  const [listProduits, setListProduits] = useState<IProduit[]>([])
  const [listVendurs, setListVendurs] = useState<IVendur[]>([])
  const [vendurId, setVendurId] = useState('');
  const [produitId, setProduitId] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [Loading, setLoading] = useState(false)

  const handelChangeVendurId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendurId(e.target.value)
  }

  const handelChangeProduitId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduitId(e.target.value)
  }

  const handelSubmit = async () => {
    try {
      setLoading(true)
      const data = {
        vendur_id: vendurId,
        produit_id: produitId,
        quantite
      }
      //@ts-ignore
      const res = await createVendur_log(data)
      if (res?.status === 'error') {
        toast.error(res.message)
        return
      }

      setQuantite(0)

      toast.success('تمت العملية بنجاح')
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  }
  const handelGetProduits = async () => {
    try {
      const res = await getAllProduits();
      if (res?.status === 'error') {
        //@ts-ignore
        toast.error(res.message)
        return;
      }
      const produits: IProduit[] = res?.data?.map((item: { id: string; nom: string; }) => ({
        id: item.id,
        nom: item.nom,
        prix: 0,
        quantite: 0
      })) ?? [];
      setListProduits(produits);
    } catch (error) {
      console.log(error);
    }
  }

  const handelGetVendurs = async () => {
    try {
      const res = await getAllVendurs();
      if (res?.status === 'error') {
        toast.error(res.message)
        return;
      }
      const vendurs: IVendur[] = res?.data?.map((item: { id: string; nom: string; }) => ({
        id: item.id,
        nom: item.nom,
        le_prix_a_paye: 0,
        le_prix_a_payer: 0
      })) ?? [];
      setListVendurs(vendurs);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handelGetProduits()
    handelGetVendurs()
    
  }
    , [])
  return (
    <div className="flex w-full px-3 mt-12">
      <Card className='flex shadow-none rounded-none flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
        <h1 className='text-2xl text-primary font-bold'>
          بيع المنتجات للبائع
        </h1>
        <p className=' text-sm text-slate-500'>
          يمكنك من هنا اضافة المنتجات التي اشتراها البائع بإضافة الكمية المشتراة من المنتج المختار
        </p>
        <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
          <label className='font-semibold'>اسم البائع</label>
          <Select
          onValueChange={(value) => setVendurId(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر البائع" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                اختر البائع
                </SelectLabel>
                {listVendurs.map((vendur: any) => (
                  <SelectItem key={vendur.id} value={vendur.id}>{vendur.nom}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
          <label className='font-semibold'>رقم المنتج</label>
          <Select
          onValueChange={(value) => setProduitId(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر المنتج" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                اختر المنتج
                </SelectLabel>
                {listProduits?.map((produit: any) => (
                  <SelectItem key={produit.id} value={produit.id}>{produit.nom}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <Button className='bg-primary text-white' onClick={handelSubmit} isloading={Loading}>
          نحديث البيانات

        </Button>
      </Card>
    </div>
  );
};

export default VendorLogs;
