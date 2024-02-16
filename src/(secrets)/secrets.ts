import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
export const prisma = new PrismaClient()


export const secrets = {
    jwtSecret: process.env.JWT_SECRET,
    resendSecret: process.env.RESEND_TOKEN_SECRET,
    edg_store_access_key: process.env.EDGE_STORE_ACCESS_KEY,
    edg_store_secret_key: process.env.EDGE_STORE_SECRET_KEY,
};

