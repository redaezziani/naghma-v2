
import { NextResponse } from 'next/server';

import { Resend } from 'resend';
const resend = new Resend('re_E18ceeYD_MTkvyL3zqXs2ETpNipdssVh7');
import cron from 'node-cron';

export async function GET() {

    const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'klausdev2@gmail.com',
        subject: 'sample email from Resend',
        html:'<h1>Hello world</h1>',
        text: 'Welcome to the store!', 
    });
    
    return NextResponse.json(response);
}
