// Isne Saara Mail Bana kar de diya mujhe bas use karna hai isko apne OTP Model mei
const nodemailer = require('nodemailer');

const mailSender = async(email,title,body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            secure: true,   // Use true for Port 465
            port: 465,      // Port 465 is often more reliable for Gmail on Cloud
            family: 4,      // Force IPv4 (Crucial for Render/Vercel)
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }

        })
        let infoMail = await transporter.sendMail({
            from: `"StudyNotion || Codehelp - by Animesh" <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(infoMail);
        return infoMail;
    }
    catch(err)
    {
        console.log('Error in Intializing Mail');
        console.error(err.message);
        throw err;
    }
}
module.exports = mailSender;