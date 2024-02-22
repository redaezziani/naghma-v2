'use server';
import { prisma } from "@/(secrets)/secrets";
/*
model Produit_Final {
    id        String   @id @default(uuid()) @db.VarChar(36)
    nom       String
    prix_vente Float
    quantite  Int
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
//الموزع
model Vendur {
    id String @id @default(uuid()) @db.VarChar(36)
    nom String
    le_prix_a_payer Float @default(0)//المستحقات
    le_prix_a_paye Float @default(0) //المدفوعات
    frais_de_prix Float @default(0) //المصاريف
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
//المنتج الاولي المباع
model Matiere_Premiere_logs {
    id String @id @default(uuid()) @db.VarChar(36)
    stock_initial Int
    consomation Int
    achat Int 
    ventes Int 
    offres Int
    retours Int
    stock_final Int
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
//المنتج النهائي المباع
model Produit_Final_logs {
    id String @id @default(uuid()) @db.VarChar(36)
    stock_initial Int
    production Int
    ventes Int 
    retours Int
    changes Int
    stock_final Int
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
//جدول المبيعات
model Vente_logs {
    id String @id @default(uuid()) @db.VarChar(36)
    vendur_id String//الموزع
    produit_id String//المنتج
    quantite Int//الكمية
    prix Float//السعر
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
//المنتجات التي بيعت لكل موزع
model produit_sell {
    id String @id @default(uuid()) @db.VarChar(36)
    produit_id String//المنتج
    vendur_id String//الموزع
    quantite Int//الكمية  
    prix Float//السعر
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
//جدول دفع المستحقات
model prix_a_paye {
    id String @id @default(uuid()) @db.VarChar(36)
    vendur_id String//الموزع
    type String//النوع
    prix Float//المبلغ
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
//جدول المصاريف لكل موزع
model frais_de_prix {
    id String @id @default(uuid()) @db.VarChar(36)
    vendur_id String//الموزع
    prix Float//المبلغ
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}

//الخسائر المترتة عن ارجاع المنتوج ناقصا
model loss {
    id String @id @default(uuid()) @db.VarChar(36)
    vendur_id String//الموزع
    prix Float//المبلغ
    produit_id String//المنتج
    quantite Int//الكمية
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
}
*/
interface payment {
    vendur_id: string,
    prix: number,
    type: string
}
export const prix_a_paye = async (data: payment) => {
    try {
        const { vendur_id, prix , type } = data;
        const vendur = await prisma.vendur.findUnique({
            where: {
                id: vendur_id
            }
        });
        if (!vendur) {
            return { status: 'error', message: 'الموزع غير موجود' };
        }

        const prix_paye = await prisma.prix_a_paye.create({
            data: {
                vendur_id,
                prix,
                type
            }
        });
        if (!prix_paye) {
            return { status: 'error', message: 'لم يتم إضافة المبلغ' };
        }
        
        const updateVendur = await prisma.vendur.update({
            where: {
                id: vendur_id
            },
            data: {
                le_prix_a_payer: {
                    increment: prix // this is mean le_prix_a_payer = le_prix_a_payer + prix
                }
            }
        });
        if (!updateVendur) {
            return { status: 'error', message: 'لم يتم تحديث الموزع' };
        }

        return { status: 'success', message: 'تم إضافة المبلغ بنجاح' };
    } catch (error: any) {
        console.error(error);   
    }
}
interface frais_de_prix {
    vendur_id: string,
    prix: number
    type : string
}
export const frais_de_prix = async (data: frais_de_prix) => {
    try {
        const { vendur_id, prix, type } = data;
        const vendur = await prisma.vendur.findUnique({
            where: {
                id: vendur_id
            }
        });
        if (!vendur) {
            return { status: 'error', message: 'الموزع غير موجود' };
        }

        const frais = await prisma.frais_de_prix.create({
            data: {
                vendur_id,
                prix,
                type
            }
        });
        if (!frais) {
            return { status: 'error', message: 'لم يتم إضافة المصاريف' };
        }
        
        const updateVendur = await prisma.vendur.update({
            where: {
                id: vendur_id
            },
            data: {
                frais_de_prix: {
                    increment: prix // this is mean frais_de_prix = frais_de_prix + prix
                }
            }
        });
        if (!updateVendur) {
            return { status: 'error', message: 'لم يتم تحديث الموزع' };
        }

        return { status: 'success', message: 'تم إضافة المصاريف بنجاح' };
    } catch (error: any) {
        console.error(error);   
    }
}

// make  A function for the return fra
interface return_fra {
    vendur_id: string,
    produit_id: string,
    quantite_attendue_retourner: number,
    quantite_reel_retourner: number
}
export const paid_by_return = async (data: return_fra) => {
    try {
        const { vendur_id, produit_id,quantite_attendue_retourner,quantite_reel_retourner } = data;
        if (quantite_reel_retourner > quantite_attendue_retourner) {
            return { status: 'error', message: 'الكمية المدفوعة أكبر من الكمية المطلوبة' };
        }
        const vendur = await prisma.vendur.findUnique({
            where: {
                id: vendur_id
            }
        });
        if (!vendur) {
            return { status: 'error', message: 'الموزع غير موجود' };
        }
        const produit = await prisma.produit_Final.findUnique({
            where: {
                id: produit_id
            }
        });
        if (!produit) {
            return { status: 'error', message: 'المنتج غير موجود' };
        }
        const produit_sell = await prisma.produit_sell.findFirst({
            where: {
                vendur_id,
                produit_id
            }
        });
        if (!produit_sell) {
            return { status: 'error', message: 'لم يتم العثور على المنتج' };
        }
        if (produit_sell.quantite < quantite_attendue_retourner) {
            return { status: 'error', message: 'الكمية المطلوبة أكبر من الكمية المباعة' };
        }

        const update_produit_sell = await prisma.produit_sell.update({
            where: {
                id: produit_sell.id
            },
            data: {
                quantite: {
                    decrement: quantite_attendue_retourner
                }
            }
        });
        if (!update_produit_sell) {
            return { status: 'error', message: 'لم يتم تحديث المنتج' };
        }
        const update_produit = await prisma.produit_Final.update({
            where: {
                id: produit_id
            },
            data: {
                quantite: {
                    increment: quantite_attendue_retourner
                }
            }
        });
        const loss = quantite_attendue_retourner - quantite_reel_retourner;
        if (loss > 0) {
            const loss_data = {
                vendur_id,
                prix: loss * produit.prix_vente,
                produit_id,
                quantite: loss
            }
            const add_loss = await prisma.loss.create({
                data: loss_data
            });
            if (!add_loss) {
                return { status: 'error', message: 'لم يتم إضافة الخسارة' };
            }
        }
        const prix_paye = await prisma.prix_a_paye.create({
            data: {
                vendur_id,
                prix: quantite_reel_retourner * produit.prix_vente,
                type: 'return'
            }
        });
        if (!prix_paye) {
            return { status: 'error', message: 'لم يتم إضافة المبلغ' };
        }

        const updateVendur = await prisma.vendur.update({
            where: {
                id: vendur_id
            },
            data: {
                le_prix_a_paye: {
                    decrement: quantite_reel_retourner * produit.prix_vente // this is mean le_prix_a_paye = le_prix_a_paye + quantite_reel_retourner * produit.prix_vente
                }

            }
        });
        if (!updateVendur) {
            return { status: 'error', message: 'لم يتم تحديث الموزع' };
        }

        return { status: 'success', message: 'تم إضافة المبلغ بنجاح' };

    } catch (error: any) {
        console.error(error);   
    }
}
