import { prisma } from "@/(secrets)/secrets";


export const createProduct = async (data: any) => {
    try {
        if (!data) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            }
        }
        const product = await prisma.finalProduct.create({
            data: {
                name: data.name,
                price: data.price,
                quantity: data.quantity,
            },
        });

        if (!product) {
            return {
                status: 'error',
                message: 'لم يتم إنشاء المنتج'
            }
        }

        return {
            status: 'success',
            message: 'تم إنشاء المنتج بنجاح'
        }
    } catch (err) {
        console.log(err);
    }
}

export const updateProduct = async (data: any) => {
    try {
        if (!data) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            }
        }
        // fisrt find the product
        const res = await prisma.finalProduct.findUnique({
            where: { id: data.id },
        });

        if (!res) {
            return {
                status: 'error',
                message: 'المنتج غير موجود'
            }
        }

        const product = await prisma.finalProduct.update({
            where: { id: data.id },
            data: {
                name: data.name,
                price: data.price,
                quantity: data.quantity,
            },
        });

        if (!product) {
            return {
                status: 'error',
                message: 'لم يتم تحديث المنتج'
            }
        }

        return {
            status: 'success',
            message: 'تم تحديث المنتج بنجاح'
        }
    } catch (err) {
        console.log(err);
    }
}

export const deleteProduct = async (id: string) => {
    try {
        if (!id) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            }
        }
        const product = await prisma.finalProduct.delete({
            where: { id: id },
        });

        if (!product) {
            return {
                status: 'error',
                message: 'لم يتم حذف المنتج'
            }
        }

        return {
            status: 'success',
            message: 'تم حذف المنتج بنجاح'
        }
    } catch (err) {
        console.log(err);
    }
}

export const getProducts = async () => {
    try {
        const products = await prisma.finalProduct.findMany();
        if (!products) {
            return {
                status: 'error',
                message: 'لم يتم العثور على المنتجات'
            }
        }
        return {
            status: 'success',
            data: products
        }
    } catch (err) {
        console.log(err);
    }
}

export const getProduct = async (id: string) => {
    try {
        if (!id) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            }
        }
        const product = await prisma.finalProduct.findUnique({
            where: { id: id },
        });

        if (!product) {
            return {
                status: 'error',
                message: 'لم يتم العثور على المنتج'
            }
        }

        return {
            status: 'success',
            message: 'تم العثور على المنتج',
            data: product
        }
    } catch (err) {
        console.log(err);
    }
}
