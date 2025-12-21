import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../../services/operations/profile_api';
import { setCourse, setEditCourse } from '../../../../../slice/courseSlice';
import RenderSteps from '../RenderSteps';
import Spinner from '../../../../common/Spinner';
import { FaAngleLeft } from "react-icons/fa6";


const EditCourseForm = () => {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {courseId} = useParams();
    const navigate = useNavigate();
    
    const getDetailedCourse = async() =>{
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId);
        if(result?.courseDetails)
        {
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails));
        }
        setLoading(false);
    }

    useEffect(() => {
        getDetailedCourse();
    },[])

    if(loading)
    {
        return <Spinner/>
    }
  return (
    <div className='lg:w-5/12 md:w-8/12 w-8/12 mx-auto mt-10 text-richblack-5'>
        <button className='mb-2 flex items-center gap-x-2' onClick={() => navigate(-1)}>
            <FaAngleLeft/>
            Back 
        </button>

        <h1 className='text-richblack-5 mb-10 text-2xl'>Edit Course</h1>
        <div>
            {
                course? (<RenderSteps/>) : (<div>Course not found</div>)
            }
        </div>
    </div>
  )
}

export default EditCourseForm