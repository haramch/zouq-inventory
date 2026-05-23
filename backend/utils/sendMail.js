const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "harrybarry9hi@gmail.com",
        pass: process.env['Email-Pass'],
    }
});

async function sendMail(to, subject, htmlContent) {
    try {
        const info = await transporter.sendMail({
            to: to,
            subject: subject,
            html: htmlContent,
            from: "harrybarry9hi@gmail.com"
        });
        console.log(`✅ Email sent to ${to}: ${info.response}`);
        return info;
    } catch (error) {
        console.error(`❌ Email send error to ${to}:`, error);
        throw error;
    }
}

module.exports = sendMail;
