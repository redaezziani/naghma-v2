import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { prisma } from "@/(secrets)/secrets"



const Confeme = ({ item, type }: { item: any, type: string }) => {
    const types = [
        {
            title: "product",
            message: "are you sure you want to delete this product?"
        },
        {
            name:"vendur",
            message: "are you sure you want to delete this vendur?"
        }
        ,
        {
            name:"user",
            message: "are you sure you want to delete this user?"
        },
        {
            name:"payment",
            message: "are you sure you want to delete this payment?"
        }
    ]
    const [isConfermed, setIsConfirmed] = useState<Boolean>(false)
    
    return (
        <Dialog

        >
            <DialogTrigger asChild>
            <Trash
            className='cursor-pointer text-muted-foreground hover:text-secondary-foreground hover:scale-110 hover:rotate-6 transition-all duration-300 ease-in-out'
            size={16}

          />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[90%] lg:w-full">
                <DialogHeader>
                    <DialogTitle>
                        تأكيد الحذف
                    </DialogTitle>
                    <DialogDescription>
                        {types.find((t) => t.name == type)?.message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                     variant={"destructive"}
                     className=" border-none focus-visible:ring-2 focus-visible:ring-red-600"
                    onClick={() => setIsConfirmed(!isConfermed)}
                    >
                            تأكيد الحذف  
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Confeme