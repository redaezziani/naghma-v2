import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

export const prisma = new PrismaClient()


export const secrets = {
    jwtSecret: process.env.JWT_SECRET ?? 'secret',
    resendSecret: process.env.RESEND_TOKEN_SECRET ?? 'secret',
    edg_store_access_key: process.env.EDGE_STORE_ACCESS_KEY ?? 'secret',
    edg_store_secret_key: process.env.EDGE_STORE_SECRET_KEY,
    store_name: process.env.STORE_NAME,
};

