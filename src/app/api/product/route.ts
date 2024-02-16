"use server";

import { client } from "@/app/(secrets)/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST  (req: Request, res: NextApiResponse) {
    try {
        const data = await req.json();
       const {
            name,
            image,
            description,
            price,
            categoryId,
            stock,
            sizes,
            status,
            colors,
            rating,
            shipping,
        } = data;
        if (name === undefined || image === undefined || description === undefined || price === undefined || categoryId === undefined || stock === undefined || sizes === undefined || status === undefined || colors === undefined || rating === undefined) {
            return  NextResponse.json({ status : "error", message: "Please provide all the required fields" });
        }
        
        const product = await client.product.create({
            data: {
                name,
                image,
                description,
                price,
                categoryId,
                stock,
                sizes,
                status,
                colors,
                rating,
                shipping,
            }
        });
        if (product === undefined) {
            return  NextResponse.json({ status : "error", message: "Product not created" });
        }

        return  NextResponse.json({ status : "success", message: "Product created successfully" });
    } catch (error) {
        console.log(error);
    }
}


export async function GET  (req: NextApiRequest, res: NextApiResponse) {
    try {
        const count = await client.product.count()
        if (count === 0) {
            return NextResponse.json({ status : "success", message: "No product found" });
        }
        const product = await client.product.findMany()
        return NextResponse.json({
            status : "success",
            message: "Product found successfully",
            data: product
        });
    }
    catch (error) {
        console.log(error);
    }
}


export async function PUT  (req: Request, res: NextApiResponse) {
    try {
        const data = await req.json();
        const {
            id,
            name,
            image,
            description,
            price,
            categoryId,
            stock,
            sizes,
            status,
            colors,
            rating
        } = data;
        const product = await client.product.update({
            where: {
                id
            },
            data: {
                name,
                image,
                description,
                price,
                categoryId,
                stock,
                sizes,
                status,
                colors,
                rating
            }
        });
        return NextResponse.json({ status : "success", message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
    }
}



export async function DELETE  (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.body;
        await client.product.delete({
            where: {
                id
            }
        });
        return NextResponse.json({ status : "success", message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}


