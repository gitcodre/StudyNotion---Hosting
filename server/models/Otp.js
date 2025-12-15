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

// --- Function to send email ---
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from StudyNotion",
            emailTemplate(otp)
        );
        console.log('Email Sent Successfully: ', mailResponse);
    } catch (err) {
        console.log('Error Occured while Sending mail');
        console.error(err.message);
        // Re-throw the error so the Mongoose save operation is aborted
        throw err; 
    }
}

// --- Pre-save Hook ---
otpSchema.pre('save', async function(next)
{
    // FIX: Only send email when a new document is created
    if (this.isNew) { 
        try {
            await sendVerificationEmail(this.email, this.otp);
            next(); // Proceed with saving after email is successfully sent
        } catch (err) {
            // If sendVerificationEmail throws an error, Mongoose will catch it 
            // and skip the save operation, which is the desired behavior.
            next(err); // Pass the error to Mongoose for proper handling
        }
    } else {
        // If the document is not new (e.g., being updated, though unlikely for OTP)
        next(); 
    }
});

module.exports = mongoose.model('Otp',otpSchema);