import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  budget: string;
  projectType: string;
  timeline?: string;
  message: string;
  recaptchaToken: string;
}

interface ReCaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data: ReCaptchaResponse = await response.json();

    // For reCAPTCHA v3, check if success is true and score is above threshold
    if (data.success && data.score !== undefined) {
      // Score ranges from 0.0 to 1.0, with 1.0 being very likely human
      // Adjust threshold based on your needs (0.5 is a common threshold)
      console.log('reCAPTCHA score:', data.score);
      return data.score >= 0.5;
    }

    // For reCAPTCHA v2, just check success
    return data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      company,
      phone,
      projectType,
      budget,
      timeline,
      message,
      recaptchaToken
    }: ContactFormData = await req.json()

    // Validate required fields
    if (!name || !email || !projectType || !budget || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      )
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      console.error('reCAPTCHA verification failed for:', email);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    console.log('reCAPTCHA verified successfully for:', email);

    // Send email to team
    await resend.emails.send({
      from: 'Gemini Pixel Craft <noreply@geminipixelcraft.com>',
      to: 'taylor@geminipixelcraft.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Timeline:</strong> ${timeline || 'Not provided'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <strong>Message:</strong>
            <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #06b6d4; margin-top: 10px; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #ecfdf5; border: 1px solid #10b981; padding: 10px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              ✅ This submission passed reCAPTCHA verification
            </p>
          </div>
        </div>
      `,
    })

    // Send auto-reply to customer
    await resend.emails.send({
      from: 'Gemini Pixel Craft <noreply@geminipixelcraft.com>',
      to: email,
      subject: 'Thank you for contacting Gemini Pixel Craft',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Gemini Pixel Craft</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Digital Solutions & Web Development</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; margin-top: 0;">Thank you for your message!</h2>
            
            <p>Hi ${name},</p>
            
            <p>We've received your message about your <strong>${projectType}</strong> project and will get back to you within 24 hours (usually much faster!).</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
              <h3 style="margin-top: 0; color: #1f2937;">Your Project Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 8px 0;"><strong>Project Type:</strong> ${projectType}</li>
                <li style="margin: 8px 0;"><strong>Budget Range:</strong> ${budget}</li>
                ${timeline ? `<li style="margin: 8px 0;"><strong>Timeline:</strong> ${timeline}</li>` : ''}
              </ul>
            </div>
            
            <p><strong>Your message:</strong></p>
            <blockquote style="border-left: 4px solid #06b6d4; padding-left: 16px; margin: 16px 0; font-style: italic; color: #4b5563;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
            
            <div style="background-color: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;">
                <strong>What happens next?</strong><br>
                Our team will review your project requirements and reach out within 24 hours with a detailed proposal and next steps.
              </p>
            </div>
            
            <p>Best regards,<br>
            <strong>The Gemini Pixel Craft Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p>📧 info@geminipixelcraft.com | 📞 +1 (703) 868-2950</p>
              <p>Tampa, FL • Serving clients worldwide</p>
            </div>
          </div>
        </div>
      `,
    })

    // Log successful submission
    console.log('Contact form submitted successfully:', {
      name,
      email,
      projectType,
      budget,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}