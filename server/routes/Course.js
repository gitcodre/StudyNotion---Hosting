// Router import
// Controller import 
// Create(get,put,post,delete) Route with controller

const express = require('express');
const router =  express.Router();

// For Course Controller
const{createCourse,showAllCourses,getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails} = require('../controller/Course');
// For Category Controller
const{createCategory,fetchCategory,categoryPageDetails} = require('../controller/Category');
// For RatingAndReview Controller
const{createRating,getAverageRating,getAllRating} = require('../controller/RatingAndReview');
// For Section 
const{createSection,updateSection,deleteSection} = require('../controller/Section');
// For SubSection
const{createSubSection,updateSubSection,deleteSubSection} = require('../controller/SubSection');

const{updateCourseProgress, fetchCourseProgress} = require('../controller/CourseProgress');
// For Authentication middleware
const {Auth,isStudent,isInstructor,isAdmin} = require('../middleware/auth');

// Create Routes for Instructor 
// Go with flow of application

// Instructor Create Course
router.post('/createCourse', Auth , isInstructor , createCourse);//Success Route
// Edit Course routes
router.post("/editCourse", Auth, isInstructor, editCourse);
// get Instructor courses
router.get('/getInstructorCourses',Auth,isInstructor,getInstructorCourses);
// Delete Course
router.delete('/deleteCourse',deleteCourse);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", Auth, getFullCourseDetails);


// It Added Section to it 
router.post('/addSection', Auth , isInstructor , createSection);//Success Route
// It can updateSection
router.post('/updateSection', Auth , isInstructor , updateSection);//Success Route
// It can deleteSection
router.post('/deleteSection', Auth , isInstructor , deleteSection);//Success Route



// Edit Sub Section
router.post("/updateSubSection", Auth, isInstructor, updateSubSection);//Success Route
// Delete Sub Section
router.post("/deleteSubSection", Auth, isInstructor, deleteSubSection);//Success Route
// Add a Sub Section to a Section
router.post('/addSubSection', Auth , isInstructor , createSubSection);//Success Route

// Now since section subsection created


// Show All Courses
router.get('/getAllCourses', showAllCourses);//Success Route
// Get Details of Specific Course
router.post('/getCourseDetails', getCourseDetails);//Success Route

// Course Progress
router.post('/updateCourseProgress',Auth,isStudent,updateCourseProgress);
router.post('/fetchCourseProgress',Auth,isStudent,fetchCourseProgress);




// Admin Role Category Routes
// Create Category
router.post('/createCategory', Auth , isAdmin , createCategory);//Success Route
// Get All Category
router.get('/showAllCategories',fetchCategory);//Success Route
// getCategoryPageDetails
router.post('/getCategoryPageDetails', categoryPageDetails);



// Student Thing 
// Student rating aur review de sakta hai course ko 
// Create Rating
router.post('/createRating', Auth , isStudent , createRating);
// get avg rating
router.get("/getAverageRating", getAverageRating);
// get all ratings
router.get("/getReviews", getAllRating);

module.exports = router;

