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
        return { status: 'success', message: 'تم العثور على البائعين بنجاح', data: vendursWithBalance };        
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}