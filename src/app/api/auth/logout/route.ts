"use server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request:NextRequest) {
    try {
        const isToken = cookies().has("token");
        if (!isToken) {
            return NextResponse.redirect("/signin");
        }
        const token = cookies().get("token")?.value;
        if (!token) {
            return NextResponse.redirect("/signin");
        }
        cookies().set("token", "", {
            path: "/",
            maxAge: 0,
            secure: true,
        });
        
        return NextResponse.json({
            status: "success",
            message: "Logout successfully"
        });


    }
    catch (e) {
        console.error(e);
    }
}
