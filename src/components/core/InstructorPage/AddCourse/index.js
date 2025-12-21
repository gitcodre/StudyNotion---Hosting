import React from 'react'
import RenderSteps from './RenderSteps';

const AddCourse = () => {
    return (
        <div className='text-richblack-5 w-[75%] pt-[4rem] lg:mx-auto lg:pl-10'>
            <h1 className='text-3xl'>Add Course</h1>

            <div className='md:flex justify-between gap-10'>
                <div className='mt-10 md:w-[60%] w-[90%] md:mb-0 mb-10'>
                    <RenderSteps/>
                </div>

                <div className='bg-richblack-800 border border-richblack-700 rounded-md py-6 -mt-6 lg:mr-20 md:pl-6 pl-2 lg:w-[35%] md:w-[40%] md:mr-0 mr-6 h-fit'>
                    <h2 className='font-semiblod text-xl mb-3'>⚡Course Upload Tips</h2>
                    <ul className='text-sm list-disc pl-6 flex flex-col gap-2 w-[90%]'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>


        </div>
    )
}
export default AddCourse;