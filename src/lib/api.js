// lib/api.js
// Import seed data directly from your local file
import { services, stats, testimonials } from "../data/data";

export const api = {
  getStats: () => {
    return Promise.resolve(stats);
  },
  
  getServices: () => {
    return Promise.resolve(services);
  },
  
  getTestimonials: () => {
    return Promise.resolve(testimonials);
  },
  
  submitContact: async (formData) => {
    try {
      const response = await fetch("https://formsubmit.co/ajax/gastonniyitegeka2017@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Your form data
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not provided",
          phone: formData.phone || "Not provided",
          subject: formData.subject || "Contact Form Message",
          message: formData.message,
          
          // Email customization
          _subject: `🚚 ROUTE FREIGHT: ${formData.name} - ${formData.subject || "New Inquiry"}`,
          _replyto: formData.email,
          _template: "box",
          _captcha: "false",
          
          // Auto-reply to customer
          _autoresponse: `
Dear ${formData.name},

Thank you for contacting Route Freight!

We have received your inquiry regarding "${formData.subject || "your shipment"}". A dispatcher will review your message and get back to you within 2-4 hours.

For immediate assistance, please call us at: +1 (479) 280-8795

Your message:
"${formData.message.substring(0, 100)}${formData.message.length > 100 ? "..." : ""}"

Best regards,
Route Freight Dispatch Team
www.routefreight.com
          `,
          
          // Custom HTML email template (optional - makes it look beautiful)
          _custom_header: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
    .header { background: #ea580c; color: white; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; }
    .field { margin-bottom: 15px; padding: 10px; background: #f9fafb; border-left: 3px solid #ea580c; }
    .label { font-weight: bold; color: #374151; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
    .value { color: #111827; font-size: 14px; }
    .message-box { background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
    .badge { display: inline-block; background: #ea580c; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚚 Route Freight</h1>
      <p>New Contact Form Submission</p>
    </div>
    <div class="content">
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="badge">${new Date().toLocaleString()}</span>
      </div>
      
      <div class="field">
        <div class="label">📋 Name</div>
        <div class="value">${formData.name}</div>
      </div>
      
      <div class="field">
        <div class="label">✉️ Email</div>
        <div class="value">${formData.email}</div>
      </div>
      
      <div class="field">
        <div class="label">🏢 Company</div>
        <div class="value">${formData.company || "Not provided"}</div>
      </div>
      
      <div class="field">
        <div class="label">📞 Phone</div>
        <div class="value">${formData.phone || "Not provided"}</div>
      </div>
      
      <div class="field">
        <div class="label">📌 Subject</div>
        <div class="value">${formData.subject || "General Inquiry"}</div>
      </div>
      
      <div class="message-box">
        <div class="label">💬 Message</div>
        <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${formData.message}</div>
      </div>
    </div>
    <div class="footer">
      <p>Route Freight Logistics • 24/7 Dispatch • +1 (479) 280-8795</p>
      <p style="margin-top: 10px;">Respond directly to this email to reply to ${formData.name}</p>
    </div>
  </div>
</body>
</html>
          `
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const result = await response.json();
      return { success: true, message: "Message sent successfully" };
    } catch (error) {
      console.error("Form submission error:", error);
      throw new Error("Failed to send message");
    }
  },
};