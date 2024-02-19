'use server';
import { prisma } from "@/(secrets)/secrets";

export const createVendur = async (nom:string) => {
    try {
        const vendur = await prisma.vendur.create({
            data: {
                nom
            }
        });
        if (!vendur) {
            return { staus : 'error', message: 'لم يتم إنشاء البائع' };
        }
        return { status: 'success', message: 'تم إنشاء البائع بنجاح', data: vendur };
       
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export const getVendurs = async () => {
    try {
        const vendurs = await prisma.vendur.findMany();
        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }
        const vendursWithBalance = vendurs.map((vendur: any) => {
            return {
                ...vendur,
                balance: vendur.le_prix_a_payer - vendur.le_prix_a_paye + vendur.frais_de_prix
            }
        });

        // total price for all vendurs
        const total_price = vendurs.reduce((acc: number, vendur: any) => acc + vendur.le_prix_a_payer, 0);
        return { status: 'success', message: 'تم العثور على البائعين بنجاح', data: vendursWithBalance , total_price };   
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteVendur = async (id: string) => {
    try {
        const vendur = await prisma.vendur.delete({
            where: {
                id
            }
        });
        if (!vendur) {
            return { status: 'error', message: 'لم يتم حذف البائع' };
        }
        return { status: 'success', message: 'تم حذف البائع بنجاح' };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}