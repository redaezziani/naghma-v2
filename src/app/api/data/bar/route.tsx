import { prisma } from "@/(secrets)/secrets";
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        let currentMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();
        const vendurs = await prisma.vendur.findMany({
            
            include: {
                produit_sell: true
            },
            
        });
        if (!vendurs || vendurs.length === 0) {
            return { status: 'error', message: 'لم يتم العثور على البائعين' };
        }
        const vendursWithTotalSellPrice = vendurs.map((vendur: any) => {
            const total_sell_price = vendur.produit_sell.reduce((acc: number, product: any) => {
                const date = new Date(product.created_at);
                if (date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
                    return acc + product.prix * product.quantite;
                }
                return acc;
            }, 0);
            return {
                ...vendur,
                total_sell_price
            };
        });
        
        return NextResponse.json({status: "success",data:vendursWithTotalSellPrice , "message": ""});
    } catch (error) {
        console.error(error);
    }
}


