'use server';
import { prisma } from "@/(secrets)/secrets";
import { verifyToken } from "./resnd/core";

type external_expense = {
    prix: number;
    type: string;
}
export const createExternalExpense = async (data: external_expense) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const { prix, type } = data;
        if (!prix || !type) {
            return { status: "error", message: "prix or type not found" };
        }
        const result = await prisma.external_expense.create({
            data: {
                prix,
                type
            }
        });

        if (!result) {
            return { status: "error", message: "error in createExternalExpense" };
        }
        return { status: "success", message: "createExternalExpense success" };

    } catch (error) {
        console.log("error in createExternalExpense", error);
    }
    finally {
        await prisma.$disconnect();
    }
}

export const createContribution = async (prix: number, user_id: string) => {
    try {
        const payload = await verifyToken();
        if (payload?.role !== 'superadmin') {
            return { status: 'error', message: 'غير مصرح لك بالقيام بهذا الإجراء' };
        }
        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        });
        if (!user) {
            return { status: "error", message: "user not found" };
        }
        const result = await prisma.contribution.create({
            data: {
                prix,
                user_id
            }
        });

        if (!result) {
            return { status: "error", message: "error in createContribution" };
        }
        return { status: "success", message: "createContribution success" };

    } catch (error) {
        console.log("error in createContribution", error);
    }
    finally {
        await prisma.$disconnect();
    }
}


export const getTotalExpensesByMonth = async () => {
    try {
        // get this month expenses
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const expenses = await prisma.external_expense.findMany({
            where: {
                created_at: {
                    gte: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1)
                },
            },
            select: {
                prix: true
            }
        });
        if (!expenses) {
            return { status: "error", message: "expenses not found" };
        }
        let total = 0;
        for (let i = 0; i < expenses.length; i++) {
            const expense = expenses[i];
            total += expense.prix;
        }
        // check if exist in db with this month
        const result = await prisma.total_expenses.findFirst({
            where: {
                created_at: {
                    gte: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1)
                },
            }
        });
        if (result) {
            // update
            const data = await prisma.total_expenses.update({
                where: {
                    id: result.id
                },
                data: {
                    prix: total
                }
            });
        } else {
            // create
            const result = await prisma.total_expenses.create({
                data: {
                    prix: total
                }
            });
        }
        // return total
        return { status: "success", message: "getTotalExpenses success", data: total };
    }

    catch (error) {
        console.log("error in getTotalExpenses", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
// 
interface ITotalSelles {
    initial_amount_price: number;
}
export const getEarningsOfCurrentMonth = async (data: ITotalSelles) => {
    try {
        const { initial_amount_price } = data;
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const allSells = await prisma.produit_sell.findMany();
        if (!allSells) {
            return { status: "error", message: "allSells not found" };
        }
        let total = 0;
        let total_quantite = 0;
        for (let i = 0; i < allSells.length; i++) {
            const sell = allSells[i];
            total += sell.prix * sell.quantite;
            total_quantite += sell.quantite;
        }
        const allFrais = await prisma.frais_de_prix.findMany();
        if (!allFrais) {
            return { status: "error", message: "allFrais not found" };
        }
        let totalFrais = 0;
        for (let i = 0; i < allFrais.length; i++) {
            const frais = allFrais[i];
            totalFrais += frais.prix;
        }
        // get the expenses
        const totalExpenses = await prisma.total_expenses.findFirst();
        if (!totalExpenses) {
            return { status: "error", message: "totalExpenses not found" };
        }
        // get the initial amount price
        const initialAmountPrice = initial_amount_price;
        // the final result
        const finalResultPrice = total - totalFrais - totalExpenses.prix - Number(initialAmountPrice);
        // check if exist in db with this month
        const result = await prisma.total_Selles.findFirst({
            where: {
                created_at: {
                    gte: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1)
                },
            }
        });
        if (result) {
            // update
            const data = await prisma.total_Selles.update({
                where: {
                    id: result.id
                },
                data: {
                    prix: finalResultPrice,
                    quantite: total_quantite
                }
            });
        } else {
            // create
            const result = await prisma.total_Selles.create({
                data: {
                    prix: finalResultPrice,
                    quantite: total_quantite
                }
            });
        }
        // get also all ths stock of the products
        const poducts = await prisma.produit_Final.findMany();
        if (!poducts) {
            return { status: "error", message: "poducts not found" };
        }
        let finalResultPriceStock = 0;
        for (let i = 0; i < poducts.length; i++) {
            const product = poducts[i];
            finalResultPriceStock += product.quantite * product.prix_vente;
        }
        return {
            status: "success", message: "getEarningsOfCurrentMonth success", data: {
                initial_amount_price,
                total,
                totalFrais,
                totalExpenses: totalExpenses.prix,
                finalResultPrice,
                finalResultPriceStock
            }
        };
    } catch (error) {

    }
    finally {
        await prisma.$disconnect();
    }
}


export const getHowmuchrRest = async () => {
    try {
        const vendurs = await prisma.vendur.findMany();
        if (!vendurs) {
            return { status: "error", message: "vendurs not found" };
        }
        let total_prix_a_payer = 0;
        for (let i = 0; i < vendurs.length; i++) {
            const vendur = vendurs[i];
            total_prix_a_payer += vendur.le_prix_a_payer;
        }
        let total_prix_a_paye = 0;
        for (let i = 0; i < vendurs.length; i++) {
            const vendur = vendurs[i];
            total_prix_a_paye += vendur.le_prix_a_paye;
        }
        const result = total_prix_a_payer - total_prix_a_paye;
        return { status: "success", message: "getTotalOfLePrixAPayer success", data: { total_prix_a_payer, result } };
    } catch (error) {
        console.log("error in getTotalOfLePrixAPayer", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
/*
model total_Selles {
  id         String   @id @default(uuid()) @db.VarChar(36)
  prix       Float //المبلغ
  quantite   Int //الكمية
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
*/
export const createTotalSelles = async () => {
    try {
        // get the total of the sells quantity and price= prix*quantite
        const vendurs = await prisma.vendur.findMany();
        if (!vendurs) {
            return { status: "error", message: "vendurs not found" };
        }
        let total_prix = 0;
        let total_quantite = 0;
        for (let i = 0; i < vendurs.length; i++) {
            const vendur = vendurs[i];
            const selles = await prisma.produit_sell.findMany({
                where: {
                    vendur_id: vendur.id
                }
            });
            if (!selles) {
                return { status: "error", message: "selles not found" };
            }
            for (let j = 0; j < selles.length; j++) {
                const sell = selles[j];
                total_prix += sell.prix * sell.quantite;
                total_quantite += sell.quantite;
            }
        }
        let date    = new Date();
        let month   = date.getMonth();
        let year    = date.getFullYear();

        const result = await prisma.total_Selles.findFirst({
            where: {
                created_at: {
                    gte: new Date(year, month, 1),
                    lt: new Date(year, month + 1, 1)
                },
            }
        });

        if (result) {
            // update
            const data = await prisma.total_Selles.update({
                where: {
                    id: result.id
                },
                data: {
                    prix: total_prix,
                    quantite: total_quantite
                }
            });
            return { status: "success", message: data };
        }
        else {
            // create
            const result = await prisma.total_Selles.create({
                data: {
                    prix: total_prix,
                    quantite: total_quantite
                }
            });
            return { status: "success", data: result };
        }
    } catch (error) {
        console.log("error in createTotalSelles", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
