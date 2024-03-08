import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { toast } from 'sonner';
import { Textarea } from "@/components/ui/textarea"
import { createExternalExpense } from '@/(db)/data';
import * as z from 'zod';

type external_expense = {
    prix: number;
    type: string;
}
const formSchema = z.object({
    prix: z.number().min(1,{
        message: 'يجب أن يكون المبلغ أكبر من 0'
    }),
    
    type: z.string().min(3, {
        message: 'يجب أن يحتوي المجال على الأقل 3 أحرف'
    })
})
const CompanyExpense = () => {
    const [price, setPrice] = useState('0');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        price: '',
        type: ''
    })
    
    const handelSubmit = async () => {
        try {
            const result = formSchema.parse({ prix: Number(price), type: type });
            if (!result) {
                toast.error('حدث خطأ ما');
                return
            }
            const data: external_expense = {
                prix: Number(price),
                type: type
            }
            setIsLoading(true);
            const res = await createExternalExpense(data);
            if (res?.status === 'error') {
                toast.error(res?.message);
                return
            }
            toast.success('تمت العملية بنجاح');
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError({
                    price: error.errors.find(err => err.path[0] === 'prix')?.message || '',
                    type: error.errors.find(err => err.path[0] === 'type')?.message || ''
                })
            }
        }
        finally {
            setIsLoading(false);
        }

    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={'default'}
                >
                    اضافة مصاريف
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[90%] lg:w-full">
                <DialogHeader>
                    <DialogTitle>
                        مصاريف الشركة
                    </DialogTitle>
                    <DialogDescription>
                        يمكنك من هنا ان تضيف مصاريف الشركة
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 w-full py-4">
                    <div className="grid grid-cols-4 w-full items-center gap-4">
                        <Label
                            htmlFor="name" className="text-right col-span-4">
                            المبلغ

                        </Label>
                        <Input
                            type="number"
                            name='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='التمن'
                          className={` col-span-4 ${error.price ? 'border-red-500 focus-visible:ring-destructive placeholder:text-destructive' : ''}`}
                         />
                        <p className="text-red-500 col-span-4 text-sm text-right">{error.price}</p>
                    </div>
                    <div className="grid grid-cols-4 w-full items-center gap-4">
                        <Label
                            htmlFor="name" className="text-right col-span-4">
                            ملاحظة

                        </Label>
                        <Textarea
                            name='type'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder='ملاحظة'
                            className={` col-span-4 ${error.type ? 'border-red-500 focus-visible:ring-destructive placeholder:text-destructive' : ''}`}
                            />
                        <p className="text-red-500 col-span-4 text-sm text-right">{error.type}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handelSubmit}
                        isloading={isLoading}
                        disabled={isLoading}
                        type="submit">
                        اضافة مصاريف
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CompanyExpense
