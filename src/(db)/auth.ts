"use server";
import { createHash } from 'crypto';
import { prisma } from '@/(secrets)/secrets';
import { signinSchema } from './shema/signin';
import { forgetPassoword, generateToken, verifyToken } from './resnd/core';
import { cookies } from "next/headers"
import { revalidatePath } from 'next/cache';
interface UserCredentials {
    email: string;
    password: string;
}


export const SignIn = async (credentials: UserCredentials) => {
    revalidatePath('/');
    try {
        const valid = signinSchema.safeParse(credentials);
        if (!valid.success) {
            return { error: valid.error };
        }

        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
        });

        if (!user) {
            return { error: 'لم يتم العثور على المستخدم. يرجى التسجيل.' };
        }

        const hashedPassword = createHash('sha256').update(credentials.password).digest('hex');

        if (hashedPassword !== user.password) {
            return { error: 'كلمة المرور غير صحيحة.' };
        }

        const token = await generateToken(user);
        // جعل الرمز متاحًا للخادم في جميع طلبات URL
        cookies().set('token', token, {
            path: '*',
            maxAge: 60 * 60 * 24 * 7,
            httpOnly:false
        });
        return { success: 'تم تسجيل الدخول بنجاح.' };
    } catch (error) {
        console.error('خطأ أثناء تسجيل الدخول:', error);
        return { error: 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.' };
    }
};

export const ForgetPassword = async (email: string) => {
    try {
        

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return { type: 'error', message: 'لم يتم العثور على المستخدم. يرجى التسجيل.' };
        }

        const token = await generateToken(user);
        const passwordreset = await prisma.resetPasswordRequest.create({
            data: {
                token,
                userId: user.id,
                expires: new Date(Date.now() + 3600000),
            },
        });
        await forgetPassoword(token, user.name ?? '');

        return { type: 'success', message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.' };
    } catch (error) {
        console.error('خطأ أثناء إعادة تعيين كلمة المرور:', error);
        return { type: 'error', message: 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.' };
    }
}


export const ResetPassword = async (token: string, password: string) => {
    try {
        const request = await prisma.resetPasswordRequest.findUnique({
            where: {
                token,
            },
        });

        if (!request) {
            return { type: 'error', message: 'الرمز غير صالح أو منتهي الصلاحية.' };
        }

        const user = await prisma.user.findUnique({
            where: {
                id: request.userId,
            },
        });

        if (!user) {
            return { type: 'error', message: 'لم يتم العثور على المستخدم.' };
        }

        const hashedPassword = createHash('sha256').update(password).digest('hex');
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });
        return { type: 'success', message: 'تمت إعادة تعيين كلمة المرور بنجاح.' };
    } catch (error) {
        console.error('خطأ أثناء إعادة تعيين كلمة المرور:', error);
        return { type: 'error', message: 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.' };
    }
}


export const ChangePassword = async ( newPassword: string) => {
    try {
        const payload = verifyToken();

        const { id, password } = payload;
        if (!id || !password) {
            return { type: 'error', message: 'الرمز غير صالح.' };
        }
        const hashedPassword = createHash('sha256').update
        (newPassword).digest('hex');
        await prisma.user.update({
            where: {
                id,
            },
            data: {
                password: hashedPassword,
            },
        });
        
        return { type: 'success', message: 'تم تغيير كلمة المرور بنجاح.' };
    }
    catch (error) {
        console.error('خطأ أثناء تغيير كلمة المرور:', error);
        return { type: 'error', message: 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.' };
    }
}   


export const SignOut = async () => {
    cookies().set('token', '', {
        path: '/',
        maxAge: 0,
    });
}

