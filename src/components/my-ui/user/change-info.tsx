'use client';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label'
import * as z from 'zod'
import React from 'react'
import { changeInfo } from '@/(db)/user';
import { toast } from 'sonner';
const dataSechma = z.object({
    is_active: z.boolean().default(false).optional(),
    email: z.string().email({
        message: 'يجب أن يكون البريد الإلكتروني صالح'
    }),
    name: z.string().min(3, {
        message: 'يجب أن يحتوي الاسم على الأقل 3 أحرف'
    })
})
const ChangeInfo = () => {
    const [is_active, setIs_active] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState({
        is_active: '',
        email: '',
        name: ''
    })
    const handelSubmit = async () => {
        try {
            setLoading(true)
            const data = {
                is_active,
                email,
                name
            }
            const result = dataSechma.parse(data)
            const res = await changeInfo(result) as  any
            if (res?.status === 'error') {
                setError({
                    is_active: res.message,
                    email: res.message,
                    name: res.message
                })
                return
            }
            if (res?.status === 'logout') {
                window.location.href = '/signin'
                return
            }
            setError({
                is_active: '',
                email: '',
                name: ''
            })
            toast.success(res.message)

        } catch (error) {
            if (error instanceof z.ZodError) {
                setError({
                    is_active: error.errors.find(err => err.path[0] === 'is_active')?.message || '',
                    email: error.errors.find(err => err.path[0] === 'email')?.message || '',
                    name: error.errors.find(err => err.path[0] === 'name')?.message || '',
                })
            }
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div
            className='flex flex-col gap-3 w-full  justify-start items-start mt-5 '
        >
            <label className=' font-semibold'>
                الاسم
            </label>
            <Input

                onChange={(e) => setName(e.target.value)}
                type='text'
                value={name}
                placeholder='الاسم'
                className={`${error.name ? 'border-red-500 focus-visible:ring-destructive placeholder:text-destructive' : ''}`}
            />
            <p
                className='text-red-500 text-sm'
            >
                {error.name}
            </p>

            <label className=' font-semibold'>
                البريد الالكتروني
            </label>
            <Input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                value={email}
                placeholder='البريد الالكتروني'
                className={`${error.email ? 'border-red-500 focus-visible:ring-destructive placeholder:text-destructive' : ''}`}
            />
            <p
                className='text-red-500 text-sm'
            >
                {error.email}
            </p>
            <div className="flex justify-start items-start gap-2">
                <Checkbox
                    //@ts-ignore    
                    onCheckedChange={(e) => setIs_active(e)}
                    name='is_active'
                    title=''
                    value='false'
                    className='rounded-md'
                />
                <Label
                    className='text-sm text-slate-500 '
                >
                    هل تريد تسجيل الخروج
                </Label>

            </div>
            <Button
                isloading={loading}
                disabled={loading}
                onClick={handelSubmit}
                className='mt-5 '
            >
                تحديث البيانات
            </Button>
        </div>
    )
}

export default ChangeInfo