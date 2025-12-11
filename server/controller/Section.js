const Course = require('../models/Course');
const Section = require('../models/Section');

exports.createSection = async (req,res) => {
    try
    {
        const{courseId,sectionName} = req.body;

        if(!courseId || !sectionName)
        {
            return res.status(400).json({
                success:false,
                message:'All Fields Required',
            })
        }

        const addSection = await Section.create({sectionName});
        console.log('Section added : ', addSection);

        const updateCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent:addSection._id,
                },
            },
            {new:true},
        ).populate('courseContent');

        console.log('updated Course : ',updateCourse);

        return res.status(200).json({
            success:true,
            message:'Section has been created Successfully',
            addSection,
            updateCourse,
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating section',
            error: err.message,
        });
    }
    
}

exports.updateSection = async(req,res) => {
    try
    {
        const{sectionName,sectionId,courseId} = req.body;

        if(!sectionId || !sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:'All Fields Required',
            })
        }

        const updateSection = await Section.findByIdAndUpdate(sectionId,
            {sectionName},
            {new:true},
        );

        console.log('Updated Section : ',updateSection);
        // Update course too 
        const updateCourse = await Course.findById(courseId)
            .populate("courseContent")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" }
            });

        console.log('Updated Section Course : ',updateCourse);

        if (!updateSection) 
        {
            return res.status(404).json(
            {
                success: false,
                message: 'Section not found',
            });
        }

        console.log('Updated Section : ',updateSection);

        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',
            updateSection,
            updateCourse,
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while Updating section',
            error: err.message,
        });
    }
}

exports.deleteSection = async(req,res) => {
    try{

        const{sectionId,courseId} = req.body;

        if(!sectionId || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:'All Fields Required',
            })
        }

        // delete Section
        await Section.findByIdAndDelete(sectionId);

        // Extra thing Rememeberrr like Update in course too
        const updatedCourse = await Course.findByIdAndUpdate(courseId, 
            {
                $pull: { courseContent: sectionId }
            }, 
            { new:true }
        ).populate({
            path: "courseContent",
            populate: { path: "subSection" }
        });

        console.log('Updated Course : ',updatedCourse);
        return res.status(200).json({
            success:true,
            message:'Section Deleted Successfully',
            updatedCourse,
        });
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'Failed to Delete a Section',
        });
    }
}