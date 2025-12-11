// Router import
// Controller import 
// Create(get,put,post,delete) Route with controller

const express = require('express');
const router =  express.Router();

const {generateOtp,signup,login,changePassword} = require('../controller/Auth');
const {resetPasswordToken,resetPassword} = require('../controller/ResetPassword');

const {Auth} = require('../middleware/auth');

// User login signup route
router.post('/login' , login); // Success Route

router.post('/signup' , signup); // Success Route

router.post('/generateOtp' , generateOtp); // Success Route 

router.post('/changePassword' , Auth , changePassword);

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);//Success Route

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);//Success Route

module.exports = router;