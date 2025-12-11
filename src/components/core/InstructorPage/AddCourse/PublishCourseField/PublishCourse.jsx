import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setResetCourseState, setStep } from '../../../../../slice/courseSlice';
import GenericBtn from '../../../../common/GenericBtn';
import { COURSE_STATUS } from '../../../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/course_api';

const PublishCourse = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues
  } = useForm();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const {course} = useSelector((state) => state.course);
  const navigate = useNavigate();

  // Checkbox starting state is it will be check or uncheck 
  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED)
    {
      setValue('public',true);
    }
  },[])

  const gotoCourses = () => {
    dispatch(setResetCourseState());
    navigate('/dashboard/my-courses');
  }

  const handleCoursePublish = async() => {
    // To check if checkbox value changed or not 
    // 1st conditon - course.status === Published
    // 2nd condition - getValues('public') === true means checkbox ticked hai means course published hai 
    // 1 && 2nd condition - Published = Published then nothing changes check box didnt changed or course status did not changed so no need api call
    if(course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true || 
    course?.status === COURSE_STATUS.DRAFT && getValues('public') === false)
    {
      // koi update nhi hua form mei aur meine save pr click kiya hai to api call nhi jaani chaiye 
      // For edit Case 
      // If no Changes has been made in form 
      // no need to make an api call
      gotoCourses();
      return;
    }
    // if form is updated 
    const formData = new FormData()
    formData.append('courseId',course._id);
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append('status',courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData);

    if(result)
    {
      console.log('Result Status :',result);
      gotoCourses();
    }

    setLoading(false);

  }

  const onsubmit = () => { 
    handleCoursePublish();
  }

  return (

    // Course ka status publish - course user ko dikahana hai mycourses wali field mei 
    // Course ka status draft - course bana hai but usko hidden rakhna hai user se


    <div className='mt-10 w-[95%] bg-richblack-800 border border-richblack-700 rounded-md pb-10'>

      <p className='p-5 pt-8 text-2xl'>Publish Settings</p>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='flex gap-x-3 items-center px-5'>
          <input 
            type='checkbox'
            id='publish'
            name='public'
            {...register('public')}
            className="w-4 h-4 accent-yellow-50 bg-richblack-800 border border-richblack-600 rounded-md cursor-pointer"
          />
          <label className='text-richblack-400 cursor-pointer' htmlFor='publish'>Make this Course Public</label>
        </div>

        {/* Next/Prev Button */}
        <div className="ml-auto mt-10 mr-5 flex max-w-max items-center gap-x-4">
            <button
              disabled={loading}
              type="button"
              onClick={() => dispatch(setStep(2))}
              className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[6px] px-[20px] font-semibold text-richblack-900"
            >
              Back
            </button>
            <GenericBtn disabled={loading} text="Save Changes" 
              customClasses={'py-[6px] px-[15px] bg-yellow-50 rounded-md text-richblack-900 font-semibold'}
            />
        </div>
      </form>

    </div>
  )
}

export default PublishCourse