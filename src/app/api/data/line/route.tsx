import { prisma } from "@/(secrets)/secrets";
import { NextResponse, NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 


export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const vendurs = await prisma.vendur.findMany({
            include: {
                produit_sell: true
            }
        });

        if (!vendurs || vendurs.length === 0) {
            return Response.json({ status: 'error', message: 'لم يتم العثور على البائعين' });
        }

        let earningsByMonth: { month: number; year: number; totalEarnings: number }[] = [];

        vendurs.forEach(vendur => {
            vendur.produit_sell.forEach(product => {
                const date = new Date(product.created_at);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const existingEntry = earningsByMonth.find(entry => entry.month === month && entry.year === year);

                if (existingEntry) {
                    existingEntry.totalEarnings += product.prix * product.quantite;
                } else {
                    earningsByMonth.push({
                        month: month,
                        year: year,
                        totalEarnings: product.prix * product.quantite
                    });
                }
            });
        });

        const sortedEarnings = earningsByMonth.sort((a, b) => {
            if (a.year === b.year) {
                return a.month - b.month;
            }
            return a.year - b.year;
        });

        return Response.json({ status: "success", data: sortedEarnings, message: "" });
    } catch (error) {
        console.error(error);
        // Handle error and return an appropriate response
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
