import React, { useEffect, useState } from 'react'
import { fetchAllInstructorCourse, getInstructorData } from '../../../../services/operations/profile_api';
import { useSelector } from 'react-redux';
import Spinner from '../../../common/Spinner';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const DashboardIns = () => {

    const [loading,setLoading] = useState(false);
    const [InstructorData,setInstructorData] = useState(null);
    const [courses,setCourses] = useState([]);
    const {user} = useSelector((state) => state.profile)

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);

            const instructorDataResult = await getInstructorData();
            const result = await fetchAllInstructorCourse();
            setInstructorData(instructorDataResult);
            setCourses(result);

            setLoading(false);
        }
        getCourseDataWithStats();
    },[])

    useEffect(() => {
        console.log('Instructor Data UseState : ',InstructorData);
        console.log('Courses Data UseState : ',courses);
    },[InstructorData, courses])

    const totalAmount = InstructorData?.reduce((acc,curr) => acc + curr.totalAmount , 0);
    const totalStudentEnrolled = InstructorData?.reduce((acc,curr) => acc + curr.totalStudentEnrolled , 0);

  return (
    <div className='text-richblack-5 w-8/12 mx-auto pb-20'>
        <div className='mt-10'>
            <p className='text-2xl'>Hi {user?.firstName} 👋</p>
            <p className='text-richblack-300 mt-2'>Let's start something new</p>
        </div>

        {
            loading ? <Spinner/> : courses.length ? (
                <div>
                    {/* Stats Wala Diagram */}
                   <div className="my-4 flex h-[450px] space-x-4">
                        {/* Render chart / graph */}
                        {totalAmount > 0 || totalStudentEnrolled > 0 ? 
                        (
                            <InstructorChart courses={InstructorData} />
                        ) : 
                        (
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Visualize</p>
                            <p className="mt-4 text-xl font-medium text-richblack-50">
                            Not Enough Data To Visualize
                            </p>
                            </div>
                        )}

                        {/* Total Statistics */}
                        <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Statistics</p>
                            <div className="mt-4 space-y-4">
                                <div>
                                <p className="text-lg text-richblack-200">Total Courses</p>
                                <p className="text-3xl font-semibold text-richblack-50">
                                    {courses.length}
                                </p>
                                </div>

                                <div>
                                <p className="text-lg text-richblack-200">Total Students</p>
                                <p className="text-3xl font-semibold text-richblack-50">
                                    {totalStudentEnrolled}
                                </p>
                                </div>

                                <div>
                                <p className="text-lg text-richblack-200">Total Income</p>
                                <p className="text-3xl font-semibold text-richblack-50">
                                    Rs. {totalAmount}
                                </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Courses Listing */}
                    <div className='bg-richblack-800 mt-5 rounded-md'>
                        {/* Courses heading / View Course */}
                        <div className='flex justify-between items-center p-5 rounded-md'>
                            <p className='font-semibold '>Your Courses</p>
                            <Link to={'/dashboard/my-courses'}>
                                <p className='text-yellow-50 mr-4'>View All</p>
                            </Link>
                        </div>
                        {/* Courses Actual */}
                        <div className='flex gap-x-5 pl-5 pb-10'>
                            {
                                courses.slice(0,3).map((courses,index) => (
                                    <div key={index}>
                                        <img src={courses?.thumbnail} alt='courseThumnailImg' className='rounded-md h-[200px] w-[310px]'/>
                                        <p className='mt-5'>{courses?.courseName}</p>
                                        <p className='text-richblack-300 text-sm'>
                                            {courses?.studentEnrolled.length} students | Rs. {courses?.price}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            ) : (
            <div className='flex justify-center items-center h-screen -mt-32'>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-2xl'>You have not Created a Course</p> 

                    <Link to={'/dashboard/add-course'} className='mx-auto'>
                        <p className='bg-yellow-50 p-2 px-3 rounded-md text-black animate-pulse w-fit'>
                            Create a Course
                        </p>
                    </Link>
                </div>

            </div>)
        }

    </div>
  )
}

export default DashboardIns