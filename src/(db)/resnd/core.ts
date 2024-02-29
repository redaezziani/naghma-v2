"use server"
import { secrets } from '@/(secrets)/secrets';
import { SignJWT,jwtVerify} from "jose";
import { cookies } from 'next/headers';


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
        vendur_id: user.vendur_id
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
        
