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
import FraisVendor from "@/components/my-ui/frai-vendor";
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { date, z } from "zod"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

  const FormSchema = z.object({
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
  })
const VendorPage = ({ ...props }: any) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    
    let id = props.params.id[0]
    const componentRef = useRef();
    const [loading, setLoading] = useState(false);
    const handlePrint = useReactToPrint({
        //@ts-ignore
        content: () => componentRef.current,
        documentTitle: 'فاتورة البائع'
    });
    const [data, setData] = useState<any>({})
    const handelData = async () => {
        try {
            const res = await getVendurById(id);
            if (res?.status === 'error') {
                return;
            }
            setData(res?.data ?? {});
            console.log(res?.data);
            let sells = res?.data?.sales ?? [];
        } catch (error) {
            console.log(error);
        }
    }
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const date = new Date(data.dob)
        const month = date.getMonth() + 1
        const year = date.getUTCFullYear().toString().slice(-2)
        console.log(month, year,id)
        const res = await getVendurById(id,date)
            if (res?.status === 'error') {
                toast.error('jjjj')
            }
            setData(res?.data ?? {});
            console.log(res?.data);        
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
            toast.success('تم حذف البائع بنجاح', {
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
        <div className=" mt-28
    flex
    flex-col
     justify-start items-start gap-7
     w-full
    px-10 py-3   relative
    ">

            <div className="hidden overflow-hidden">
                <ComponentToPrint
                    vendur={data.vendur}
                    payments={data.payments}
                    sales={data.sales}
                    frais={data.frais}
                    //@ts-ignore
                    ref={componentRef} />

            </div>
            <div className=" flex w-full justify-between items-start">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex  justify-start items-end gap-2">
                                    <FormLabel>
                                        <Button type="submit">
                                            بحث
                                        </Button>
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px]  text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>اختر تاريخًا</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
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
                {data.payments ? (<TablePayments payments={data.payments} id={id} />) :
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
            <div
                className='w-full'
            >
                {data.frais && <FraisVendor payments={data.frais} />}
            </div>

        </div>
    )
}

export default VendorPage