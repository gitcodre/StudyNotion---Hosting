// Router import
// Controller import 
// Create(get,put,post,delete) Route with controller

const express = require('express');
const router =  express.Router();

// Payments Controller
const {capturePayment,verifySignature, sendPaySuccessfullEmail} = require('../controller/Payments');
const { Auth, isStudent } = require('../middleware/auth');

// Handle Route
// This payment related thing handled by Student
router.post('/capturePayment',Auth , isStudent , capturePayment);
router.post('/verifySignature',Auth, isStudent, verifySignature);
router.post('/sendPaymentSuccessfullEmail',Auth,isStudent,sendPaySuccessfullEmail);

module.exports = router;
