const jwt = require('jsonwebtoken');
require('dotenv').config();
// Login hone ke baad 
// auth
exports.Auth = (req,res,next) => {
    console.log("Cookies ka token :", req.cookies);
    console.log("Header mei token:", req.header("Authorization"));
    try
    {   
        // Fetch Token
        const token = req.cookies.token || req.body.token || req.header('Authorization')?.replace('Bearer ',''); 
        console.log('Token Auth ka : ',token);
        
        if(!token)
        {
            return res.status(400).json({
                success:false,
                message:'Token is missing',
            })
        }

        try{
            const payload =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            // Payload mei email id account type hai 
            req.user = payload;
            req.token = token;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        
        next();
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:'Failed to Verify token . Token may be Invalid',
        })
    }
}
// isStudent
exports.isStudent = (req,res,next) => {
    if(req.user.accountType !== 'Student')
    {
        return res.status(401).json({
            success:false,
            message:'This is a Protected route for Student',
        })
    }
    next();
}
// isInstructor
exports.isInstructor = (req,res,next) => {
    if(req.user.accountType !== 'Instructor')
    {
        return res.status(401).json({
            success:false,
            message:'This is a Protected route for Instructor',
        })
    }
    next();
}
// isAdmin
exports.isAdmin = (req,res,next) => {
    if(req.user.accountType !== 'Admin')
    {
        return res.status(401).json({
            success:false,
            message:'This is a Protected route for Admin',
        })
    }
    next();
}