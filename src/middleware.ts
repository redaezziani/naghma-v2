'use server';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './(db)/resnd/core';


export const middleware= async (request: NextRequest) => {
    const token = request.cookies.has('token');
    const { pathname }: { pathname: string } = request.nextUrl;
    if (!token &&  !['/signin', '/signup', '/forget-password'].includes(pathname)) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl.origin).toString());
    }
    const payload = await verifyToken();
    if (token && !payload && !['/signin', '/signup', '/forget-password'].includes(pathname)) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl.origin).toString());
    }
    if (token &&  ['/signin', '/signup', '/forget-password'].includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin).toString());
    }
    if (token && payload && payload.role === 'user' && ['/dashboard/vendor', '/dashboard' , '/dashboard/vendor/add-vendor','/dashboard/vendor/vendors-logs' ,'/dashboard/vendor/payment', '/dashboard/vendor/retourn', '/dashboard/vendor/expenses'].includes(pathname)  || token && payload && payload.role === 'user' && pathname.startsWith('/dashboard/final-product')) {
        return NextResponse.redirect(new URL(`/dashboard/vendor/${payload?.vendur_id}`, request.nextUrl.origin).toString());
    }
    if (token && payload && payload.role === 'admin' && ['/dashboard/vendor/add-vendor','/dashboard/vendor/vendors-logs' ,'/dashboard/vendor/payment', '/dashboard/vendor/retourn', '/dashboard/vendor/expenses'].includes(pathname)  || token && payload && payload.role === 'admin' && ['/dashboard/final-product/products-logs','/dashboard/final-product/add-final-product'].includes(pathname) || token && payload && payload.role === 'admin' && pathname.startsWith('/dashboard/final-product/update-product/')) {
        return NextResponse.redirect(new URL(`/dashboard/`, request.nextUrl.origin).toString());
    }
    return NextResponse.next();    
}

export const config = {
    matcher :[ '/dashboard/:path*', '/signin', '/signup']
}


