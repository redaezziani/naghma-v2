"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { frais_de_prix } from '@/(db)/payment'; 
import { Textarea } from "@/components/ui/textarea"

interface frais_de_prix {
    prix: number
    type : string
}
const CompanyExpense = () => {

    const [price, setPrice] = React.useState('0');
    const [type, setType] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);


    const allVendurs = async () => {
        try {
            
         
          

        } catch (error) {
            console.error(error)
        }
    }

    const handelType = (event: string) => {
        setType(event)
    }


    const handelSubmit = async () => {
        try {
            if (!price || price === '0' || !type) {
                toast.error('الرجاء ملء جميع الحقول')
                return
            }
            //check if the price is a number
            if (isNaN(Number(price))) {
                toast.error('الرجاء إدخال رقم')
                return
            }
            const data: frais_de_prix = {
               
                prix: Number(price),
                type: type
            }
            setIsLoading(true)
            const res = await frais_de_prix(data) 
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
        <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
            <h1 className='text-2xl text-primary font-bold'>
               مصاريف الشركة
            </h1>
            <p>
                يمكنك من هنا ان تضيف مصاريف الشركة 
            </p>



            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>
                    المبلغ
                </label>
                <Input
                    name='price'
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='التمن'
                />
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>
                    ملاحظة
                </label>
                <Textarea
                    name='type'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder='ملاحظة'
                />
            </div>
            
            <Button
            isloading={isLoading}
            disabled={isLoading}
            className='bg-primary text-white' onClick={handelSubmit}>
                نحديث البيانات
            </Button>
        </div>
    );
};

export default CompanyExpense;
