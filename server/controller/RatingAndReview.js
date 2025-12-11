const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRating = async(req,res) => {
    try
    { 
        // What data i need ?
        // I need course data to know kaun se course pr rate krna hai 
        // I need user data to know kis user ne rate kiya hai 
        // I need to know wo user ne kitna rating diya hai aur kya review hai
        const userId = req.user.id;
        const {courseId,rating,review} = req.body;
        // Validation Processes
        if(!userId || !courseId || !rating || !review)
        {
            return res.status(400).json({
                success:false,
                message:'All Fields are Required',
            })
        } 
        // Find that course 
        const courseDetails = await Course.findById(courseId);
        // I have to check if user has purchased that course or not 
        // Coz only if he has purchased it he can do rating otherwise not 
        if(!courseDetails.studentEnrolled.includes(userId))
        {
            return res.status(403).json({
                success:false,
                message:'User is not Enrolled in this Course !! He Cannot Review',
            })
        }
        // I have to check ki kya wo user phele se to rating nhi diya hai na 
        const existingRating = await RatingAndReview.findOne(
            { course: courseId, user: userId }
        );
        // Check if user has already rated or not 
        if(existingRating)
        {
            // Already rated
            return res.status(400).json({
                success:false,
                message:'User has already rated this Course',
            })
        }
        // If not then he can rate it 
        const rateUser = await RatingAndReview.create({
            rating : Number(rating),
            review,
            user:userId,
            course:courseId,
        });
        console.log('User Rating : ',rateUser);
    
        // Now if user has rated then i have to update in course too 
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
                            {
                                $push:{
                                    ratingAndReview:rateUser._id,
                                }
                            },
                            {new:true},
        ).populate('ratingAndReview');
    
        console.log('Updated Course : ',updatedCourse);
    
        return res.status(200).json({
            success:true,
            message:'User has Successfuly Rated this Course',
            updatedCourse,
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
// getAverageRating
exports.getAverageRating = async(req,res) => {
    try
    {
        const {courseId} = req.body;
        // Kya Course already exist karta hai ya nahi
        const courseDetails = await Course.findById(courseId);
        if(!courseDetails)
        {
            return res.status(404).json({
                success:false,
                message:'Course is Missing',
            })
        }
        // Now i have to aggregate rating and review
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg : '$rating'},
                }
            }
        ])
        // Mongo Db will return 
        // [
        //     { _id: null, averageRating: 3.5 }
        // ]
        // result is an array, even if there’s only one group.

        // $match → filter only reviews for the course.
        // $group → aggregate all these reviews and calculate the average rating.
        // $avg → MongoDB operator that calculates the mean of numeric values.
        // Result is an array with _id and averageRating.

        const averageRating = result[0] ? result[0].averageRating : 0;
        return res.status(200).json({
            success:true,
            averageRating,
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
// getAllRating
exports.getAllRating = async(req,res) => {
    try
    {
        // why sort in decreasing coz in home page rating should see like 5 or 4 star
        // not like start from 1 or 2 star thats why it leaves bad impression 
        const allReviews = await RatingAndReview.find({})
                                        .sort({rating:'desc'}) 
                                        .populate({
                                            path:'user',
                                            select:'firstName lastName email image',
                                        })
                                        .populate({
                                            path:'course',
                                            select:'courseName',
                                        })
                                        .exec();
        return res.status(200).json({
            success:true,
            message:'All Reviews Fetched Successfully',
            allReviews,
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}