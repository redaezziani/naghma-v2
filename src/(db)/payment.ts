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

export const prix_a_paye = async (data: any) => {
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


export const frais_de_prix = async (data: any) => {
    try {
        const { vendur_id, prix } = data;
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
                prix
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