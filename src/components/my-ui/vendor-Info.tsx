import React from 'react'

function VendorInfo() {
  return (
    <div className='flex flex-col gap-4'>
        
        <h3 className='text-lg text-primary '>البيانات الشخصية</h3>
        <div className='flex flex-col gap-3'>
            <p>اسم البائع :</p>
            <p>
            المبلغ المطلوب ارجاعه : 
            </p>
            <p>
            المبلغ الدي تم ارجاعه :
            </p>
            <p>
            النفقات والمصاريف :
            </p>
        </div>
        
    </div>
  )
}

export default VendorInfo