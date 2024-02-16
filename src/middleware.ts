'use server';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export const middleware= (request: NextRequest) => {
    const token = request.cookies.has('token');
    const { pathname }: { pathname: string } = request.nextUrl;
    if (!token &&['/dashboard','/dashboard/profile', '/dashboard/categories','/dashboard/products/new-product', '/dashboard/product', '/dashboard/order', '/dashboard/setting'].includes(pathname)) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl.origin).toString());
    }
    
    
    if (token &&  ['/signin', '/signup', '/forget-password'].includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin).toString());
    }
    return NextResponse.next();    
}

export const config = {
    matcher :[ '/dashboard/', '/signin', '/signup', '/forget-password', '/dashboard/profile', '/dashboard/categories', '/dashboard/products', '/dashboard/order', '/dashboard/setting', '/dashboard/products/new-product', '/dashboard/product']
}


