'use server';
import { prisma } from "@/(secrets)/secrets";
import { verifyToken } from "./resnd/core";

interface IProduit {
    nom: string;
    prix_vente: number;
    quantite: number;
}

export const createProduit = async (data: IProduit) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const checkProduct = await prisma.produit_Final.findFirst({
            where: {
                nom: data.nom.toLowerCase()
            }
        });
        if (checkProduct) {
            const produit = await prisma.produit_Final.update({
                where: {
                    id: checkProduct.id
                },
                data: {
                    quantite: {
                        increment: data.quantite
                    }
                }
            });
            if (!produit) {
                return { status: 'error', message: 'لم يتم تحديث المنتج' };
            }
            return { status: 'success', message: 'تم تحديث المنتج بنجاح', data: produit };
        }   
        const produit = await prisma.produit_Final.create({
            data: {
                nom: data.nom.toLowerCase(),
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
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
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
export const getAllProduits = async () => {
    try {
        const products = await prisma.produit_Final.findMany({
            where: {
                quantite: {
                    gt: 0
                }
            },
            orderBy: {
                created_at: 'asc',
            },
            
        });

        const productMap = new Map<string, any>();
        products.forEach(product => {
            if (!productMap.has(product.nom)) {
                productMap.set(product.nom, product);
            }
        });
        return { status: 'success', data: Array.from(productMap.values()) };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export const getProduit = async (id: string) => {
    try {
        const produit = await prisma.produit_Final.findFirst({
            where: {
                id: id
            }
        });
        if (!produit) {
            return { status: 'error', message: 'لم يتم العثور على المنتج' };
        }
        return { status: 'success', data: produit };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

interface IUpdateProduit {
    prix_vente: number;
    nom: string;
}


export const updateProduit = async (id: string, data: IUpdateProduit) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const produit = await prisma.produit_Final.update({
            where: {
                id: id
            },
            data: {
                prix_vente: Number(data.prix_vente),
                nom: data.nom.toLowerCase()
            }
        });
        if (!produit) {
            return { status: 'error', message: 'لم يتم تحديث السعر' };
        }
        return { status: 'success', message: 'تم تحديث السعر بنجاح', data: produit };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

