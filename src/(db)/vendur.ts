'use server';
import { prisma } from "@/(secrets)/secrets";
import { revalidatePath } from "next/cache";
import { verifyToken } from "./resnd/core";

export const createVendur = async (nom:string) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
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
        // delete the vendur and all the related data on cascade to avoid any conflicts
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const sells = await prisma.produit_sell.deleteMany({
            where: {
                vendur_id: id
            }
        });
        const logs = await prisma.vente_logs.deleteMany({
            where: {
                vendur_id: id
            }
        });
        const prix = await prisma.prix_a_paye.deleteMany({
            where: {
                vendur_id: id
            }
        });
        const frais = await prisma.frais_de_prix.deleteMany({
            where: {
                vendur_id: id
            }
        });
        const loss = await prisma.loss.deleteMany({
            where: {
                vendur_id: id
            }
        });
        const return_logs = await prisma.retorn_logs.deleteMany({
            where: {
                vendur_id: id
            }
        });
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

export const getVendurById = async (id: string) => {
    try {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear(); 
        const day = date.getDate();
        // get the produit sell for the current month and prix_a_paye and vente_logs and loss
        // i want to get the data from the the previous month from day 2 to the current month day 1
        const vendur = await prisma.vendur.findUnique({
            where: {
                id
            },
            include: {
                produit_sell: true,
                prix_a_paye: true,
                Vente_logs: true,
                loss: true
            }
        });

        if (!vendur) {
            return { status: 'error', message: 'لم يتم العثور على البائع' };
        }
        const frais = await prisma.frais_de_prix.findMany({
            where: {
                vendur_id: id,
            },
        });

        const total_sell_price = vendur.produit_sell.reduce((acc: number, product: any) => acc + product.prix*product.quantite, 0);
        const total_sell_quantity = vendur.produit_sell.reduce((acc: number, product: any) => acc + product.quantite, 0);
        const total_loss_price = vendur.loss.reduce((acc: number, loss: any) => acc + loss.prix, 0);
        const vendur_info = {
            id: vendur.id,
            nom: vendur.nom,
            le_prix_a_payer: vendur.le_prix_a_payer,
            le_prix_a_paye: vendur.le_prix_a_paye,
            frais_de_prix: vendur.frais_de_prix,
            balance: vendur.le_prix_a_paye - vendur.le_prix_a_payer - vendur.frais_de_prix,
            total_sell_price,
            total_sell_quantity,
            total_loss_price

        };
       
        const data = {
            vendur: vendur_info,
            payments: vendur.prix_a_paye.map(payment => ({
                type: payment.type, 
                price: payment.prix,
                date: payment.created_at,
            })),
            sales: await Promise.all(vendur.Vente_logs.map(async sale => {
                const productName = await prisma.produit_Final.findUnique({
                    where: {
                        id: sale.produit_id,
                    },
                    select: {
                        nom: true
                    }
                });
                return {
                    productName: productName?.nom,
                    quantity: sale.quantite,
                    price: sale.prix,
                    date :sale.created_at


                };
            }
            )),
            losses: await Promise.all(vendur.loss.map(async loss => {
                const productName = await prisma.produit_Final.findUnique({
                    where: {
                        id: loss.produit_id,
                    },
                    select: {
                        nom: true
                    }
                });

                return {
                    productName: productName?.nom,
                    quantity: loss.quantite,
                    price: loss.prix,
                    date :loss.created_at
                };
            })),
            frais: frais
        };

        return { status: 'success', message: 'تم العثور على البائع بنجاح', data };
    } catch (error: any) {
        console.error(error);
        return { status: 'error', message: 'حدث خطأ ما أثناء جلب البيانات' };
    } finally {
        await prisma.$disconnect();
    }
};


// function to get all vendurs with the total sell price
export const getVendursWithTotalSellPrice = async () => {
    try {
        // get just for the current month
        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();
        const vendurs = await prisma.vendur.findMany({
            include: {
                produit_sell: true
            }
        });
        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }
        const vendursWithTotalSellPrice = vendurs.map((vendur: any) => {
            const total_sell_price = vendur.produit_sell.reduce((acc: number, product: any) => {
                const date = new Date(product.created_at);
                if (date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
                    return acc + product.prix*product.quantite;
                }
                return acc;
            }, 0);
            return {
                ...vendur,
                total_sell_price
            };
        });
        console.log(vendursWithTotalSellPrice);
        return { status: 'success', message: 'تم العثور على البائعين بنجاح', data: vendursWithTotalSellPrice };

    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
};

