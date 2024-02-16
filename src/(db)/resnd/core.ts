"use server"

import { Resend } from 'resend';
import ForgetPasswordEmailTemplate from './ui/forgetPassoword';
const resend = new Resend('re_E18ceeYD_MTkvyL3zqXs2ETpNipdssVh7');
import { secrets } from '@/(secrets)/secrets';
import { SignJWT,jwtVerify} from "jose";
import { cookies } from 'next/headers';

import { revalidatePath } from 'next/cache';


export const forgetPassoword = async (number:string | number, username:string) => {
    try {
        revalidatePath('/')
        
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'klausdev2@gmail.com',
            subject: 'Foreget Password Request',
            react: ForgetPasswordEmailTemplate({number,store_name:secrets.store_name, username}),
            text: 'Welcome to the store!', 
          });
          
          return response
    }
    catch(err){
        console.log(err)
    }
}

export const generateNumber = async () => {
    const token = Math.floor(1000 + Math.random() * 9000);
    return token;
}

const tokenSecret = new TextEncoder().encode(secrets.jwtSecret);


export const generateToken = async (user: any) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.name,
        profile: user.image??'',
        role: user.role,
    };

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(tokenSecret);
    return token;
}

export const verifyToken = async () => {
    const token = cookies().get("token")?.value;
    if (!token) {
        return null;
    }
    try {
        const { payload } = await jwtVerify(token, tokenSecret);
        return payload;
    } catch (error) {
        return null;
    }
}



export const checkVerification = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, tokenSecret);
        return payload;
    } catch (error) {
        return null;
    }
}
        
