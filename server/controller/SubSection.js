const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require('../util/imageUploader');
exports.createSubSection = async(req,res) => {
    try
    {
        // Data
        const {sectionId,title,description,courseId} = req.body;
        // File 
        const video = req.files.videoFile;

        if(!sectionId || !title || !description || !courseId || !video)
        {
            return res.status(400).json({
                success:false,
                message:'All Fields are Required',
            })
        }
        // console.log(video);

        // Add video to cloudinary it will give a secure url
        const uploadVideo = await uploadImageToCloudinary(video,'Codehelp');
        console.log('Uploaded Video dtails : ',uploadVideo);

        // Add it into db
        const addSubSection = await SubSection.create(
            {   sectionId,
                title,
                // timeDuration,
                description,
                videoUrl:uploadVideo.secure_url
            },
        );

        console.log('SubSection created:', addSubSection); 

        // Update in Section 
        const updateSection = await Section.findByIdAndUpdate(sectionId,
            {
                $push:{
                    subSection:addSubSection._id,
                },
            },
            {new:true},
        ).populate('subSection');

        console.log('Updated Section with new SubSection:', updateSection);

        // Update Course too
        const updateCourse = await Course.findById(courseId)
            .populate("courseContent")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" }
            });

        console.log('Updated Section Course : ',updateCourse);

        return res.status(200).json({
            success:true,
            message:'SubSection has been created Successfully',
            addSubSection,
            updateSection,
            updateCourse,
        })

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Failed to Create SubSection',
            error:err.message,
        })
    }
}
exports.updateSubSection = async(req,res) => {
    try
    {
        const {subSectionId,title,timeDuration,description,courseId} = req.body;

        const video = req.files?.videoFile;     

        if(!subSectionId)
        {
            return res.status(400).json({
                success:false,
                message:'SubSection Id is Required',
            })
        }

        let updateData = {};
        if (title) updateData.title = title;
        if (timeDuration) updateData.timeDuration = timeDuration;
        if (description) updateData.description = description;

        if (video) {
            const uploadVideo = await uploadImageToCloudinary(video, 'Codehelp');
            updateData.videoUrl = uploadVideo.secure_url;
        }

        const updateSubSection = await SubSection.findByIdAndUpdate(subSectionId,
            updateData,
            {new:true},
        )

        if (!updateSubSection) {
            return res.status(404).json({
                success: false,
                message: 'SubSection not found',
            });
        }

        console.log('Updated Sub Section is : ',updateSubSection);
        
        // Return Updated Course
        const updateCourse = await Course.findById(courseId)
        .populate('courseContent')
        .populate(
            {
                path:'courseContent',
                populate:{path:'subSection'}
            }
        )
        console.log('Updated Course is : ',updateCourse);

        return res.status(200).json({
            success:true,
            message:'Sub Section Updated Successfully',
            updateSubSection,
            updateCourse,
        })  

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Failed to Update Sub Section',
            error:err.message,
        })
    }
}
exports.deleteSubSection = async(req,res) => {
    try
    {
        const{subSectionId,sectionId,courseId} = req.body;
        console.log('subSectionId : ',subSectionId);
        console.log('sectionId : ',sectionId);
        console.log('courseId : ',courseId);

        if(!subSectionId || !sectionId || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:'All fields Required',
            })
        }

        // Delete SubSection with help of subSectionId
        await SubSection.findByIdAndDelete(subSectionId);

        // Section se uski ID hata do 
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
                    {
                        $pull: { subSection: subSectionId }
                    }, 
                    { new:true }
                ).populate('subSection');

        console.log('Updated Section : ',updatedSection);

        const updateCourse = await Course.findById(courseId)
        .populate('courseContent')
        .populate(
            {
                path:'courseContent',
                populate:{path:'subSection'}
            }
        )

        return res.status(200).json({
            success:true,
            message:'SubSection has been Deleted Successfully',
            updateCourse,
            updatedSection,
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Failed to Delete Sub Section',
            error:err.message,
        })
    }
}   