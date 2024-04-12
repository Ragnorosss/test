import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
export async function POST(req: NextResponse) {
  const { SMTP_EMAIL, SMTP_PASS } = process.env;
  try {
    const { fullName, phone, email, service, text } = await req.json();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASS,
      },
    });
    const info = {
      from: email,
      to: SMTP_EMAIL,
      subject: service,
      text: text,
      html: `
                <p>Fullname : ${fullName}</p>
                <p>Phone: ${phone}</p>
                <p>Email: ${email}</p>
                <p>Service: ${service}</p>
                <p>Descriptions: ${text}</p>
            `,
    };

    await transporter.sendMail(info);
    return NextResponse.json({ message: "True", info }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "false" }, { status: 500 });
  }
}
