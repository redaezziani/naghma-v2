'use server';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './(db)/resnd/core';


export const middleware= async (request: NextRequest) => {
    const token = request.cookies.has('token');
    const { pathname }: { pathname: string } = request.nextUrl;
   
    return NextResponse.next();    
}

export const config = {
    matcher :[ '/dashboard/:path*', '/signin', '/signup']
}


