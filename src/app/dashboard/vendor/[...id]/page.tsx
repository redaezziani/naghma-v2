'use client';
const VendorPage = ({ ...props }: any) => {
    let id = props.params.id[0]

    return (
        <div className=" mt-20
    flex
    flex-col
     justify-start items-start gap-7
     w-full
    lg:w-2/3
    px-6 py-3 relative">
            <div className="flex justify-between w-full">
                <h1 className="text-3xl font-bold">الموزع</h1>
            </div>

        </div>
    )
}

export default VendorPage