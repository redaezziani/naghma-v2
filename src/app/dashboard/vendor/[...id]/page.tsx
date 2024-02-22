'use client';
import { useEffect } from "react";
import { getVendurById } from "@/(db)/vendur";
import VendorInfo from "@/components/my-ui/vendor-Info";
import SelledProducts from "@/components/my-ui/selled-products";
const VendorPage = ({ ...props }: any) => {
    let id = props.params.id[0]
    const handelData = async () => {
        try {
            const res = await getVendurById(id);
            if (res?.status === 'error') {
                return;
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handelData();
    }, [])
    return (
        <div className=" mt-20
    flex
    flex-col
     justify-start items-start gap-7
     w-full
    lg:w-2/3
    px-6 py-3 relative">
            
            <h1
                className='text-2xl text-primary font-bold'
            >
                ملف البائع
            </h1>
            <div>
                <VendorInfo />
            </div>
            <div className='w-full  '>
                <SelledProducts />  
            </div> 

        </div>
    )
}

export default VendorPage