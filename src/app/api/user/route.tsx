import { verifyToken } from "@/(db)/resnd/core";
import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const isToken = cookies().has("token");
        if (!isToken) {
            return {status :"error", message: "Unauthorized"};
        }
        const token = cookies().get("token")?.value;
        if (!token) {
            return {status :"error", message: "Unauthorized"};
        }

        const payload = await verifyToken();
        if (!payload) {
            return {status :"error", message: "Unauthorized"};
            
        }
        
        return NextResponse.json({status: "success", user: {
            name: payload.username,
            email: payload.email,
            image: payload.profile,
        }, "message": ""});
    } catch (error) {
        console.error(error);
    }
}


