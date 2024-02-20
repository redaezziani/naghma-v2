'use server';
import { prisma } from "@/(secrets)/secrets";
import { revalidatePath } from "next/cache";

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
                balance: vendur.le_prix_a_paye  - vendur.le_prix_a_payer - vendur.frais_de_prix
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
export const getAllVendurs = async () => {
    try {
        revalidatePath('/dashboard/vendor/');
        const vendurs = await prisma.vendur.findMany({
            select: {
                id: true,
                nom: true
            }
        });
        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }
        return { status: 'success', message: 'تم العثور على البائعين بنجاح', data: vendurs };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

// lets get the vendur by id and how much the amount that he take every day
export const getVendurById = async (id: string) => {
    try {
        const vendur_log = await prisma.vente_logs.findMany({
            where: {
                id
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        const vendur_log_with_date = vendur_log.map((vendur: any) => {
            return {
                date: vendur.created_at,
                amount: vendur.prix_a_paye
            }
        });
        // now lets group the amount by date
        const vendur_log_grouped = vendur_log_with_date.reduce((acc: any, vendur: any) => {
            if (!acc[vendur.date]) {
                acc[vendur.date] = 0;
            }
            acc[vendur.date] += vendur.amount;
            return acc;
        }, {});
        
        return { status: 'success', message: 'تم العثور على البائع بنجاح', data: vendur_log_grouped };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}