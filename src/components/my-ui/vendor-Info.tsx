import { Skeleton } from "../ui/skeleton";

function VendorInfo(props: any) {
  const { nom, le_prix_a_payer, le_prix_a_paye, frais_de_prix, balance, total_sell_quantity } = props.vendur ?? {};
  return (
    <div className='flex flex-col text-slate-700 gap-4'>
      <h3 className='text-lg text-primary '>البيانات الشخصية</h3>
      {
        props.vendur ? (<div className='flex font-semibold flex-col gap-3'>
        <p>اسم البائع : <span className=' '>{nom}</span></p>
        <p>المبلغ الذي يجب أن يدفع : <span className=' text-slate-700  font-medium'>{le_prix_a_paye} د.م </span></p>
        <p>المبلغ الذي تم إرجاعه : <span className=' text-green-400  font-medium'>{le_prix_a_payer} د.م </span></p>
        <p>النفقات والمصاريف : <span className=' text-primary  font-medium'>{frais_de_prix} د.م </span></p>
        <p>
          المبلغ المتبقي لدفعه :
          <span className={
            ` ${balance <= 0 ? 'text-emerald-600' : 'text-destructive'}  font-medium`}
          >{balance} د.م </span></p>
        <p>
          إجمالي الكمية المأخوذة :
          <span className=' font-medium'> {total_sell_quantity} كلغ</span></p>
      </div>): (
         <div className="flex flex-col space-y-3">
         <div className="space-y-2">
           <Skeleton className="h-2 w-[250px]" />
           <Skeleton className="h-2 w-[290px]" />
           <Skeleton className="h-2 w-[350px]" />
           <Skeleton className="h-2 w-[270px]" />
           <Skeleton className="h-2 w-[400px]" />
         </div>
       </div>
      )
      }
    </div>
  )
}


export default VendorInfo