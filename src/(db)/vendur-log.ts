'use server';
import { prisma } from "@/(secrets)/secrets";


interface IVendur_log {
    vendur_id: string;
    produit_id: string;
    quantite: number;
    prix: number;
    prix_a_paye: number;
}

export const createVendur_log = async (data: IVendur_log) => {
    try {

        const checkProduct = await prisma.produit_Final.findUnique({
            where: {
                id: data.produit_id
            }
        });
        if (!checkProduct) {
            return { status: 'error', message: 'المنتج غير موجود' };
        }
        if (checkProduct.quantite < data.quantite) {
            return { status: 'error', message: 'الكمية المطلوبة غير متوفرة' };
        }

        const vendur_log = await prisma.vente_logs.create({
            data: {
                vendur_id: data.vendur_id,
                produit_id: data.produit_id? data.produit_id : '',
                quantite: data.quantite? data.quantite : 0,
                prix: checkProduct.prix_vente,
            }
        });
        if (!vendur_log) {
            return { status: 'error', message: 'لم يتم إنشاء سجل البيع' };
        }

        // lets update the vendur
        const vendur = await prisma.vendur.update({
            where: {
                id: data.vendur_id
            },
            data: {
                le_prix_a_paye: {
                    increment: checkProduct.prix_vente*data.quantite
                }
            
            }
        });
        const produit = await prisma.produit_Final.update({
            where: {
                id: data.produit_id
            },
            data: {
                quantite: {
                    decrement: data.quantite // this is mean quantite = quantite - data.quantite
                }
            }
        });

        if (!produit) {
            return { status: 'error', message: 'لم يتم تحديث المنتج' };
        }
        // check if is already sold to the vendur
        const checkIfAlreadySold = await prisma.produit_sell.findFirst({
            where: {
                produit_id: data.produit_id,
                vendur_id: data.vendur_id
            }
        });
        if (checkIfAlreadySold) {
            // lets update the product
            const produit_sell = await prisma.produit_sell.update({
                where: {
                    id: checkIfAlreadySold.id
                },
                data: {
                    quantite: {
                        increment: data.quantite
                    }
                }
            });
            if (!produit_sell) {
                return { status: 'error', message: 'لم يتم تحديث سجل البيع' };
            }
            return { status: 'success', message: 'تم تحديث سجل البيع بنجاح', data: vendur_log };
        }
        // if the is already sold to the vendur update the product quantity
        
        const produit_sell = await prisma.produit_sell.create({
            data: {
                produit_id: data.produit_id,
                vendur_id: data.vendur_id,
                quantite: data.quantite,
                prix: checkProduct.prix_vente
            }
        });

        if (!produit_sell) {
            return { status: 'error', message: 'لم يتم إنشاء سجل البيع' };
        }

        return { status: 'success', message: 'تم إنشاء سجل البيع بنجاح', data: vendur_log };
    } catch (error: any) {
        console.error(error);
    }
}

