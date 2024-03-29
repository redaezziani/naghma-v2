"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { prix_a_paye } from '@/(db)/payment';
import { getAllVendurs } from '@/(db)/vendur';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
interface payment {
    vendur_id: string,
    prix: number,
    type: string
}
const Payment = () => {
    const [vendurs, setVendurs] = React.useState([]) as any[];
    const [vendurId, setVendurId] = React.useState('');
    const [price, setPrice] = React.useState('0');
    const [type, setType] = React.useState('cash');
    const [isLoading, setIsLoading] = React.useState(false);
    
    const handelChangeVendurId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVendurId(e.target.value)
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

    const handelType = (event: string) => {
        setType(event)
    }

    const handelSubmit = async () => {
        try {
            if (!vendurId || !price || price === '0' || !type) {
                toast.error('الرجاء ملء جميع الحقول')
                return
            }
            const data: payment = {
                vendur_id: vendurId,
                prix: Number(price),
                type: type
            }
            setIsLoading(true)
            const res = await prix_a_paye(data)
            if (res?.status === 'error') {
                toast.error(res.message)
                return
            }
            toast.success(res?.message)
            console.log(data);
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
        <Card className='flex shadow-none rounded-none   flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
            <h1 className='text-2xl text-primary font-bold'>
               دفع مستحقات البائع
            </h1>
            <p  className=' text-sm text-slate-500'>
            في هده الصفحة يمكنك اضافت المبالغ او الدفعات المستلمة من طرف البائع
            </p>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>
                   اسم البائع
                </label>
                <select
                    name='vendur_id'
                    onChange={handelChangeVendurId}
                    value={vendurId} // Use value instead of defaultValue
                    className='w-1/2 p-2 rounded-md border bg-white text-primary focus:outline-none focus:border-primary'
                >
                    <option disabled value="" selected>اختر البائع</option>
                    
                    {vendurs.map((vendur: any) => (
                        <option key={vendur.id} value={vendur.id}>
                            {vendur.nom}
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
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='التمن'
                />
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start '>
                <RadioGroup
                    className=''
                    defaultValue='cash'
                    onValueChange={handelType}
                >
                    <div className=" flex w-full  items-start justify-end gap-2">
                        <Label htmlFor="option-one">الدفع نقدًا</Label>
                        <RadioGroupItem

                            value='cash'
                            id="option-one" />
                    </div>
                    <div className="flex w-full items-start justify-end space-x-2">
                        <Label htmlFor="option-two">الدفع بشيك بنكي</Label>
                        <RadioGroupItem
                            value='bank-check'
                            id="option-two" />
                    </div>
                </RadioGroup>

            </div>
            <Button
            isloading={isLoading}
            disabled={isLoading}
            className='bg-primary text-white' onClick={handelSubmit}>
                نحديث البيانات
            </Button>
        </Card>
    </div>
    );
};

export default Payment;
