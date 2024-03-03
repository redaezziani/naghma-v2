"use server";
import { prisma } from "@/(secrets)/secrets";

export const getEarningsByMonth = async () => {
    try {
        const vendurs = await prisma.vendur.findMany({
            include: {
                produit_sell: true
            }
        });

        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }
        //@ts-ignore
        let earningsByMonth = []; 

        vendurs.forEach(vendur => {
            vendur.produit_sell.forEach(product => {
                const date = new Date(product.created_at);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                //@ts-ignore
                const existingEntry = earningsByMonth.find(entry => entry.month === month && entry.year === year);

                if (existingEntry) {
                    existingEntry.totalEarnings += product.prix * product.quantite;
                } else {
                    earningsByMonth.push({
                        month: month,
                        year: year,
                        totalEarnings: product.prix * product.quantite
                    });
                }
            });
        });
        //@ts-ignore
        return { status: 'success', message: 'تم العثور على الأرباح بنجاح', data: earningsByMonth };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'حدث خطأ أثناء جلب البيانات' };
    } finally {
        await prisma.$disconnect();
    }
};


export const getEarningsOfCurrentMonth = async () => {
    try {
        const vendurs = await prisma.vendur.findMany({
            include: {
                produit_sell: true
            }
        });

        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }
        //@ts-ignore
        let earnings = 0; 

        vendurs.forEach(vendur => {
            vendur.produit_sell.forEach(product => {
                const date = new Date(product.created_at);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const currentMonth = new Date().getMonth() + 1;
                const currentYear = new Date().getFullYear();
                if (month === currentMonth && year === currentYear) {
                    earnings += product.prix * product.quantite;
                }
            });
        });
        //@ts-ignore
        return { status: 'success', message: 'تم العثور على الأرباح بنجاح', data: earnings };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'حدث خطأ أثناء جلب البيانات' };
    } finally {
        await prisma.$disconnect();
    }
};


export const getLossesReturnOfCurrentMonth = async () => {
    try {
        const losses = await prisma.loss.findMany();
        if (!losses || losses.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على الخسائر' };
        }

        let totalLosses = 0;
        let curent = new Date().getMonth() + 1;
        losses.forEach(loss => {
            const date = new Date(loss.created_at);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            if (month === currentMonth && year === currentYear) {

                totalLosses += loss.prix;
            }
        });
        //@ts-ignore
        return { status: 'success', message: 'تم العثور على الخسائر بنجاح', data: totalLosses.toFixed(2) };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'حدث خطأ أثناء جلب البيانات' };
    } finally {
        await prisma.$disconnect();
    }
};

export const getTotalVendursFraisByMonth = async () => {
    try {
        const vendurs = await prisma.vendur.findMany();

        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }

        let totalExpenses = 0;
        let curent = new Date().getMonth() + 1;
        vendurs.forEach(vendur => {
            const date = new Date(vendur.updated_at);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            if (month === currentMonth && year === currentYear) {
                totalExpenses += vendur.frais_de_prix;
            }
        });
        return { status: 'success', message: 'تم العثور على النفقات بنجاح', data: totalExpenses };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'حدث خطأ أثناء جلب البيانات' };
    } finally {
        await prisma.$disconnect();
    }
}