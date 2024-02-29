'use client';
import { useEffect, useState } from "react";
import { getVendurById } from "@/(db)/vendur";
import VendorInfo from "@/components/my-ui/vendor-Info";
import TablePayments from "@/components/my-ui/table-payments";
import CompantLoss from "@/components/my-ui/copanyloss";
import { Skeleton } from "@/components/ui/skeleton";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import ComponentToPrint from '@/components/my-ui/anlys/invoice';
import { Button } from '@/components/ui/button';
import { PrinterIcon, Trash } from "lucide-react";
import { deleteVendur } from "@/(db)/vendur";
import { toast } from 'sonner';
import { useRouter } from "next/navigation"
import SelledProducts from "@/components/my-ui/selled-products";

const VendorPage = ({ ...props }: any) => {
    let id = props.params.id[0]
    const componentRef = useRef();
    const [loading, setLoading] = useState(false);
    const handlePrint = useReactToPrint({
        //@ts-ignore
        content: () => componentRef.current,
    });
    const [data, setData] = useState<any>({})
    const handelData = async () => {
        try {
            const res = await getVendurById(id);
            if (res?.status === 'error') {
                return;
            }
            setData(res?.data ?? {});
            let sells = res?.data?.sales ?? [];
           
            let grouped = sells.reduce((acc: any, curr: any) => {
                if (!acc[curr.productName]) {
                    acc[curr.productName] = { productName: curr.productName, quantity: 0, totalPrice: 0 };
                }
                acc[curr.productName].quantity += curr.quantity;
                acc[curr.productName].totalPrice += curr.price * curr.quantity;
                return acc;
            }, {});

            let groupedArray = Object.values(grouped);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handelData();
    }, [])
    const router = useRouter()

    const handleDeleteVendor = async () => {
        try {
            if (!confirm('هل تريد حذف البائع؟')) {
                return;
            }
            setLoading(true);
            
            const res = await deleteVendur(id);
            console.log(res);
            if (res?.status === 'error') {
                return;
            }
            toast.success('تم حذف البائع بنجاح',{
                style: {
                    color: '#4CAF50',
                },
            })
            router.push('/dashboard/vendor')
            
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className=" mt-20
    flex
    flex-col
     justify-start items-start gap-7
     w-full
    lg:w-2/3
    px-6 py-3  relative">
    
            <div className="hidden">
            <ComponentToPrint
            vendur={data.vendur}
            payments={data.payments}
            sales={data.sales}
            //@ts-ignore
            ref={componentRef} />
           
           </div>
           <div className="w-full flex max-w-[1000px] justify-between items-center">
           <h1
                className='text-2xl text-primary font-bold'
            >
                ملف البائع
            </h1>
           <div className="flex gap-4 items-center relative  ">
           
           <Button
           variant={"secondary"}
            onClick={handlePrint}>
                <PrinterIcon className="w-6 pr-2 h-6" />
                <p
                className="mr-2"
                >
                طباعة الفاتورة
                </p>
            </Button>
            <Button
            variant={"destructive"}
            isloading={loading}
            disabled={loading}
            onClick={handleDeleteVendor}
            >
                <Trash className="w-6 pr-2 h-6" />
                <p
                className="mr-2"
                > 
                حذف البائع
                </p>
            </Button>
           </div>
           </div>
           
            <div>
                <VendorInfo vendur={data.vendur} />
            </div>
            <div
                className='w-full'
            >
                {data.payments ? (<TablePayments payments={data.payments} />) :
                    (
                        <div className="flex flex-col space-y-3">
                            <div className="space-y-2">
                                <Skeleton className=" h-44 lg:h-96 w-full lg:w-[550px]" />
                            </div>
                        </div>
                    )}
            </div>
            <div className="w-full">
                {data.sales ? (<SelledProducts payments={data.sales} />) :
                    (
                        <div className="flex flex-col space-y-3">
                            <div className="space-y-2">
                                <Skeleton className=" h-44 lg:h-96 w-full lg:w-[550px]" />
                            </div>
                        </div>
                    )}
            </div>
            <div
                className='w-full'
            >
                {data.losses && <CompantLoss losses={data.losses} />}
            </div>
           
        </div>
    )
}

export default VendorPage