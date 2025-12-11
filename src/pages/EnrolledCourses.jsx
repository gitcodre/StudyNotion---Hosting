import React, { useEffect, useState } from 'react'
import { fetchCourse } from '../services/operations/profile_api';
import Spinner from '../components/common/Spinner';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const [enrolledCourse,SetEnrolledCourse] = useState([]);
    const navigate = useNavigate();
    const getEnrolledCourse = async () => {
        try{
            const response = await fetchCourse(); 
            console.log('Enrolled Course Response : ',response);
            SetEnrolledCourse(response);
        }
        catch(err)
        {
            console.error('Error in fetching Course : ',err.message);
        }
    }
    useEffect(() => {
        getEnrolledCourse();
    },[])
  return (
    <div className='w-[75%]'>
        <h2 className='text-richblack-5 mt-20 text-3xl mb-4'>Enrolled Courses</h2>
        {
            !enrolledCourse ? (
                <Spinner/>
            ) : 
            (
                !enrolledCourse.length ? (
                    <div className='text-richblack-5 text-3xl bg-gradient-to-r from-blue-300 to-blue-300 bg-clip-text text-transparent w-full flex justify-center items-center min-h-screen -mt-[6rem]'> 
                        You haven't Enrolled in any Courses Yet
                    </div>
                ) : (
                    <div>
                        <div className='flex flex-col justify-between bg-richblack-700 text-richblack-50 rounded-md'>
                            <div className='flex bg-richblack-700 p-2 rounded-md'>
                                <p className='w-[45%]'>Course Name</p>
                                <p className='w-[30%] pl-10 '>Durations</p>
                                <p className='w-1/5 px-2'>Progress</p>
                            </div>
                            {/* Cards Shuru Hote hain  */}
                            {
                                enrolledCourse.map((course,index) => {
                                    return (
                                        <div key={index} className='w-full flex items-center text-richblack-5 bg-richblack-900 pt-2 border border-t-0 border-richblack-500 p-4 cursor-pointer'>

                                            {/* Course Name */}
                                            <div className='flex gap-2 w-[45%]'
                                                onClick={() => {
                                                    navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
);

                                                }}
                                            >
                                                <img src={course?.thumbnail} alt="course_img"
                                                    className="h-14 w-14 rounded-lg object-cover"/>

                                                <div>
                                                    <p>{course?.courseName}</p>
                                                    <p className='text-richblack-300'>
                                                        {course.courseDescription.length > 50
                                                        ? `${course.courseDescription.slice(0, 50)}...`
                                                        : course.courseDescription}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Durations */}
                                            <div className='w-[30%] pl-10 text-richblack-50'>
                                                {/* {course?.totalDuration} */}
                                                2h 30mins
                                            </div>

                                            {/* Progress */}
                                            <div className='flex w-1/5 flex-col gap-2 px-2 py-3'>
                                                <p className='text-sm'>Progress : {course.progressPercentage || 0}%</p>
                                                <ProgressBar 
                                                    completed={course.progressPercentage || 0}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                />
                                            </div>

                                        </div>
                                    )
                                })

                            }
                        </div>
                    </div>
                )
            )
        }


    </div>
  )
}

export default EnrolledCourses