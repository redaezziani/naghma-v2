"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { getEarningsOfCurrentMonth } from '@/(db)/data';



const CapitalPerMonth = () => {
    const [initial_amount_price, setPrice] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    const handelSubmit = async () => {
     
            try {
                setIsLoading(true);
                console.log(initial_amount_price);
                const res = await getEarningsOfCurrentMonth({initial_amount_price});
                if (res?.status === 'error') {
                  return;
                }
                console.log(res);
                toast.success('تمت العملية بنجاح');
              

        } catch (error) {
            console.log("error in handelSubmit", error);
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {

    }, [])

    return (
        <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
            <h1 className='text-2xl text-primary font-bold'>
            حساب الارباح
            </h1>
            <p className=' text-sm text-slate-500'>
            في هده الصفحة تضيف المبلغ او راس المال الشهري المخصص لشراء المنتوج الاولي (vrag) من اجل حساب الارباح  ملاحضة : يضاف مرة واحدة في الشهر
            </p>
            <div className='flex w-full lg:w-1/2 gap-3 justify-start flex-col items-start'>
                <label className='font-semibold'>
                    المبلغ
                </label>
                <Input
                    name='price'
                    type='number'
                    value={initial_amount_price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder='التمن'
                />
            </div>
            
        

            <Button
                isloading={isLoading}
                disabled={isLoading}
                className='bg-primary text-white' onClick={handelSubmit}>
               حساب الارباح
            </Button>
        </div>
    );
};

export default CapitalPerMonth;
