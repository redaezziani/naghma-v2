'use server';
import { prisma } from "@/(secrets)/secrets";
import * as z from 'zod';
import { verifyToken } from "./resnd/core";
import { logOut } from "./auth";
import { revalidatePath } from "next/cache";


const userSchema = z.object({
    is_active: z.boolean().default(false).optional(),
    email: z.string().email({
        message: 'يجب أن يكون البريد الإلكتروني صالح'
    }),
    name: z.string().min(3, {
        message: 'يجب أن يحتوي الاسم على الأقل 3 أحرف'
    })
})

export const changeInfo = async (data: z.infer<typeof userSchema>) => {
    try {
        const result = userSchema.parse(data)
        const {id} = await verifyToken() as any;
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                email: result.email,
                name: result.name,
            }
        })

        if (!user) {
            return { status: 'error', message: 'حدث خطأ أثناء تغيير المعلومات' }
        }
        if (result.is_active) {
            await logOut()
            return { status: 'logout', message: 'تم تغيير المعلومات بنجاح' }
        } 
        return { status: 'success', message: 'تم تغيير المعلومات بنجاح' }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { status: 'error', message: error.errors[0].message }
        }
    }
}