'use server';
import { prisma } from "@/(secrets)/secrets";


export const createProduct = async (data: any) => {
    try {
        if (!data) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            }
        }
        const product = await prisma.primaryProduct.create({
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
};


interface Product {
    name: string;
    price: string;
    quantity: string;
    priceTotal?: string;
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
        const res = await prisma.primaryProduct.findUnique({
            where: { id: data.id },
        });

        if (!res) {
            return {
                status: 'error',
                message: 'لم يتم العثور على المنتج'
            }
        }

        

        const product = await prisma.primaryProduct.update({
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

export const deleteProduct = async (id: number) => {
    try {
        if (!id) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            }
        }
        const product = await prisma.primaryProduct.delete({
            where: { id: String(id) },
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


export const getProduct = async (id: number) => {
    try {
        if (!id) {
            return {
                status: 'error',
                message: 'لم يتم توفير البيانات'
            }
        }
        const product = await prisma.primaryProduct.findUnique({
            where: { id: String(id) },
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
export const getProducts = async () => {
    try {
        const products = await prisma.primaryProduct.findMany();
        if (!products) {
            return {
                status: 'error',
                message: 'لم يتم العثور على منتجات'
            }
        }
        
        return {
            status: 'success',
            message: 'تم العثور على المنتجات',
            data: products,
            total_price: products.reduce((acc, product) => acc + (product.price * product.quantity), 0)
        }
    } catch (err) {
        console.log(err);
    }
};
