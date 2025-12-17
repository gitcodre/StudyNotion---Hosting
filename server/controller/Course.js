const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')
const {uploadImageToCloudinary} = require('../util/imageUploader');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const CourseProgress = require('../models/CourseProgress');
const { convertSecondsToDuration } = require('../util/secToDuration');

// createCourse handler function
exports.createCourse = async(req,res) => {
    try
    {
        let{courseName,courseDescription,whatYouWillLearn,price,category,tag,status,instructions}
        = req.body;

        const thumbnail = req.files?.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category ||!tag || !thumbnail)
        {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        if (!status || status === undefined) {
			status = "Draft";
		}

        // Validation for instructor check 
        const userid = req.user.id;
        const InstructorDetail = await User.findById(userid,{
            accountType:'Instructor',
        });
        console.log('Instructor Details : ',InstructorDetail);

        if(!InstructorDetail)
        {
            return res.status(400).json({
                success:false,
                message:'Instructor Details not Found',
            })
        }

        // Check for valid tag  
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails)
        {
            return res.status(404).json({
                success:false,
                message:'Category Details not Found',
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,'Babbar');

        // Create entry for new course ye naya course ki id 2 jagah daalni hai
        // User ke entry mei aur tag ke entry mei  
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:InstructorDetail._id,
            whatYouWillLearn,
            price,
            tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status,
            instructions,
        })

        // Add new Course to user Schema of instructor
        const updateUserCourse = await User.findByIdAndUpdate(
            {_id:InstructorDetail._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true},
        )
        console.log('User Schema after adding Course : ',updateUserCourse);

        // Add it to Category Schema too
        const updateCategoryCourse = await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{
                    course:newCourse._id,
                }
            },
            {new:true},
        )
        console.log('Category Schema after adding Course : ',updateCategoryCourse);

        return res.status(200).json({
            success:true,
            message:'Course has been created Successfully',
            data:newCourse,
        })


    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Unable to create Course',
            error: err.message,
        })
    }
}
// getAllCourse handler function
exports.showAllCourses = async(req,res) => {
    try{
        // Todo : Change the below statement incrementally
        const allCourse = await Course.find({},
            {
				courseName: true,
				price: true,
				thumbnail: true,
                courseDescription: true,
                status:true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
        ).populate("instructor")
		.exec();
        return res.status(200).json({
            success:true,
            message:'Data for all Courses Fetched Successfully',
            data:allCourse,
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch Course data',
            error:err.message,
        })
    }
}

// getCourseDetails - It is a course specific details 
exports.getCourseDetails = async(req,res) => {
    try
    {
        const {courseId} = req.body;
        //find Course Details
        const courseDetails = await Course.findById(courseId)
                                    // isme Section or uska subSection nikalna hai 
                                    .populate(
                                        {
                                            path:'courseContent',
                                            populate:{
                                                path:'subSection',
                                            }
                                        }
                                    )
                                    .populate('ratingAndReview')
                                    .populate('category')
                                    // Isme instructor ka additionalDetails nikalna hai 
                                    .populate(
                                        {
                                            path:'instructor',
                                            populate:{
                                                path:'additionalDetails',
                                            }
                                        }
                                    )
        if(!courseDetails)
        {
            return res.status(404).json({
                success:false,
                message:'Course Details is not Present',
            })
        }
        
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        const courseDetailsObj = courseDetails.toObject();
        courseDetailsObj.totalDuration = totalDuration;

        console.log('Course Details : ',courseDetails);
    
        return res.status(200).json({
            success:true,
            message:'Successfully Fetched Course Details',
            courseDetails:courseDetailsObj,
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

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        'Codehelp'
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    
    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 }).populate('category');

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses, 
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
// Get Full details of a single course
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    console.log('CourseDetails : ',courseDetails);

    if (courseDetails.status === "Draft" && courseDetails?.instructor?.accountType !== 'Instructor') {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

