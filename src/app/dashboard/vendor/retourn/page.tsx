"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Label } from "@/components/ui/label"
import { paid_by_return } from '@/(db)/payment';
import { getAllVendurs } from '@/(db)/vendur';
import { getSellsByVendur } from '@/(db)/sell-produit';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
interface return_fra {
    vendur_id: string,
    produit_id: string,
    quantite_attendue_retourner: number,
    quantite_reel_retourner: number
}
const Payment = () => {
    const [vendurs, setVendurs] = React.useState([]) as any[];
    const [vendurId, setVendurId] = React.useState('');
    const [products, setProducts] = React.useState([]) as any[];
    const [productId, setProductId] = React.useState('');
    const [isloading, setIsLoading] = React.useState(false)
    const [quantite_attendue_retourner, setQuantite_attendue_retourner] = React.useState('0');
    const [quantite_reel_retourner, setQuantite_reel_retourner] = React.useState('0');

    const handelChangeVendurId = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVendurId(e.target.value)
        await allProducts(e.target.value)
    }
    const handelChangeProductId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductId(e.target.value)
    }

    const allVendurs = async () => {
        try {
            const res = await getAllVendurs()
            if (res?.status === 'error') {
                return
            }
            setVendurs(res?.data)
            
        } catch (error) {
            console.error(error)
        }
    }

    const allProducts = async (vendurId: string = '') => {
        try {
            const res = await getSellsByVendur(vendurId)
            if (res?.status === 'error') {
                return
            }
            console.log(res)
            setProducts(res?.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handelSubmit = async () => {
        try {
            if (vendurId === '' || productId === '' || quantite_attendue_retourner === '' || quantite_reel_retourner === '') {
                toast.error('الرجاء ملء جميع الحقول')
                return
            }

            const data: return_fra = {
                vendur_id: vendurId,
                produit_id: productId,
                quantite_attendue_retourner: Number(quantite_attendue_retourner),
                quantite_reel_retourner: Number(quantite_reel_retourner)
            }
            setIsLoading(true)

            const res = await paid_by_return(data)
            if (res?.status === 'error') {
                toast.error(res.message)
                return
            }
            toast.success(res?.message)


        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        allVendurs()
    }, [])

    return (
        <div className="flex w-full px-3 mt-12">
      <Card className='flex shadow-none rounded-none flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
            <h1 className='text-2xl text-primary font-bold'>
                تحديث المنتجات المرجعة
                </h1>
            <p className=' text-sm text-slate-500'>               
            في هده الصفحة يمكنك اضافة المتجات المرجعة من طرف البائع عبر اضافة الكمية المتوقعة للارجاع و الكمية الحقيقية بعد الوزن
            </p>

            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'> 
                اسم البائع
                </label>
                <select
                    onChange={handelChangeVendurId} 
                    className='w-1/2 p-2 rounded-md border bg-white text-primary focus:outline-none focus:border-primary'
                    id="vendurID" 
                    name="vendurID">
                        <option disabled value="" selected>
                            اختر البائع
                        </option>
                    {vendurs.map((vendur: any) => (
                        <option key={vendur.id} value={vendur.id}>
                            {vendur.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>رقم المنتج</label>
                {products.length > 0 ? (
                    <select
                    onChange={handelChangeProductId} 
                    className='w-1/2 p-2 rounded-md border bg-white text-primary focus:outline-none focus:border-primary'
                    id="productID" 
                    name="productID">
                        <option disabled value="" selected >
                            اختر المنتج
                        </option>
                    {products.map((product: any) => (
                        <option key={product.produit.id} value={product.produit.id}>
                            {product.produit.nom}
                        </option>
                    ))}
                </select>
                ) : (
                    <select
                    className='w-1/2 p-2 rounded-md border bg-white text-primary focus:outline-none focus:border-primary'
                    id="productID"
                    name="productID"

                    disabled>
                        <option disabled value="" selected   >
                            اختر المنتج
                            </option>
                            </select>
                            )
                            }
            </div>

            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <Label>
                    الكمية المتوقعة للإرجاع
                </Label>
                <Input
                    type='number'
                    onChange={(e) => setQuantite_attendue_retourner(e.target.value)}
                    value={quantite_attendue_retourner}
                    placeholder='الكمية المتوقعة للإرجاع'
                />
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <Label>
                    الكمية الفعلية للإرجاع
                </Label>
                <Input
                    type='number'
                    onChange={(e) => setQuantite_reel_retourner(e.target.value)}
                    value={quantite_reel_retourner}
                    placeholder='الكمية الفعلية للإرجاع'
                />
            </div>
            <Button
                isloading={isloading}
                disabled={isloading}
                className='bg-primary text-white' onClick={handelSubmit}>
                نحديث البيانات
            </Button>
         </Card>
        </div>

    );
};

export default Payment;
