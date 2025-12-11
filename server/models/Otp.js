const mongoose = require('mongoose');
const mailSender = require('../util/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 5*60,// expires after 5 minutes
    },
})

otpSchema.pre('save', async function(next)
{
    try
    {
        const mailResponse = await mailSender(this.email,
            "Verification Email from StudyNotion",
            emailTemplate(this.otp)
        );
        console.log('Email Sent Successfully: ', mailResponse);
        next();
    }
    catch(err)
    {
        console.log('Error Occured while Sending mail');
        console.error(err.message);
        next(err);
    }
})

module.exports = mongoose.model('Otp',otpSchema);