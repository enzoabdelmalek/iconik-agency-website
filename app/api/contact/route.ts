import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
    const { name, email, phone, subject, message, businessId } = await req.json();

    if (!name || !message) {
        return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const fullMessage = subject ? `[${subject}]\n\n${message}` : message;

    // Insert into quotes
    const { error: dbError } = await supabaseAdmin.from("quotes").insert({
        business_id: businessId,
        customer_name: name,
        customer_email: email || null,
        customer_phone: phone || null,
        message: fullMessage,
        status: "pending",
    });

    if (dbError) {
        console.error("DB error:", dbError);
        return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    // Send notification email
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (notificationEmail && process.env.RESEND_API_KEY) {
        const subjectLabel = subject || "Contact";
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: "Iconik Agency <noreply@iconikagency.fr>",
            to: notificationEmail,
            subject: `Nouveau message — ${subjectLabel}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
                    <h2 style="font-size: 20px; margin-bottom: 24px;">Nouveau message de contact</h2>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 140px;">Nom</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
                        </tr>
                        ${email ? `<tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #1a1a1a;">${email}</a></td>
                        </tr>` : ""}
                        ${phone ? `<tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Téléphone</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #1a1a1a;">${phone}</a></td>
                        </tr>` : ""}
                        ${subject ? `<tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600;">Objet</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${subject}</td>
                        </tr>` : ""}
                    </table>

                    <div style="margin-top: 24px;">
                        <p style="font-weight: 600; margin-bottom: 8px;">Message</p>
                        <p style="background: #f5f5f5; padding: 16px; border-radius: 4px; white-space: pre-wrap; margin: 0;">${message}</p>
                    </div>

                    <p style="margin-top: 32px; font-size: 12px; color: #999;">
                        Ce message a été envoyé via le formulaire de contact du site Iconik Agency.
                    </p>
                </div>
            `,
        });
        if (emailError) console.error("Resend error:", emailError);
        else console.log("Email envoyé:", emailData?.id);
    }

    return NextResponse.json({ success: true });
}
