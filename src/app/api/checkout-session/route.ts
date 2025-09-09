// app/api/checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
        return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'customer']
        })
        return NextResponse.json(session)
    } catch (error) {
        console.error('Error retrieving session:', error)
        return NextResponse.json(
            { error: 'Session not found' },
            { status: 404 }
        )
    }
}