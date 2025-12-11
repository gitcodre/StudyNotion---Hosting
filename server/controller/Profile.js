const User = require('../models/User');
const Profile = require('../models/Profile');
const {uploadImageToCloudinary} = require('../util/imageUploader');
const { convertSecondsToDuration } = require('../util/secToDuration');
const CourseProgress = require('../models/CourseProgress');
const Course = require('../models/Course');
exports.updateProfile= async(req,res) => {
    try
    {
        // Data fetch
        const {dateOfBirth='',about='',gender,contactNumber,profession} = req.body;
        // Payload se login wale waha se nikala 
        const userId = req.user.id;
        // For updating Profile i need ProfileId and ProfileId is Stored in UserId
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        let profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        profileDetails.profession = profession;

        // Save it into DB
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            profileDetails,
        })

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Failed to Update Profile Details',
            error:err.message,
        })
    }
}
// How Can we Schedule this delete operation 
exports.deleteAccount = async(req,res) => {
    try
    {
        // get id
        console.log('token : ',req.token);
        console.log('Id : ',req.user.id);
        const id = req.user.id;
        // Validation
        const userDetails = await User.findById(id);
        if(!userDetails)
        {
            return res.status(404).json({
                success:false,
                message:'User does not Exist',
            })
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // Unenroll user from all enrolled courses
        // delete user 
        await User.findByIdAndDelete({_id:id});
        // H.W. : I also want StudentEnrolled Count should be reduced to 1
        // return response
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Failed to Delete Account',
            error:err.message,
        })
    }
}
// Saari details nikal do uss user ki
exports.getAllUserDetails = async(req,res) =>{
    try
    {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate('additionalDetails').exec();

        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            userDetails,
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Unable to fetch User Details',
            error:err.message,
        })
    }
}

// Update Profile Picture
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files?.displayPicture;
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } 
    catch (error) {
        console.log('Error : ',error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path:"courses",
          populate:{
            path:'courseContent',
            populate:{
              path:'subSection'
            }
          }
        }).exec()

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

// Instructor Dashboard Data
// Course and Stats Data Fetch 
exports.instructorDashboard = async(req,res) => {
  try{

    const CourseDetails = await Course.find({instructor:req.user.id});

    const CourseData = CourseDetails.map((course,index) => {
      const totalStudentEnrolled = course?.studentEnrolled.length;
      const totalAmount = totalStudentEnrolled * course?.price

      const CourseDataStats = {
        _id:course._id,
        courseName:course?.courseName,
        courseDesctiption:course?.courseDescription,
        totalStudentEnrolled,
        totalAmount,
      }
      return CourseDataStats
    })
    res.status(200).json({
      success:true,
      message:'Successfully fetched instructor data',
      data:CourseData,
    })
    
  }
  catch(err)
  {
    console.error(err.message);
    return res.status(500).json({
      success:false,
      message:'Internal Server Error'
    })
  }
}