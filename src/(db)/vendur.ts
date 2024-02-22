'use server';
import { prisma } from "@/(secrets)/secrets";
import { revalidatePath } from "next/cache";
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

        const vendur_info = {
            id: vendur.id,
            nom: vendur.nom,
            le_prix_a_payer: vendur.le_prix_a_payer,
            le_prix_a_paye: vendur.le_prix_a_paye,
            frais_de_prix: vendur.frais_de_prix,
            balance: vendur.le_prix_a_paye - vendur.le_prix_a_payer - vendur.frais_de_prix
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours to 0 for start of the day

        const data = {
            vendur: vendur_info,
            payments: vendur.prix_a_paye.map(payment => ({
                type: payment.type, 
                price: payment.prix,
                date: payment.created_at
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
            }))
        };

        return { status: 'success', message: 'تم العثور على البائع بنجاح', data };
    } catch (error: any) {
        console.error(error);
        return { status: 'error', message: 'حدث خطأ ما أثناء جلب البيانات' };
    } finally {
        await prisma.$disconnect();
    }
};
