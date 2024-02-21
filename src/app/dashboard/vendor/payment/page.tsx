"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { prix_a_paye } from '@/(db)/payment';
import { getAllVendurs } from '@/(db)/vendur';
import { getAllProduits } from '@/(db)/produit';
interface payment {
    vendur_id: string,
    prix: number,
    type: string
}
const Payment = () => {
    const [vendurs, setVendurs] = React.useState([]) as any[];
    const [produits, setProduits] = React.useState([]) as any[];
    const [vendurId, setVendurId] = React.useState('');
    const [price, setPrice] = React.useState('0');
    const [validationDate, setValidationDate] = React.useState('');
    interface payment {
        vendur_id: string,
        prix: number,
        type: string
    }
    const handelChangeVendurId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Leave this function blank
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
            setProduits(res?.data)
        } catch (error) {
            console.error(error)   
        }
    }

    const handelSubmit = async () => {
        // Leave this function blank
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
                    name='vendur_id'
                    onChange={handelChangeVendurId}
                    value={vendurId}
                    className='w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary'
                >
                    <option value=''>اختر البائع</option>
                    {vendurs.map((vendur: any) => (
                        <option key={vendur.id} value={vendur.id}>
                            {vendur.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>المنتج</label>
                <select
                    name='produit_id'
                    value={vendurId}
                    className='w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary'
                >
                    <option value=''>اختر المنتج</option>
                    {produits.map((produit: any) => (
                        <option key={produit.id} value={produit.id}>
                            {produit.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>
                    التمن
                </label>
                <Input
                    name='quantite'
                    type='number'
                    value={price}
                    placeholder='الكمية'
                />
            </div>
            {/* make an input type radio that have the type of the payment a chash payment or a banck check payment  */}
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start '>
                <RadioGroup
                className=''
                defaultValue="option-one">
                    <div className=" flex w-full  items-start justify-end gap-2">
                        <Label htmlFor="option-one">الدفع نقدًا</Label>
                        <RadioGroupItem value="option-one" id="option-one" />
                    </div>
                    <div className="flex w-full items-start justify-end space-x-2">
                        <Label htmlFor="option-two">الدفع بشيك بنكي</Label>
                        <RadioGroupItem value="option-two" id="option-two" />
                    </div>
                </RadioGroup>

            </div>
            <Button className='bg-primary text-white' onClick={handelSubmit}>
                نحديث البيانات
            </Button>
        </div>
    );
};

export default Payment;
