"use client"

import * as React from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import Link from "next/link"

export function SearchCommand() {
    const [open, setOpen] = React.useState(false)
    const listSugg = [
        {
            name: 'سجلات الموزعين',
            path: '/dashboard/vendor',
        },

        {
            name: 'سجلات المبيعات',
            path: '/dashboard/vendor/vendors-logs',
        },
        {
            name: 'سجلات الارجاع',
            path: '/dashboard/vendor/retourn',
        },
        {
            name:'الملف الشخصي',
            path: '/dashboard/profile', 
        }
    ]

    const listVend = [
        {
            name: 'إضافة مصروف',
            path: '/dashboard/vendor/expenses',
        },
        {
            name: 'إضافة مبيعات',
            path: '/dashboard/vendor/vendors-logs',
        },
        {
            name: 'إضافة ارجاع',
            path: '/dashboard/vendor/retourn',
        },
    ]

    const listProd = [
        {
            name: 'إضافة منتج',
            path: '/dashboard/final-product/products-logs',
        },
        {
            name: 'سجلات المنتجات',
            path: '/dashboard/final-product',
        },
    ]

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="اكتب أمرًا أو قم بالبحث..." />
                <CommandList>
                    <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
                    <CommandGroup heading="اقتراحات">
                        {listSugg.map((item, i) => (
                            <CommandItem key={i}>
                                <Link href={item.path}>
                                    <span>{item.name}</span>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="البائع">
                        {listVend.map((item, i) => (
                            <CommandItem key={i}>
                                <Link href={item.path}
                                >
                                    <span>{item.name}</span>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="المنتج">
                        {listProd.map((item, i) => (
                            <CommandItem key={i}>
                                <Link href={item.path}>
                                    <span>{item.name}</span>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    
                </CommandList>

            </CommandDialog>
        </>
    )
}
