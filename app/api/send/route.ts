import EmailTemplate from "@/email/contact-form-email";
import { validateString, getErrorMessage } from "@/lib/utils";
import { Resend } from "resend";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const formData = await req.formData();
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return new Response(JSON.stringify({ error: "Invalid sender email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!validateString(message, 5000)) {
    return new Response(JSON.stringify({ error: "Invalid message" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Portfolio <onboarding@resend.dev>",
      to: "anas.dev@icloud.com",
      subject: "Message from portfolio",
      replyTo: senderEmail,
      react: React.createElement(EmailTemplate, {
        message: message,
        senderEmail: senderEmail,
      }),
    });

    if (data) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (error) {
      return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
