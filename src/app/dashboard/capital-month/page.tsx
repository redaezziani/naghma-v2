"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { getEarningsOfCurrentMonth } from '@/(db)/data';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from '@/components/my-ui/anlys/last-invioce';
/*
data: Object { initial_amount_price: 220, total: 1900, totalFrais: 0, … }
​​
finalResult: 1480
​​
finalResultStock: 0
​​
initial_amount_price: 220
​​
total: 1900
​​
totalExpenses: 200
​​
totalFrais: 0
*/


const CapitalPerMonth = () => {
    const [initial_amount_price, setPrice] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState<any>({});
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        //@ts-ignore
        content: () => componentRef.current,
    });
    const handelSubmit = async () => {
     
            try {
                setIsLoading(true);
                console.log(initial_amount_price);
                const res = await getEarningsOfCurrentMonth({initial_amount_price});
                if (res?.status === 'error') {
                  return;
                }
                console.log(res);
                setData(res?.data ?? {});
                toast.success('تمت العملية بنجاح');
              

        } catch (error) {
            console.log("error in handelSubmit", error);
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
    if (data?.finalResult) {
        handlePrint();
    }
    }, [data]);

    return (
        <div className='flex flex-col gap-4 px-6 py-3 w-full justify-start items-start mt-20'>
            <div className="hidden">
            <ComponentToPrint
            final = {data.finalResult}
            finalStock = {data.finalResultStock}
            total = {data.total}
            totalExpenses = {data.totalExpenses}
            totalFrais = {data.totalFrais}
            initial_amount_price = {initial_amount_price}

            //@ts-ignore
            ref={componentRef} />
           
           </div>
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
