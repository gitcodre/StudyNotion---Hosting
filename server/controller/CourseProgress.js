
// Ye check krega ki lecture complete hue ki nhi agar complete hua to markAsCompleted mei tick aa jaayega

const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

// Course Progress ke modal mei courseId userId aur completedVideos ka array hai 
exports.updateCourseProgress = async(req,res) => {
    const{courseId,subSectionId} = req.body;
    const userId = req.user.id;
    console.log('CourseId : ',courseId);
    console.log('Sub Section Id : ',subSectionId);
    console.log('User Id : ',userId);
    try
    {   
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection)
        {
            // Video present nhi hai 
            return res.status(404).json({
                success:false,
                message:'Video is not present',
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseId,
            userId,
        })  

        if(!courseProgress)
        {
            return res.status(404).json({
                success:false,
                message:'Course Progress not exist'
            })
        }

        // Kya phele se to wo video completed video nhi hai na
        if(courseProgress.completedVideos.includes(subSectionId))
        {
            // Phele se mark as completed hai to nhi dalna hai bhai 
            return res.status(404).json({
                success:false,
                message:'Video already marked completed'
            })
        }

        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:'Course video completed marked successfully',
            data:courseProgress,
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Internal Server error'
        })
    }

}   

exports.fetchCourseProgress = async(req,res) => {
    try
    {
        const {courseId} = req.body;
        const userId = req.user.id;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }

        const courseProgress = await CourseProgress.findOne(
            {courseId,userId}
        ).populate('completedVideos');

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "No progress found for this course",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course progress fetched successfully",
            data: courseProgress,
        });

    }
    catch(err)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}