'use server';

import { prisma } from "@/(secrets)/secrets";
import { verifyToken } from "./resnd/core";

interface IProduitLog {
    produit_id: string;
    production: number;
}
export const createProduitLog = async (data: IProduitLog) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const { produit_id, production } = data;
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
        const updatedProduct = await prisma.produit_Final.update({
            where: {
                id: produit_id
            },
            data: {
                quantite: {
                    increment: production 
                }
            }
        });
            
        
        return { status: 'success', message: 'تم إنشاء سجل المنتج بنجاح', data: produitLog };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}