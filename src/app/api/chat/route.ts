import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json()

        // ✅ Initialize here, only when needed
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        })

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful customer support assistant for Gemini Pixel Craft, a web development company. 
          
          Company services:
          - Web Development (Next.js, React, Node.js)
          - Mobile Apps (React Native, iOS, Android)
          - E-commerce solutions with Stripe integration
          - SEO optimization
          - Website maintenance and support
          - Security audits and SSL certificates
          
          Pricing:
          - Starter: $999 (small websites, up to 5 pages)
          - Professional: $2,499 (business websites, up to 15 pages, e-commerce)
          - Enterprise: $4,999 (custom solutions, unlimited pages)
          
          Always be helpful, professional, and focus on how our services can solve the user's problems. 
          If asked about technical details you're unsure about, suggest they contact our team directly.
          Keep responses concise but informative.`
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            max_tokens: 300,
            temperature: 0.7,
        })

        const assistantMessage = completion.choices[0]?.message?.content ||
            'I apologize, but I encountered an issue. Please contact our team directly at hello@geminipixelcraft.com'

        return NextResponse.json({ message: assistantMessage })
    } catch (error) {
        console.error('OpenAI API error:', error)
        return NextResponse.json(
            { error: 'Chat service temporarily unavailable' },
            { status: 500 }
        )
    }
}
