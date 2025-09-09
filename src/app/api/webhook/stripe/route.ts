// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Add debugging logs
  console.log('🔔 Webhook received:', event.type)
  console.log('📊 Event data:', JSON.stringify(event.data.object, null, 2))

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session

        console.log('💰 Session completed:', session.id)
        console.log('🏷️  Session metadata:', session.metadata)
        console.log('👤 Customer:', session.customer)
        console.log('💵 Amount:', session.amount_total)

        if (session.metadata?.is_setup_fee === 'true') {
          console.log('✅ Processing setup fee payment...')
          await handleSetupFeePayment(session)
        } else {
          console.log('❌ Not a setup fee payment, skipping email')
          console.log('Metadata is_setup_fee value:', session.metadata?.is_setup_fee)
        }
        break

      default:
        console.log('🔄 Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('❌ Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleSetupFeePayment(session: Stripe.Checkout.Session) {
  try {
    console.log('📧 Starting email process for session:', session.id)

    const customer = await stripe.customers.retrieve(session.customer as string) as Stripe.Customer
    console.log('👤 Retrieved customer:', customer.email)

    // Create subscription after setup fee is paid
    if (session.metadata?.subscription_price_id) {
      console.log('📝 Creating subscription with price ID:', session.metadata.subscription_price_id)

      const subscription = await stripe.subscriptions.create({
        customer: session.customer as string,
        items: [
          {
            price: session.metadata.subscription_price_id,
          },
        ],
        // Start subscription 30 days after setup
        billing_cycle_anchor: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
        metadata: {
          setup_session_id: session.id,
          plan_name: session.metadata.plan_name || 'Premium Plan',
          billing_cycle: session.metadata.billing_cycle || 'monthly'
        },
      })

      console.log('✅ Subscription created:', subscription.id)

      // Send confirmation emails
      await sendConfirmationEmails(session, customer, subscription)
      console.log('📧 Emails sent successfully')
    } else {
      console.log('❌ No subscription_price_id found in metadata')
    }
  } catch (error) {
    console.error('❌ Error in handleSetupFeePayment:', error)
    // Log the full error details
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
  }
}

async function sendConfirmationEmails(session: Stripe.Checkout.Session, customer: Stripe.Customer, subscription: Stripe.Subscription) {
  try {
    console.log('📧 Sending customer email to:', customer.email)

    // Send to customer
    const customerEmailResult = await resend.emails.send({
      from: 'Gemini Pixel Craft <billing@geminipixelcraft.com>',
      to: customer.email!,
      subject: 'Setup Fee Received - Project Starting Soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Setup Fee Payment Received!</h2>
          <p>We've received your setup fee payment for the ${session.metadata?.plan_name || 'Premium'} plan.</p>
          <p>Your subscription will begin in 30 days, giving us time to complete your website development.</p>
          <p><strong>Subscription ID:</strong> ${subscription.id}</p>
          <p>We'll contact you within 24 hours to begin your project.</p>
        </div>
      `,
    })

    console.log('✅ Customer email result:', customerEmailResult)

    console.log('📧 Sending team notification email')

    // Send to team
    const teamEmailResult = await resend.emails.send({
      from: 'Billing <billing@geminipixelcraft.com>',
      to: 'taylor@geminipixelcraft.com',
      subject: `New Setup Fee Payment: ${session.metadata?.plan_name || 'Unknown'} Plan`,
      html: `
        <h2>New Setup Fee Payment Received</h2>
        <p><strong>Customer:</strong> ${customer.email}</p>
        <p><strong>Plan:</strong> ${session.metadata?.plan_name || 'Unknown'}</p>
        <p><strong>Setup Fee:</strong> $${(session.amount_total! / 100).toFixed(2)}</p>
        <p><strong>Monthly Amount:</strong> $${subscription.items.data[0]?.price.unit_amount ? (subscription.items.data[0].price.unit_amount / 100).toFixed(2) : '0.00'}</p>
        <p><strong>Subscription ID:</strong> ${subscription.id}</p>
        <p><strong>Customer ID:</strong> ${customer.id}</p>
      `,
    })

    console.log('✅ Team email result:', teamEmailResult)
  } catch (emailError) {
    console.error('❌ Email sending failed:', emailError)
    if (emailError instanceof Error) {
      console.error('Email error message:', emailError.message)
    }
  }
}