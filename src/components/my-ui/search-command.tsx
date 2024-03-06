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
    const list = [
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
                        {list.map((item, i) => (
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
