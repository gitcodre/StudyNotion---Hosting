const User = require('../models/User');
const Course = require('../models/Course');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');
const crypto = require("crypto");
const {instance} = require('../config/razorpay');
const mailSender = require('../util/mailSender');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const CourseProgress = require('../models/CourseProgress');

exports.capturePayment = async(req,res) => {
    try{
        // courses will contain array of all courseId
        const {courses} = req.body;
        // Ye middleware ke yha se aaya 
        const userId = req.user.id;
        
        console.log('CourseId: ',courses);
        console.log('User Id : ',userId);
        if(!courses || courses.length === 0)
        {
            return res.status(400).json({success:false,message:'Please provide Course Id'});
        }
        let totalAmount = 0
        for(const course_id of courses)
        {   
            // I want to calculate total amount of all courses
            let course;
            try{
                course = await Course.findById(course_id);
                if(!course)
                {
                    return res.status(404).json({success:false,messagee:'Course could not found'});
                }

                // I also want to check kya user phele se to enrolled nhi hai na 
                // const uid = new mongoose.Types.ObjectId(userId);
                if(course?.studentEnrolled.includes(userId))
                {
                    return res.status(409).json({success:false,message:'You Have Already Enrolled in this course'});
                }

                totalAmount += course?.price;
            }
            catch(err)
            {
                console.error(err);
                return res.status(500).json({success:false,message:err.message});
            }
        }
        console.log('Total Amount : ',totalAmount);
        const options = {
            amount:totalAmount * 100,
            currency:'INR',
            receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`
        }
        console.log('Options : ',options);

        try{
            const paymentResponse = await instance.orders.create(options);
            res.status(201).json({
                success:true,
                message:paymentResponse
            })
            console.log("Hello");
            console.log("Payment Response : ",paymentResponse);
        }
        catch(err)
        {
            console.error(err);
            return res.status(500).json({
                success:false,
                message:'Could not initiate order',
            })
        }

    }
    catch(err)
    {
        console.error('Failed to create Order for Payment : ',err);
        res.status(500).json({
            success:false,
            message:'Failed to create Order'
        })
    }
}

exports.verifySignature = async(req,res) => {
    try{
        const razorpay_order_id = req.body.razorpay_order_id;
        const razorpay_payment_id = req.body.razorpay_payment_id;
        const razorpay_signature = req.body.razorpay_signature;
        const {courses} = req.body;
        const userId = req.user.id;
        console.log('OrderId : ',razorpay_order_id);
        console.log('PaymentId : ',razorpay_payment_id);
        console.log('signature : ',razorpay_signature);
        console.log('course : ',courses);
        console.log('userId : ',userId);

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId)
        {
            return res.status(400).json({
                success:false,
                message:'Could not verify Payment due to empty fields'
            })
        }

        let body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature =  crypto
            .createHmac('sha256',process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');
        
        if(expectedSignature === razorpay_signature)
        {
            // enroll krwao 
            await enrolledStudents(courses,userId,res);
            return res.status(200).json({
                success:true,
                message:'Payment Verified Successfully',
            })
        }
        return res.status(400).json({
            success:false,
            message:'Verification Failed'
        })

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Failed to verify Signature',
        })
    }
}

const enrolledStudents = async(courses,userId,res) =>
{
    if(!courses || !userId)
    {
        return res.status(400).json({success:false,message:'Please Provide Valid Data'});
    }
    for(const courseId of courses)
    {
        try
        {
            const updatedCourse = await Course.findByIdAndUpdate(
                courseId,
                {$push : {studentEnrolled:userId}},
                {new:true},
            )
            if(!updatedCourse) 
            {
                return res.status(500).json({
                    success:false,
                    message:'Could not find Courses',
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId,
                userId,
                completedVideos:[]
            })
                    
            const updatedUser = await User.findByIdAndUpdate(userId,
                {$push : {
                    courses:courseId,
                    courseProgress:courseProgress._id, 
                }},
                {new:true}
            )
            if(!updatedUser) 
            {
                return res.status(500).json({
                    success:false,
                    message:'Could not find User',
                })
            }
            const emailResponse = await mailSender(updatedUser?.email,`Successfully enrolled in to ${updatedCourse?.courseName}`,courseEnrollmentEmail(updatedCourse.courseName,updatedUser.firstName));

            console.log('Email Sent Successfully ',emailResponse);
        }
        catch(err)
        {
            console.error(err);
            return res.status(500).json({
                success:false,
                message:'Failed to enroll Students',
            })
        }
    }
}

exports.sendPaySuccessfullEmail = async(req,res) => {
    const {orderId,paymentId,amount} = req.body;
    const userId = req.user.id;

    console.log('OrderId : ',orderId);
    console.log('PaymentId : ',paymentId);
    console.log('Amount : ',amount);
        
    if(!orderId || !paymentId || !amount)
    {
        return res.status(400).json({
            success:false,
            message:'Please Provide all the fields'
        })
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(enrolledStudent?.email,`Payment Recieved`,paymentSuccessEmail(enrolledStudent?.firstName,amount/100,orderId,paymentId));
    }

    catch(err)
    {
        console.log("error in sending mail", err);
        return res.status(500).json({success:false, message:"Could not send email"})
    }
    
}

// Order ko create kr dena hai 
// exports.capturePayment = async(req,res) =>{
//     const {courses} = req.body;
//     const userId = req.user.id;

//     if(courses.length === 0)
//     {
//         return res.status(404).json({
//             success:false,
//             message:'Please Provide Valid Course Id',
//         })
//     }
//     let totalAmount = 0;
//     //  Course Detail is valid or not 
//     let course;
//     try{
//         course = await Course.findById(courseId);
//         if(!course)
//         {
//             return res.status(404).json({
//                 success:false,
//                 message:'Please Provide Valid Course Details',
//             })
//         }
//         // To check if user already purchased course or not 
//         const uid = mongoose.Types.ObjectId(userId);
//         if(course.studentEnrolled.includes(uid))
//         {
//             return res.status(400).json({
//                 success:false,
//                 message:'Student has already purchased this course',
//             })
//         }
//     }
//     catch(err)
//     {
//         console.error('Error : ',err);
//         return res.status(500).json({
//             success:false,
//             error:err.message,
//         })
//     }
//     const amount = course.price;
//     const currency = 'INR';
//     const options = {
//         amount : amount * 100,
//         currency,
//         receipt:`receipt_${Date.now()}`,
//         notes:{
//             courseId,
//             userId,
//         }
//     }
//     // instance.orders.create(options)
//     try{
//         const paymentResponse = await instance.orders.create(options);
//         console.log('Payment Response : ',paymentResponse);

//         return res.status(200).json({
//             success:true,
//             message:'Successfully Initiated the Order',
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })
//     }
//     catch(err)
//     {
//         console.error('Error : ',err);
//         res.status(500).json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
    
// }
// // Signature ko verify kr dena hai 
// exports.verifySignature = async(req,res) => {
//     try{
//         const webhookSecret = '123456';

//         // This signature is hash or encrypted by 3 step process
//         const signature = req.header('x-razorpay-signature');

//         // Same 3 step process required for hashing 
//         const shasum = crypto.createHmac('sha256',webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest('hex');

//         if(signature === digest)
//         {
//             console.log("Payment is Authorised");

//             const {courseId, userId} = req.body.payload.payment.entity.notes;
//             // Verified Api Route 
//             // Fulfuill demand of student 
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentEnrolled:userId}},
//                 {new:true},
//             )

//             if(!enrolledCourse)
//             {
//                 return res.status(500).json({
//                     success:false,
//                     message:'Course not Found',
//                 });
//             }

//             console.log(enrolledCourse);

//             const enrolledStudent = await User.findOneAndUpdate(
//                                                 {_id:userId},
//                                                 {$push:{courses:courseId}},
//                                                 {new:true},
//             );

//             console.log(enrolledStudent);


//             //mail send krdo confirmation wala 
//             const emailResponse = await mailSender(
//                                     enrolledStudent.email,
//                                     "Congratulations from CodeHelp",
//                                     "Congratulations, you are onboarded into new CodeHelp Course",
//             );

//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added",
//                 course: enrolledCourse,
//                 student: enrolledStudent
//             });

//         }
//         else
//         {
//             return res.status(400).json({
//                 success:false,
//                 message:'Invalid request',
//             });
//         }
//     }
//     catch(err)
//     {
//         console.log(err);
//             return res.status(500).json({
//                 success:false,
//                 message:err.message,
//             });
//     }
// }