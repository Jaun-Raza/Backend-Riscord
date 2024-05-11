import { client } from "../client.js";
import nodemailer from 'nodemailer';

export async function generateOtp (req, res) {
    let { email } = req.body

    await client.set(`Users:${email}:otp`, Math.floor(1000 + Math.random() * 9000));
    await client.expire(`Users:${email}:otp`, 5 * 60);
    const otp = await client.get(`Users:${email}:otp`)

    const emailConfig = {
        service: 'gmail',
        auth: {
            user: 'jaungaming45@gmail.com', 
            pass: 'euej fcwq bxwp mvop' 
        },
        tls: {
            rejectUnauthorized: false
        }
    };

    const transporter = nodemailer.createTransport(emailConfig);

    const message = {
        from: "'Riscord' <riscord@gmail.com>",
        to: email,
        subject: "Otp for your registration - Riscord",
        html: `Your OTP for registration is: ${otp}`
    };

    await transporter.sendMail(message);

    return res.status(200).json({ message: `OTP Sent!`, success: true })

}

export async function checkOtp(req, res)  {
    let { email, otp } = req.body
    const checkOtp = await client.get(`Users:${email}:otp`)

    if (!checkOtp || checkOtp === null) {
        return res.status(401).json({ error: "OTP Expired!, Generate a new one" })
    } else {
        if (otp === checkOtp) {
            res.json(`${otp}, This OTP is correct!`);
        } else {
            res.status(401).json({ error: "Wrong OTP entered!", success: false });
        }
    }

}