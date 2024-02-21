"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { paid_by_return } from '@/(db)/payment';
import { getAllVendurs } from '@/(db)/vendur';
import { getAllProduits } from '@/(db)/produit';
import { toast } from 'sonner';
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
    const [quantite_attendue_retourner, setQuantite_attendue_retourner] = React.useState('0');
    const [quantite_reel_retourner, setQuantite_reel_retourner] = React.useState('0');
    
    const handelChangeVendurId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVendurId(e.target.value)
    }
    const handelChangeProductId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductId(e.target.value)
    }

    const allVendurs= async () => {
        try {
            const res= await getAllVendurs()
            if (res?.status === 'error') {
                return
            }
            setVendurs(res?.data)

        } catch (error) {
            console.error(error)
        }
    }

    const allProducts = async () => {
        try {
            const res = await getAllProduits()
            if (res?.status === 'error') {
                return
            }
            setVendurs(res?.data)
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

            const res = await paid_by_return(data)
            if (res?.status === 'error') {
                toast.error(res.message)
                return
            }
            toast.success(res.message)

            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        allVendurs()
        allProducts()
    }, [])

    return (
        <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
            <h1 className='text-2xl text-primary font-bold'>
                تحديث طريقة الدفع للبائع
                </h1>
            <p>
                هذه هي صفحة تحديث طريقة الدفع للبائع
            </p>

            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>رقم البائع</label>
                <select
                    onChange={handelChangeVendurId} 
                    className='bg-white'
                    id="vendurID" 
                    defaultValue={vendurId}
                    name="vendurID">
                    {vendurs.map((vendur: any) => (
                        <option key={vendur.id} value={vendur.id}>
                            {vendur.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>رقم المنتج</label>
                <select
                    onChange={handelChangeProductId} 
                    className='bg-white'
                    id="productID" 
                    defaultValue={productId}
                    name="productID">
                    {products.map((product: any) => (
                        <option key={product.id} value={product.id}>
                            {product.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>
                    التمن
                </label>
                
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <Label>
                    الكمية المتوقعة للإرجاع
                </Label>
                <Input
                    type='number'
                    onChange={(e) => setQuantite_attendue_retourner(e.target.value)}
                    value={quantite_attendue_retourner}
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
                />
            </div>
            <Button className='bg-primary text-white' onClick={handelSubmit}>
                نحديث البيانات
            </Button>
        </div>
    );
};

export default Payment;
