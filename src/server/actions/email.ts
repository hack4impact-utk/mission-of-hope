import nodemailer from 'nodemailer';

export async function sendEmail(
  recipients: string[],
  subject: string,
  body: string
) {
  try {
    // Note: Verification w/ app password requires a 2FA'd Google Account
    // The MoH mailer acct currently has 2FA tied to Ethan Maness's
    // phone number -- 423-276-1498
    // Text me or email me at ethanhmaness@gmail.com if there are issues.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_ADDR,
        pass: process.env.MAILER_APP_PASS,
      },
    });

    const emailOptions = {
      from: process.env.EVENTS_EMAIL_ADDR,
      to: recipients.join(','),
      subject: subject,
      html: body,
    };

    await transporter.sendMail(emailOptions);

    return recipients;
  } catch (error) {
    throw error;
  }
}
