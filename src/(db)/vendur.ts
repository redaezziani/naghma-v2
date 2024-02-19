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