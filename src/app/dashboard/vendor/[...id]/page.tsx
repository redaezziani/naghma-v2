'use server';

import { prisma } from '@/(secrets)/secrets';
import React from 'react'

const VendorPage = ({...props} : any) => {
    let data = []
    const handelQuntity = async() => {
        try {
          const res = await prisma.produit_sell.findMany({
                where: {
                    vendur_id: props.params.id[0]
                }
            })
            if (res?.status === 'error') {
                console.log(res.message)
                return;
            }
            console.log(res) 
            data=res 
        } catch (error) {
            console.log(error)
        }
    }
    handelQuntity()
    console.log(props.params.id[0])
  return (
    <div className=" mt-20
    flex
    flex-col
     justify-start items-start gap-7
     w-full
    lg:w-2/3
    px-6 py-3 relative">
        <p className="text-lg font-normal text-muted-foreground">This is the vendor page</p>
        <p>
            {data.length>0 &&(
                <p>
                    hi
                </p>
            )}
        </p>
    </div>
  )
}

export default VendorPage