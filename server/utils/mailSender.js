const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from: '"NoteX(नोटेक्स)" <it22.vishalshivhare@svceindore.ac.in>',
            to: `${email}`, 
            subject: `${title}`,
            html: `${body}`,
        })

        console.log(info);
        return info;
    }
    catch (error) {
        console.log("Error in sending mail fun");
        console.log(error.message);
    }
}

module.exports = mailSender;
