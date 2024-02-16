"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/(db)/resnd/core";

export async function GET() {
    try {
        const isToken = cookies().has("token");
        if (!isToken) {
            return NextResponse.redirect("/signin");
        }
        const token = cookies().get("token")?.value;
        if (!token) {
            return NextResponse.redirect("/signin");
        }

        const payload = await verifyToken();
        if (!payload) {
            return NextResponse.redirect("/signin");
        }
        return NextResponse.json({
            user: {
                name: payload.username,
                email: payload.email,
                image: payload.profile,
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}
