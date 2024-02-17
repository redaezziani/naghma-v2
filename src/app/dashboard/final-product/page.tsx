import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function Finalproduct() {
    return (
        <div className='flex flex-col  justify-center mt-20 w-full px-6 py-3'>
            <Button className='w-32'>
              
                <Link href="/dashboard/final-product/add-final-product">  إضافة منتج جديد</Link>
                </Button>
            final product page</div>
    )
}

export default Finalproduct