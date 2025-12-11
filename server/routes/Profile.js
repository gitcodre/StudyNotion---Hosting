// Router import
// Controller import 
// Create(get,put,post,delete) Route with controller

const express = require('express');
const router =  express.Router();

const{updateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture, getEnrolledCourses, instructorDashboard} = require('../controller/Profile');

const{Auth, isInstructor} = require('../middleware/auth');
// User Can update its profile 
// Student and instructor both can update their profile

router.put('/updateProfile' , Auth , updateProfile);// Success Route

// Ig it should be in user coz user which is student account can be deleted
router.delete('/deleteProfile' , Auth, deleteAccount);//Success Route

// Ig this should be in User kyuki aap user ki saari details nikal rhe ho na naki profile ki
router.get("/getUserDetails", Auth, getAllUserDetails); // Success Route 

// Get Enrolled Courses
router.get("/getEnrolledCourses", Auth, getEnrolledCourses); // Needs to be Check
router.put("/updateDisplayPicture", Auth , updateDisplayPicture); // Success Route

router.get('/instructorDashboard', Auth, isInstructor , instructorDashboard);




module.exports = router;