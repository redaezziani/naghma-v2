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