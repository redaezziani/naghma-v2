'use server';
import { prisma } from "@/(secrets)/secrets";

interface IProduit {
    nom: string;
    prix_vente: number;
    quantite: number;
}

export const createProduit = async (data: IProduit) => {
    try {

        const produit = await prisma.produit_Final.create({
            data: {
                nom: data.nom,
                prix_vente: data.prix_vente,
                quantite: data.quantite
            }
        });
        if (!produit) {
            return { status: 'error', message: 'لم يتم إنشاء المنتج' };
        }
        return { status: 'success', message: 'تم إنشاء المنتج بنجاح', data: produit };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}


export const getProduits = async () => {
    try {
        const produits = await prisma.produit_Final.findMany();
        if (produits.length === 0) {
            return { status: 'error', message: 'لا يوجد منتجات' };
        }
        let total = 0;
        produits.forEach((produit) => {
            total += produit.prix_vente * produit.quantite;
        });

        return { status: 'success', data: produits , total_price: total};
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteProduit = async (id: string) => {
    try {
        const produit = await prisma.produit_Final.delete({
            where: {
                id: id
            }
        });
        if (!produit) {
            return { status: 'error', message: 'لم يتم حذف المنتج' };
        }
        return { status: 'success', message: 'تم حذف المنتج بنجاح' };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}
// return just the name and id of the produit
export const getAllProduits = async () => {
    try {
        const produits = await prisma.produit_Final.findMany({
            select: {
                id: true,
                nom: true
            }
        });
        if (produits.length === 0) {
            return { status: 'error', message: 'لا يوجد منتجات' };
        }
        return { status: 'success', data: produits };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}