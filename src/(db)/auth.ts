"use server";
import { createHash } from 'crypto';
import { prisma } from '@/(secrets)/secrets';
import { signinSchema } from './shema/signin';
import {  generateToken, verifyToken } from './resnd/core';
import { cookies } from "next/headers"
interface UserCredentials {
    email: string;
    password: string;
}


export const SignIn = async (credentials: UserCredentials) => {
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
        cookies().set('token', token, {
            path: '*',
            maxAge: 60 * 60 * 24 * 7,
            httpOnly:true,
            sameSite: 'lax',
        });
        return { success: 'تم تسجيل الدخول بنجاح.' };
    } catch (error) {
        console.error('خطأ أثناء تسجيل الدخول:', error);
        return { error: 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.' };
    }
};

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
    finally {
        await prisma.resetPasswordRequest.delete({
            where: {
                token,
            },
        });
         await prisma.$disconnect();
    }
}


export const userData= async () => {
    try {
        const isToken = cookies().has("token");
        if (!isToken) {
            return {status :"error", message: "Unauthorized"};
        }
        const token = cookies().get("token")?.value;
        if (!token) {
            return {status :"error", message: "Unauthorized"};
        }

        const payload = await verifyToken();
        if (!payload) {
            return {status :"error", message: "Unauthorized"};
            
        }
        return {
            user: {
                name: payload.username,
                email: payload.email,
                image: payload.profile,
            }
        };
    } catch (error) {
     console.error(error);   
    }
    finally {
        await prisma.$disconnect();
    }
}  

export const logOut = async () => {
    cookies().set('token', '', {
        path: '/',
        maxAge: 0,
    });
    return {status :"success", message: "تم تسجيل الخروج بنجاح."};
}

export const createThreeRoles = async () => {
    try {
        const superadminPassword = createHash('sha256').update('superadminnaghma').digest('hex');
        const superadmin = await prisma.user.create({
            data: {
                email: 'superadmin@gmail.com',
                name: 'superadmin',
                password: superadminPassword,
                role: 'superadmin',
            }
        });
        
        const adminPassword = createHash('sha256').update('adminnaghma').digest('hex');
        const admin = await prisma.user.create({
            data: {
                email: 'admin@gmail.com',
                name: 'admin',
                password: adminPassword,
                role: 'admin',
            }
        });
        const userPassword = createHash('sha256').update('usernaghma').digest('hex');
        const user = await prisma.user.create({
            data: {
                email: 'user@gmail.com',
                name: 'user',
                password: userPassword,
                role: 'user',
            }
        });
        return {status :"success", message: "تم إنشاء الأدوار بنجاح."};
    } catch (error) {
        console.error(error); 
    }
}
