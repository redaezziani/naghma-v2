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
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
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
import { Card } from "@/components/ui/card";

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
    const [searchLoading, setSearchLoading] = useState(false);
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
                toast.error(res?.message);
            }
            setData(res?.data ?? {});
        } catch (error) {
            console.log(error);
        }
    }
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setSearchLoading(true);
            const date = new Date(data.dob)
            const month = date.getMonth() + 1
            const year = date.getUTCFullYear().toString().slice(-2)
            let currentMonth = new Date().getMonth() + 1
            
            const res = await getVendurById(id, date)
            if (res?.status === 'error') {
                toast.error('jjjj')
            }
            setData(res?.data ?? {});
        } catch (error) {
            throw error
        }
        finally {
            setSearchLoading(false);
        }
    }
    useEffect(() => {
        handelData();
    }, [])
    const router = useRouter()

    const handleDeleteVendor = async () => {
        try {
            if (!confirm('هل تريد حذف البائع؟')) {
                toast.error('تم الغاء الحذف');
            }
            setLoading(true);

            const res = await deleteVendur(id);
            console.log(res);
            if (res?.status === 'error') {
                toast.error(res?.message);
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
            <div className=" flex w-full justify-between items-center flex-wrap gap-4 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex  justify-start items-end gap-2">
                                    <FormLabel>
                                        <Button
                                        isloading={searchLoading}
                                        disabled={searchLoading}
                                        type="submit">
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

            <Card
                className=" w-full bg-white px-3 py-6 shadow-none rounded-none"
            >
                <VendorInfo vendur={data.vendur} />
            </Card>
            <Card
                className={` w-full bg-white px-3 py-6 shadow-none rounded-none ${data.payments?.length > 0 ? '' : 'hidden'}`}
            >
                {data.payments && <TablePayments payments={data.payments} id={id} />}
            </Card>
            <Card
                className={` w-full bg-white px-3 py-6 shadow-none rounded-none ${data.sales?.length > 0 ? '' : 'hidden'}`}
            >
              {data.sales&&<SelledProducts payments={data.sales} />}
            </Card>
            <Card
                className={` w-full bg-white px-3 py-6 shadow-none rounded-none ${data.losses?.length > 0 ? '' : 'hidden'}`}
            >
                {data.losses && <CompantLoss losses={data.losses} />}
            </Card>
            <Card
                className={` w-full bg-white px-3 py-6 shadow-none rounded-none ${data.frais?.length > 0 ? '' : 'hidden'}`}
            >
                {data.frais && <FraisVendor payments={data.frais} />}
            </Card>

        </div>
    )
}

export default VendorPage