const User = require('../models/User');
const mailSender = require('../util/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
// resetPasswordToken - mail send krne ka kaam 
exports.resetPasswordToken = async(req,res) => {
    try
    {
        // fetch email
        const {email} = req.body;
        console.log('Email : ',email);
        // Verify email
        if(!email)
        {
            return res.status(401).json({
                success:false,
                message:'Email is required',
            })
        }
        const user = await User.findOne({email});
        if(!user) 
        {
            return res.status(404).json({
                success:false,
                message:'Your email is not registered with us',
            });
        }
        // Generate token coz i want to create frontend url This token is just random 
        const token = crypto.randomUUID();
        console.log('token : ',token);
        //Update in db coz for every user has its token and expiration time
        const updatedUser = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now() + 5*60*1000,
            },
            {new:true},    
        )

        // Create url
        const url = `${process.env.FRONTEND_URL}/forgot-password/${token}`;

        // Send it through mail
        await mailSender(email,'Password Reset Link',`Password Reset Link url : ${url}`);
        console.log('Mail Sent Successfully'); 

        return res.status(200).json({
            success:true,
            message:'Email Send Successfully Please Check mail and update Password',
            token,
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while resetting password',
        })
    }
}

// resetPassword - Exact Password db mei update krna 
exports.resetPassword = async (req,res) => {
    try
    {
        // password,confirmPassword,token
        const{password,confirmPassword,token} = req.body;
        console.log('Token: ',token);
        // Password and confirmPassword check
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:'Password do not match',
            })
        }
        const userDetails = await User.findOne({token : token});
        console.log('User : ',userDetails);
        if(!userDetails)
        {
            return res.status(400).json({
                success:false,
                message:'Token is invalid',
            })
        }
        // Date.now - current time & userDetails.resetPasswordExpires - Expiry Time 
        else if(userDetails.resetPasswordExpires < Date.now())
        {
            return res.status(400).json({
                success:false,
                message:'Token is Expired , Please regenerate the token',
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        const updatePassword = await User.findOneAndUpdate(
                {token:token},
                {password:hashPassword},
                {new:true},
        )
        return res.status(200).json(
        {
            success:true,
            message:'Password Reset Successfull',
        })
        
    }
    catch(err)
    {
        return res.status(500).json(
        {
            success:false,
            message:'Something went wrong while resetting password', 
        })
    }
}