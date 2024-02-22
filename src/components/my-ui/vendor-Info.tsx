function VendorInfo(props: any) {
  const { nom, le_prix_a_payer, le_prix_a_paye, frais_de_prix, balance } = props.vendur ?? {};
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-lg text-primary '>البيانات الشخصية</h3>
      <div className='flex font-semibold flex-col gap-3'>
        <p>اسم البائع : <span className=' text-green-400'>{nom}</span></p>
        <p>المبلغ الذي يجب أن يدفع : <span className=' text-slate-700'>{le_prix_a_paye}</span></p>
        <p>المبلغ الذي تم إرجاعه : <span className=' text-green-400'>{le_prix_a_payer}</span></p>
        <p>النفقات والمصاريف : <span className=' text-primary'>{frais_de_prix}</span></p>
        <p>
          المبلغ المتبقي لدفعه:
          <span className={
            ` ${balance <= 0 ? 'text-emerald-600' : 'text-destructive'} font-semibold`}
          >{balance}</span></p>
      </div>
    </div>
  )
}


export default VendorInfo