// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { downPaymentPriceId, subscriptionPriceId, planName, billingCycle, successUrl, cancelUrl } = await req.json()

    if (!downPaymentPriceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: downPaymentPriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/#pricing`,
      customer_creation: 'always',
      // Ensure we collect email
      customer_email: undefined, // Let Stripe collect it
      billing_address_collection: 'auto',
      metadata: {
        subscription_price_id: subscriptionPriceId,
        plan_name: planName,
        billing_cycle: billingCycle,
        is_setup_fee: 'true'
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}