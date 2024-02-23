'use server';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export const middleware= (request: NextRequest) => {
    const token = request.cookies.has('token');
    const { pathname }: { pathname: string } = request.nextUrl;
    // lets make a regix to match the dashboard routes dashboard/.* 
    if (!token &&  !['/signin', '/signup', '/forget-password'].includes(pathname)) {
        console.log('redirecting to signin');
        return NextResponse.redirect(new URL('/signin', request.nextUrl.origin).toString());
    }
    
    
    if (token &&  ['/signin', '/signup', '/forget-password'].includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin).toString());
    }
    return NextResponse.next();    
}

export const config = {
    matcher :[ '/dashboard/:path*', '/signin', '/signup']
}


