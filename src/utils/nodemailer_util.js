import { createTransport } from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporterGmail = createTransport ({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },    
})


export default async function sendMailGmail(titulo, texto) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: titulo,
        text: texto
    }

    try {
        const response = await transporterGmail.sendMail(mailOptions)
        console.log(response);
        
    } catch (error) {
        console.log(error);
    }
}
