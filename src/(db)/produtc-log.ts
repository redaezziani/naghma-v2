'use server';

import { prisma } from "@/(secrets)/secrets";

/*
  id            String   @id @default(uuid()) @db.VarChar(36)
  stock_initial Int
  produit    Produit_Final @relation(fields: [produit_id], references: [id])
  produit_id String //المنتج
  production    Int
  ventes        Int
  retours       Int
  stock_final   Int
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
}
*/


interface IProduitLog {
    produit_id: string;
    production: number;
}
export const createProduitLog = async (data: IProduitLog) => {
    try {
        const { produit_id, production } = data;
        // get just the quantity of the product
        const stock_initial = await prisma.produit_Final.findUnique({
            where: {
                id: produit_id
            },
            select: {
                quantite: true
            }
        });
        if (!stock_initial) {
            return { status: 'error', message: 'المنتج غير موجود' };
        }
        // get the product return if exists
        const  retours = await prisma.retorn_logs.findFirst({
            where: {
                produit_id
            },
            select: {
                quantite: true
            }
        });
        
        const vents = await prisma.produit_sell.findMany({
            where: {
                produit_id
            },
            select: {
                quantite: true
            }
        });
        let ventes = 0;
        vents.forEach((vent) => {
            ventes += vent.quantite;
        });
        const stock_final = stock_initial.quantite + production + (retours?.quantite || 0) - ventes;
        
        const produitLog = await prisma.produit_Final_logs.create({
            data: {
                stock_initial: stock_initial.quantite,
                stock_final,
                production,
                retours: retours?.quantite || 0,
                produit_id,
                ventes

            }
        });
        if (!produitLog) {
            return { status: 'error', message: 'لم يتم إنشاء سجل المنتج' };
        }
        return { status: 'success', message: 'تم إنشاء سجل المنتج بنجاح', data: produitLog };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}