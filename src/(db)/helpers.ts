import { prisma } from "@/(secrets)/secrets";

interface BestPrice {
    id: string;
    percentage: number;
}

export const getBestSellingProductPrice = async (data: BestPrice[]) => {
    try {
        if (!data || data.length === 0) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            };
        }

        let totalPercentage = 0;
        for (let i = 0; i < data.length; i++) {
            totalPercentage += data[i].percentage;
        }

        if (totalPercentage !== 100) {
            return {
                status: 'error',
                message: 'يجب أن يكون إجمالي النسبة المئوية 100'
            };
        }

        let totalWeight = 1000; // 1 كجم بالجرامات
        let finalProductPrice = 0;

        for (let i = 0; i < data.length; i++) {
            const product = await prisma.primaryProduct.findUnique({
                where: { id: data[i].id },
            });

            if (!product) {
                return {
                    status: 'error',
                    message: 'المنتج غير موجود'
                };
            }

            const pricePerGram = (product.price / 1000) * data[i].percentage * 10;

            finalProductPrice += pricePerGram;
        }

        const priceWhiteoutTax = finalProductPrice;
        const price_white_goods = priceWhiteoutTax * 1.08;
        const price_for_1000_kg = price_white_goods * 1000;
        return {
            status: 'success',
            message: 'تم حساب سعر البيع الأفضل بنجاح للمنتج النهائي لكل كجم',
            data: {
                priceWhiteoutTax: priceWhiteoutTax,
                price_white_goods: price_white_goods,
                price_for_1000_kg: price_for_1000_kg
            }
        };
    } catch (err) {
        console.log(err);
        return {
            status: 'error',
            message: 'حدث خطأ أثناء حساب السعر',
        };
    }
};
