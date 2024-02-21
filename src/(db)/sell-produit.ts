"use server";

import { prisma } from "@/(secrets)/secrets";


export const getSellsByVendur = async (vendur_id: string) => {
    try {
        const sells = await prisma.produit_sell.findMany({
            where: {
                vendur_id,
            },
            include: {
                produit: true
            }
        });
        if (!sells) {
            return {
                status: 'error',
                message: 'لم يتم العثور على المبيعات'
            };
        }

        if (sells.length === 0) {
            return {
                status: 'error',
                message: 'لم يتم العثور على المبيعات'
            };
        }
        
        return {
            status: 'success',
            message: 'تم جلب المبيعات بنجاح',
            data: sells
        };
    } catch (error) {
        console.error(error);
    }
}