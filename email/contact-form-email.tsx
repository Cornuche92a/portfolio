import React from "react";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export default function EmailTemplate({
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <html>
      <body style={{ backgroundColor: "#f7fafc", color: "#000000" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "20px",
              marginTop: "40px",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              You received the following message from the contact form
            </h1>
            <p style={{ fontSize: "16px", lineHeight: "1.5" }}>{message}</p>
            <hr style={{ border: "1px solid #e2e8f0", margin: "20px 0" }} />
            <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
              The sender's email is: {senderEmail}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}