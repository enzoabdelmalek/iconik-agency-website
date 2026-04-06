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

    // Send confirmation email to the sender
    if (email && process.env.RESEND_API_KEY) {
        await resend.emails.send({
            from: "Iconik Agency <noreply@iconikagency.fr>",
            to: email,
            subject: "Nous avons bien reçu votre message — Iconik Agency",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
                    <h2 style="font-size: 20px; margin-bottom: 8px;">Merci pour votre message, ${name}.</h2>
                    <p style="color: #666; margin-top: 0;">Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p>

                    <div style="margin: 32px 0; padding: 20px; background: #f9f9f9; border-left: 3px solid #1a1a1a;">
                        ${subject ? `<p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 0 0 8px 0;">Objet</p>
                        <p style="margin: 0 0 16px 0; font-weight: 600;">${subject}</p>` : ""}
                        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 0 0 8px 0;">Votre message</p>
                        <p style="margin: 0; white-space: pre-wrap; color: #444;">${message}</p>
                    </div>

                    <p style="color: #666;">À très bientôt,<br/><strong>L'équipe Iconik Agency</strong></p>

                    <p style="margin-top: 40px; font-size: 11px; color: #bbb;">
                        Cet email est un accusé de réception automatique, merci de ne pas y répondre directement.
                    </p>
                </div>
            `,
        });
    }

    return NextResponse.json({ success: true });
}
