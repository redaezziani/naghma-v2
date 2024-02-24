
import { NextResponse } from 'next/server';

import { Resend } from 'resend';
const resend = new Resend('re_E18ceeYD_MTkvyL3zqXs2ETpNipdssVh7');


export async function GET() {
    const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'klausdev2@gmail.com',
        subject: 'Foreget Password Request',
        html:'<h1>Hello world</h1>',
        text: 'Welcome to the store!', 
    });
    return NextResponse.json(response);
}
