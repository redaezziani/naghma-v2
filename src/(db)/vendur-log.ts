'use server';
import { prisma } from "@/(secrets)/secrets";
import { verifyToken } from "./resnd/core";


interface IVendur_log {
    vendur_id: string;
    produit_id: string;
    quantite: number;
    prix: number;
    prix_a_paye: number;
}

export const createVendur_log = async (data: IVendur_log) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const getVendure = await prisma.vendur.findUnique({
            where: {
                id: data.vendur_id
            }
        });
        if (!getVendure) {
            return { status: 'error', message: 'البائع غير موجود' };
        }
        
        let current_date = new Date();
        let year = current_date.getFullYear();
        let mounth = current_date.getMonth();
        // we nade to rest the vendur balance every mounth when the day is 2 of the mounth
        let day = current_date.getDate();
        let vendur_date = new Date(getVendure.updated_at);
        let vendur_year = vendur_date.getFullYear();
        let vendur_mounth = vendur_date.getMonth();
        if (year !== vendur_year || mounth !== vendur_mounth   && day === 2) {
            const vendur = await prisma.vendur.update({
                where: {
                    id: data.vendur_id
                },
                data: {
                    le_prix_a_paye: getVendure.le_prix_a_paye - getVendure.le_prix_a_payer - getVendure.frais_de_prix,
                    frais_de_prix: 0,
                    le_prix_a_payer: 0
                }
            });
            if (!vendur) {
                return { status: 'error', message: 'لم يتم تحديث البائع' };
            }
        }
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
                    decrement: data.quantite 
                }
            }
        });

        if (!produit) {
            return { status: 'error', message: 'لم يتم تحديث المنتج' };
        }
        const checkIfAlreadySold = await prisma.produit_sell.findFirst({
            where: {
                produit_id: data.produit_id,
                vendur_id: data.vendur_id
            }
        });
        if (checkIfAlreadySold) {
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

