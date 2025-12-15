// Isne Saara Mail Bana kar de diya mujhe bas use karna hai isko apne OTP Model mei
const nodemailer = require('nodemailer');

const mailSender = async(email,title,body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            secure:false,
        })
        console.log("MAIL_USER:", process.env.MAIL_USER);
        console.log("TO EMAIL:", email);
        console.log("TITLE:", title);

        if (!process.env.MAIL_USER) {
        throw new Error("MAIL_USER env variable missing");
        }

        if (!email || !email.includes("@")) {
        throw new Error("Invalid recipient email");
        }

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