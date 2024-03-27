import { verifyToken } from "@/(db)/resnd/core";
import { NextResponse, NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const isToken = req.cookies.has("token");
        if (!isToken) {
            return Response.json({ status: "error", message: "Unauthorized" });
        }
        
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return Response.json({ status: "error", message: "Unauthorized" });
        }

        const payload = await verifyToken();
        if (!payload) {
            return Response.json({ status: "error", message: "Unauthorized" });
        }

        return Response.json({
            status: "success",
            user: {
                name: payload.username,
                email: payload.email,
                image: payload.profile,
            },
            message: ""
        });
    } catch (error) {
        console.error(error);
        // Handle error and return an appropriate response
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
