// /app/api/subscribe/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email } = await req.json()
  console.log('resend',resend) 

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to Toddlers World!',
      html: `
        <p>Dear Parent,</p>

        <p>Thank you for joining <strong>Toddlers World</strong> – where every product is made with love, care, and a whole lot of baby giggles! 💫</p>

        <p>You're now officially part of a community that believes in comfort, quality, and cuteness for your little one.🍼✨</p>

        <p>💌 Stay tuned for exclusive deals, new arrivals, and parenting tips delivered straight to your inbox.</p>

        <p>📲 Don’t miss a moment!<br/>
        👉 <a href="https://www.instagram.com/toddlersworld16">Follow us on Instagram</a><br/>
        👉 <a href="https://www.facebook.com/profile.php?id=61567127003108">Like us on Facebook</a></p>

        <p>Regards,<br/>
        <em>Team Toddlers World</em></p>
      `,
    })
    
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 })
  }
}
