import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
};

const buildHtml = ({ name, email, subject, message }) => `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#0d0d1f;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr><td style="padding:32px 16px;">
          <table role="presentation" width="560" align="center" cellspacing="0" cellpadding="0"
                 style="background:#12122b;border:1px solid #2a2a4a;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;background:linear-gradient(120deg,#8b7dff,#4fe0d9);">
                <h1 style="margin:0;font-size:20px;color:#07070f;">New portfolio message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;color:#e9e9ff;">
                <p style="margin:0 0 12px;">You received a new message from your portfolio.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                       style="font-size:14px;color:#c6c9e8;">
                  <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a4a;">Name</td>
                      <td style="padding:8px 0;border-bottom:1px solid #2a2a4a;color:#fff;font-weight:bold;">${escapeHtml(name)}</td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a4a;">Email</td>
                      <td style="padding:8px 0;border-bottom:1px solid #2a2a4a;color:#fff;">${escapeHtml(email)}</td></tr>
                  <tr><td style="padding:8px 0;border-bottom:1px solid #2a2a4a;">Subject</td>
                      <td style="padding:8px 0;border-bottom:1px solid #2a2a4a;color:#fff;">${escapeHtml(subject || '—')}</td></tr>
                  <tr><td style="padding:8px 0 0 0;vertical-align:top;">Message</td>
                      <td style="padding:8px 0 0 0;color:#fff;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#0a0a18;font-size:12px;color:#5d6080;">
                Sent automatically from your portfolio site.
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
  </html>
`;

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);

export const sendContactEmail = ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"Portfolio Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `You received a new message from your portfolio.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || '—'}\n\n${message}`,
    html: buildHtml({ name, email, subject, message }),
  };

  return getTransporter().sendMail(mailOptions);
};