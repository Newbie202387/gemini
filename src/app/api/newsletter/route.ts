import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory store for development (replace with database in production)
const subscribers = new Set<string>()

interface NewsletterSubscription {
    email: string
    source: string
    timestamp: string
}

export async function POST(req: NextRequest) {
    try {
        const { email, source, timestamp }: NewsletterSubscription = await req.json()

        // Validation
        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            )
        }

        const normalizedEmail = email.toLowerCase().trim()

        // Check if already subscribed (in production, check your database)
        if (subscribers.has(normalizedEmail)) {
            return NextResponse.json(
                { message: 'Email already subscribed', alreadySubscribed: true },
                { status: 200 }
            )
        }

        // Add to subscribers (in production, save to database)
        subscribers.add(normalizedEmail)

        // Send welcome email using Resend
        await resend.emails.send({
            from: 'Gemini Pixel Craft <newsletter@geminipixelcraft.com>',
            to: normalizedEmail,
            subject: 'Welcome to Gemini Pixel Craft Newsletter! 🚀',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Gemini Pixel Craft</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; padding: 40px 0; background: linear-gradient(135deg, #8B5CF6, #EC4899); border-radius: 12px; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 28px; margin: 0; font-weight: bold;">
              ✨ Welcome to Gemini Pixel Craft!
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
              Where digital dreams become reality
            </p>
          </div>

          <!-- Welcome Message -->
          <div style="padding: 0 20px;">
            <h2 style="color: #1F2937; font-size: 24px; margin-bottom: 20px;">
              Thanks for joining our community! 🎉
            </h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              You're now part of an exclusive group of forward-thinking business owners and developers who stay ahead of the curve in web development.
            </p>

            <p style="font-size: 16px; margin-bottom: 30px;">
              Here's what you can expect from us:
            </p>

            <!-- Benefits List -->
            <div style="background: #F9FAFB; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 8px 0; display: flex; align-items: center;">
                  <span style="background: #10B981; color: white; border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 15px;">✓</span>
                  Latest web development trends and insights
                </li>
                <li style="padding: 8px 0; display: flex; align-items: center;">
                  <span style="background: #10B981; color: white; border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 15px;">✓</span>
                  Exclusive tips for growing your online presence
                </li>
                <li style="padding: 8px 0; display: flex; align-items: center;">
                  <span style="background: #10B981; color: white; border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 15px;">✓</span>
                  Special offers and early access to new services
                </li>
                <li style="padding: 8px 0; display: flex; align-items: center;">
                  <span style="background: #10B981; color: white; border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 15px;">✓</span>
                  Behind-the-scenes content from our projects
                </li>
              </ul>
            </div>

            <!-- CTA Section -->
            <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #F3E8FF, #FCE7F3); border-radius: 8px; margin-bottom: 30px;">
              <h3 style="color: #1F2937; margin-bottom: 15px; font-size: 20px;">
                Ready to start your project?
              </h3>
              <p style="color: #6B7280; margin-bottom: 20px;">
                As a newsletter subscriber, you get priority support and exclusive pricing.
              </p>
              <a href="https://geminipixelcraft.com/#contact" style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Get Free Consultation
              </a>
            </div>

            <!-- Social Links -->
            <div style="text-align: center; margin-bottom: 30px;">
              <p style="color: #6B7280; margin-bottom: 15px;">Follow us for daily tips:</p>
              <div>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #8B5CF6; text-decoration: none;">Twitter</a>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #8B5CF6; text-decoration: none;">LinkedIn</a>
                <a href="#" style="display: inline-block; margin: 0 10px; color: #8B5CF6; text-decoration: none;">Instagram</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">
              <p>
                Gemini Pixel Craft<br>
                Tampa, FL | info@geminipixelcraft.com
              </p>
              <p style="margin-top: 15px;">
                Don't want these emails? 
                <a href="{{unsubscribe_url}}" style="color: #8B5CF6; text-decoration: none;">Unsubscribe here</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
        })

        // Send notification to team
        await resend.emails.send({
            from: 'Newsletter <newsletter@geminipixelcraft.com>',
            to: 'taylor@geminipixelcraft.com',
            subject: 'New Newsletter Subscriber',
            html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Email:</strong> ${normalizedEmail}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Total Subscribers:</strong> ${subscribers.size}</p>
      `,
        })

        return NextResponse.json({
            message: 'Successfully subscribed to newsletter',
            success: true
        })

    } catch (error) {
        console.error('Newsletter subscription error:', error)
        return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
        )
    }
}

// GET endpoint to check subscription status (optional)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json({ error: 'Email parameter required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const isSubscribed = subscribers.has(normalizedEmail)

    return NextResponse.json({
        email: normalizedEmail,
        subscribed: isSubscribed,
        totalSubscribers: subscribers.size
    })
}

// Database integration example (replace the in-memory store)
/*
// For production, use a proper database like PostgreSQL, MongoDB, or Supabase
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Check if email exists
const { data: existingSubscriber } = await supabase
  .from('newsletter_subscribers')
  .select('email')
  .eq('email', normalizedEmail)
  .single()

if (existingSubscriber) {
  return NextResponse.json(
    { message: 'Email already subscribed', alreadySubscribed: true },
    { status: 200 }
  )
}

// Insert new subscriber
const { error: insertError } = await supabase
  .from('newsletter_subscribers')
  .insert({
    email: normalizedEmail,
    source: source,
    subscribed_at: timestamp,
    status: 'active'
  })

if (insertError) {
  throw new Error('Failed to save subscriber')
}
*/