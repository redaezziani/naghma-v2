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
        if (data.quantite === 0 || data.prix === 0 || data.prix_a_paye === 0 || data.vendur_id === '' || data.produit_id === '') {
            return { status: 'error', message: 'الرجاء ملئ جميع الحقول' };
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
                produit_id: data.produit_id,
                quantite: data.quantite,
                prix: data.prix,
                prix_a_paye: data.prix_a_paye
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
                    increment: data.prix_a_paye * data.quantite
                }
                
            }
        });
        if(data.prix_a_paye > 0){
            const vendur = await prisma.vendur.update({
                where: {
                    id: data.vendur_id
                },
                data: {
                    le_prix_a_payer: {
                        increment: data.prix_a_paye
                    }
                }
            });
        }

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

        return { status: 'success', message: 'تم إنشاء سجل البيع بنجاح', data: vendur_log };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}
