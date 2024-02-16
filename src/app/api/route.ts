
import { NextApiResponse, NextApiRequest } from 'next';
import { NextResponse } from 'next/server';


export async function GET  (req: Request, res: NextApiResponse) {
    try {
        const message= 'Welcome to the My Store API';

        return NextResponse.json({
            status : "success",
            message: message
        });
    }
    catch (error) {
        console.log(error);
    }
}
