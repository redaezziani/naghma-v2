'use server';
import { prisma } from "@/(secrets)/secrets";
import { revalidatePath } from "next/cache";
import { verifyToken } from "./resnd/core";

export const createVendur = async (nom: string) => {
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
            return { staus: 'error', message: 'لم يتم إنشاء البائع' };
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

        const product_sell = await prisma.produit_sell.findMany();

        // Create a map to store the total quantity sold for each vendor
        const vendurTotalQuantitySoldMap = new Map();

        // Calculate the total quantity sold for each vendor
        for (const product of product_sell) {
            const vendurId = product.vendur_id;
            const quantitySold = product.quantite;

            if (vendurTotalQuantitySoldMap.has(vendurId)) {
                vendurTotalQuantitySoldMap.set(vendurId, vendurTotalQuantitySoldMap.get(vendurId) + quantitySold);
            } else {
                vendurTotalQuantitySoldMap.set(vendurId, quantitySold);
            }
        }

        // Sort vendurs by total quantity sold using the vendurTotalQuantitySoldMap
        vendurs.sort((a, b) => {
            const totalQuantitySoldA = vendurTotalQuantitySoldMap.get(a.id) || 0;
            const totalQuantitySoldB = vendurTotalQuantitySoldMap.get(b.id) || 0;
            return totalQuantitySoldB - totalQuantitySoldA;
        });

        // Add rank to each vendor
        vendurs.forEach((vendur, index) => {
            //@ts-ignore
            vendur.rank = index + 1;
        });

        // total price for all vendurs
        const total_price = vendurs.reduce((acc, vendur) => acc + vendur.le_prix_a_payer, 0);

        return { status: 'success', message: 'تم العثور على البائعين بنجاح', data: vendurs, total_price };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'حدث خطأ أثناء جلب البائعين' };
    } finally {
        await prisma.$disconnect();
    }
};



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

export const getVendurById = async (id: string, date = new Date()) => {
    try {

        const year = date.getFullYear();
        const month = date.getMonth();

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        const vendur = await prisma.vendur.findUnique({
            where: {
                id
            },
            include: {
                produit_sell: {
                    where: {
                        created_at: {
                            gte: startDate,
                            lt: endDate
                        }
                    }
                },
                prix_a_paye: {
                    where: {
                        created_at: {
                            gte: startDate,
                            lt: endDate
                        }
                    }
                },
                Vente_logs: {
                    where: {
                        created_at: {
                            gte: startDate,
                            lt: endDate
                        }
                    }
                },
                loss: {
                    where: {
                        created_at: {
                            gte: startDate,
                            lt: endDate
                        }
                    }
                },
            }
        });
        if (!vendur) {
            return { status: 'error', message: 'لم يتم العثور على البائع' };
        }
        const frais = await prisma.frais_de_prix.findMany({
            where: {
                vendur_id: id,
                created_at: {
                    gte: startDate,
                    lt: endDate
                }
            },
        });

        const total_sell_price = vendur.produit_sell.reduce((acc: number, product: any) => acc + product.prix * product.quantite, 0);
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
                id:payment.id
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
                    date: sale.created_at
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
                    date: loss.created_at
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
            },
            
        });
        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }
        const vendursWithTotalSellPrice = vendurs.map((vendur: any) => {
            const total_sell_price = vendur.produit_sell.reduce((acc: number, product: any) => {
                const date = new Date(product.created_at);
                if (date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
                    return acc + product.prix * product.quantite;
                }
                return acc;
            }, 0);
            return {
                ...vendur,
                total_sell_price
            };
        });
        return { status: 'success', message: 'تم العثور على البائعين بنجاح', data: vendursWithTotalSellPrice };

    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
};


export const menusPayments = async (id: string) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const payment = await prisma.prix_a_paye.delete({
            where: {
                id:id
            }
        });
        if (!payment) {
            return { status: 'error', message: 'لم يتم العثور على الدفعة' };
        }
        const vendur = await prisma.vendur.findUnique({
            where: {
                id: payment.vendur_id
            }
        });
        if (!vendur) {
            return { status: 'error', message: 'لم يتم العثور على البائع' };
        }
        const total_price = vendur.le_prix_a_payer - payment.prix;
        const updateVendur = await prisma.vendur.update({
            where: {
                id: vendur.id
            },
            data: {
                le_prix_a_payer: total_price
            }
        });
        if (!updateVendur) {
            return { status: 'error', message: 'لم يتم تحديث البائع' };
        }

        return { status: 'success', message: 'تم حذف الدفعة بنجاح' };

    } catch (error) {
        console.log(error)
    }
    finally
    {
        await prisma.$disconnect()
    }
}
