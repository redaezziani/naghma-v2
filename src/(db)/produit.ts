'use server';
import { prisma } from "@/(secrets)/secrets";

interface IProduit {
    nom: string;
    prix_vente: number;
    quantite: number;
}

export const createProduit = async (data: IProduit) => {
    try {
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
        const products = await prisma.produit_Final.findMany({
            orderBy: {
                created_at: 'asc',
            },
        });

        // Create a map to store products grouped by name
        const productMap = new Map<string, any>();

        // Group products by name
        products.forEach(product => {
            if (!productMap.has(product.nom)) {
                productMap.set(product.nom, product);
            }
        });

        // Iterate through the products
        for (const [name, product] of Array.from(productMap)) {
            // Check if the product has a quantity of 0
            if (product.quantite === 0) {
                // Delete the product with quantity 0
                await prisma.produit_Final.delete({
                    where: {
                        id: product.id,
                    },
                });

                // Remove the product from the map
                productMap.delete(name);

                const nextProduct = products.find(p => p.nom === name && p.quantite > 0);
                if (nextProduct) {
                    productMap.set(name, nextProduct);
                }
            }
        }

        // Return the products
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




export const updateProduit = async (id: string, data: IProduit) => {
    try {
        // check if  the data is here 
        if (!data.nom || !data.prix_vente || !data.quantite) {
            return { status: 'error', message: 'الرجاء إدخال جميع البيانات' };
        }
        
        const produit = await prisma.produit_Final.update({
            where: {
                id: id
            },
            data: {
                nom: data.nom.toLowerCase(),
                prix_vente: data.prix_vente,
                quantite: data.quantite
            }
        });
        if (!produit) {
            return { status: 'error', message: 'لم يتم تحديث المنتج' };
        }
        return { status: 'success', message: 'تم تحديث المنتج بنجاح', data: produit };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export const updateProduitQuantity = async (id: string, quantity: number) => {
    try {
        const produit = await prisma.produit_Final.update({
            where: {
                id: id
            },
            data: {
                quantite: quantity
            }
        });
        if (!produit) {
            return { status: 'error', message: 'لم يتم تحديث الكمية' };
        }
        return { status: 'success', message: 'تم تحديث الكمية بنجاح', data: produit };
    } catch (error: any) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export const updateProduitPrice = async (id: string, price: number) => {
    try {
        const produit = await prisma.produit_Final.update({
            where: {
                id: id
            },
            data: {
                prix_vente: price
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

