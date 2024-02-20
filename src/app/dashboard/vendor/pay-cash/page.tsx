"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

import { createVendur_log } from '@/(db)/vendur-log';
import { getAllVendurs } from '@/(db)/vendur';

interface IVendur {
    id: string;
    nom: string;
}

const PayCash = () => {
    const [vendurId, setVendurId] = React.useState('');
    const [quantite, setQuantite] = React.useState(0);

    const handelChangeVendurId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Leave this function blank
    }

    const handelSubmit = async () => {
        // Leave this function blank
    }

    useEffect(() => {
        // Leave this function blank
    }, [])



    return (
        <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
            <h1 className='text-2xl text-primary font-bold'>تحديث  بيانات البائع</h1>
            <p>
            من هنا يمكنك تحديث معلومات طريقة الدفع الخاصة بالبائع
            </p>
            
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>رقم البائع</label>
                <select
                    
                    onChange={handelChangeVendurId} // Use onChange instead of onSelect
                    className='bg-white'
                    id="vendurID" // Unique ID for the select element
                    name="vendurID">
                        <option >
                            ahmed
                        </option>
                        

                </select>
            </div>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>
                    التمن 
                </label>
                <Input
                    name='quantite'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantite(Number(e.target.value))}
                    type='number'
                    value={quantite}
                    placeholder='الكمية'
                />
            </div>
            <Button className='bg-primary text-white' onClick={handelSubmit}>
                نحديث البيانات
            </Button>
        </div>
    );
};

export default PayCash;
