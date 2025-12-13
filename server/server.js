const express = require('express');
const app = express();

// Import Routers
const courseRoutes = require('./routes/Course');
const paymentsRoutes = require('./routes/Payments');
const profileRoutes = require('./routes/Profile');
const userRoutes = require('./routes/User');

// Other Imports
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload'); 
const dbConnect = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 4000;


const seedCategories = require('./util/seedCategories');

// Import middlewares
app.use(express.json());
// For Using Cookies
app.use(cookieParser());
// For uploading image to cloudinary but mainly for accepting image as a response 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// For Cors which is used for coonecting frontend with backend
app.use(
    // Check karega ki request jo hai wo mere frontend se hi aana chaiye 
    cors({
        origin:[
            // Frontend Url
            'http://localhost:3000',
            'https://studynotion-frontend-bay-two.vercel.app' 
        ],
        credentials:true,
}))


// Connection with Database 
dbConnect();
// Connect with cloudinary 
cloudinaryConnect();

seedCategories();

// Mount Routes
app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/payments',paymentsRoutes);

// Default Route
app.get('/' , (req,res) => {
    return res.status(200).json({
        success:true,
        message:`Your Server is Up and Running`
    })
})

// Activate Server
app.listen(PORT , () => {
    console.log(`Your Server is Running at Port no ${PORT}`)
})