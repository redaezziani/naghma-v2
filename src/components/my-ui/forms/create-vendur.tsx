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
import { createVendur } from '@/(db)/vendur';
import { useState } from "react";
import { toast } from 'sonner';
const CreateVendur = () => {
    const [name, setName] = useState('')
    const [Loading, setLoading] = useState(false)
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handelSubmit = async () => {
        try {
            setLoading(true)
            const res = await createVendur(name);
            if (res?.status === 'error') {
                alert(res.message);
                return;
            }
            setLoading(false)
            setName('')
            toast.success('تم إضافة البائع بنجاح')
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                variant={'default'}
                >
                    إضافة بائع جديد
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[90%] lg:w-full">
                <DialogHeader>
                    <DialogTitle>
                        إضافة بائع جديد
                    </DialogTitle>
                    <DialogDescription>
                        إضافة بائع جديد إلى قائمة البائعين
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 w-full py-4">
                    <div className="grid grid-cols-4 w-full items-center gap-4">
                        <Label
                            htmlFor="name" className="text-right col-span-4">
                            الاسم
                        </Label>
                        <Input
                            onChange={handelChange}
                            id="name"
                            value={name}
                            placeholder="اسم البائع ..."
                            className="col-span-4" />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        isloading={Loading}
                        disabled={Loading}
                        onClick={handelSubmit}
                        type="submit">
                        إضافة بائع
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateVendur
