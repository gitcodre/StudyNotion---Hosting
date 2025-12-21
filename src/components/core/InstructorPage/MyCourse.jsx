import React, { useEffect, useState } from 'react'
import { fetchAllInstructorCourse } from '../../../services/operations/profile_api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import GenericBtn from '../../common/GenericBtn';
import CourseTable from './AddCourse/InstructorCourses/CourseTable';

const MyCourse = () => {
    const [courses,setCourses] = useState([]);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchInstructorCourse(){
        setLoading(true);
        const result = await fetchAllInstructorCourse()
        console.log('Fetched Courses result : ', result);
        if(result)
        {
            setCourses(result);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchInstructorCourse();
    },[]);

  return (
    <div className='lg:w-10/12 md:w-[80%] lg:ml-10 max-w-[1080px]'>

        <div className='flex justify-between pt-10 md:w-[80%] mx-auto'>
            <h2 className='text-richblack-5 md:text-3xl text-xl'>My Courses</h2>
            <GenericBtn 
                text={'Add Course'}
                onclick={() => navigate('/dashboard/add-course')}
                disabled={loading}
                customClasses={'font-semibold bg-yellow-50 flex items-center gap-x-2 md:p-2 md:px-3 p-2 md:text-base text-sm rounded-md text-richblack-900 cursor-pointer hover:scale-95 transition-all duration-300'}
            >
                <FaPlus/>
            </GenericBtn>
        </div>
        {/* Baki table bacche hai */}
        {/* Ye table tabhi dikhane ka fayda hai jab course exist krte ho */}
        {
            courses ? <CourseTable courses={courses} setCourses={setCourses}/> : (<div>
                <p className='text-richblack-5'>
                    You dont have any courses yet
                </p>
            </div>)
        }

    </div>
  )
}

export default MyCourse