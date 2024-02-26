"use server";
import { prisma } from "@/(secrets)/secrets";

// Function to get the earnings by month for the company
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
        let earningsByMonth = []; // Array to store earnings data for all months

        vendurs.forEach(vendur => {
            vendur.produit_sell.forEach(product => {
                const date = new Date(product.created_at);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                // Check if there's an entry for the month in earningsByMonth
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

// of the current month for the company but menus the frais_

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
        let earnings = 0; // Variable to store earnings data for the current month

        vendurs.forEach(vendur => {
            vendur.produit_sell.forEach(product => {
                const date = new Date(product.created_at);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                if (month === new Date().getMonth() + 1 && year === new Date().getFullYear()) {
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

// Function to get the losses by month for this company current month

export const getLossesReturnOfCurrentMonth = async () => {
    try {
        const losses = await prisma.loss.findMany();
        if (!losses || losses.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على الخسائر' };
        }

        // Variable to store losses data for the current month
        let totalLosses = 0;
        let curent = new Date().getMonth() + 1;
        losses.forEach(loss => {
            const date = new Date(loss.created_at);
            const month = date.getMonth() + 1;
            if (month === curent) {
                totalLosses += loss.prix;
            }
        });
        //@ts-ignore
        return { status: 'success', message: 'تم العثور على الخسائر بنجاح', data: totalLosses };
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

        // Variable to store expenses data for the current month
        let totalExpenses = 0;
        let curent = new Date().getMonth() + 1;
        vendurs.forEach(vendur => {
            const date = new Date(vendur.created_at);
            const month = date.getMonth() + 1;
            if (month === curent) {
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