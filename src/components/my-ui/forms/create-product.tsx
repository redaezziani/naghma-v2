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
import { createProduit } from '@/(db)/produit';
import { toast } from 'sonner';
import React from 'react'
interface IProduit {
    nom: string;
    prix_vente: number;
    quantite: number;
}
const CreateProduct = () => {
    const [data , setData] = React.useState<IProduit>({
        nom: '',
        prix_vente: 0,
        quantite: 0
      })
      const [isLoading , setIsLoading] = React.useState(false)
      const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>)=>{
        // lets check if the type is number insert it as number
        if(e.target.type === 'number'){
          setData({...data, [e.target.name]: Number(e.target.value)})
          return
        }
        setData({...data, [e.target.name]: e.target.value})  
      }
      const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        try {
          e.preventDefault()
          setIsLoading(true)
          if (data.nom === '' || data.prix_vente === 0 || data.quantite === 0) {
            return
          }
          
          const res= await createProduit(data)
          if (res?.status === 'error') {
            alert(res.message)
            return
          }
          setData({
            nom: '',
            prix_vente: 0,
            quantite: 0
          })
          toast.success('تم إضافة المنتج بنجاح')
    
        } catch (error) {
          console.log(error)
        }
        finally{
          setIsLoading(false)
        }
    
      }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                variant={'default'}
                >
                    إضافة منتج
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[90%] lg:w-full">
                <DialogHeader>
                    <DialogTitle>
                        إضافة منتج جديد
                    </DialogTitle>
                    <DialogDescription>
                        قم باضافة اسم المنتج و سعره و كميته في الخانات المناسبة
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 w-full py-4">
                    <div className="grid grid-cols-4 w-full items-center gap-4">
                        <Label
                            htmlFor="name" className="text-right col-span-4">
                            الاسم
                        </Label>
                        <Input
                            onChange={handleChangeName}
                            id="name"
                            name="nom"
                            value={data.nom}
                            placeholder="اسم المنتج ..."
                            className="col-span-4" />
                    </div>
                </div>
                <div className="grid gap-4 w-full py-4">
                    <div className="grid grid-cols-4 w-full items-center gap-4">
                        <Label
                            htmlFor="prix_vente" className="text-right col-span-4">
                            سعر المنتج
                        </Label>
                        <Input
                            onChange={handleChangeName}
                            id="prix_vente"
                            name="prix_vente"
                            value={data.prix_vente}
                            type="number"
                            placeholder="سعر المنتج ..."
                            className="col-span-4" />
                    </div>
                </div>
                <div className="grid gap-4 w-full py-4">
                    <div className="grid grid-cols-4 w-full items-center gap-4">
                        <Label
                            htmlFor="quantite" className="text-right col-span-4">
                            كمية المنتج
                        </Label>
                        <Input
                            onChange={handleChangeName}
                            id="quantite"
                            name="quantite"
                            value={data.quantite}
                            type="number"
                            placeholder="كمية المنتج ..."
                            className="col-span-4" />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        isloading={isLoading}
                        disabled={isLoading}
                        onClick={handleSubmit}
                        type="submit">
                        إضافة منتج
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProduct
