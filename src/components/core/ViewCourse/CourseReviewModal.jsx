import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import GenericBtn from '../../common/GenericBtn';
import { createRating } from '../../../services/operations/ratingAndReview';

const CourseReviewModal = ({setCreateReviewModal}) => {
  const {user} = useSelector((state) => state.profile);
  const {courseEntireData} = useSelector((state) => state.viewCourse);
  const{
    handleSubmit,
    register,
    setValue,
    formState:{errors},
  } = useForm();

  useEffect(() => {
    setValue('courseExperience',"");
    setValue('courseRating',0);
  },[])

  const ratingChanged = (newRating) => {
    setValue('courseRating',newRating);
  }

  const onsubmit = async(data) => {
    await createRating({
      courseId:courseEntireData?._id,
      rating:data.courseRating,
      review:data.courseExperience,
    });
    setCreateReviewModal(false);
  }

  return (
  <div className="fixed inset-0 z-50 flex justify-center items-center text-richblack-5">

    {/* ✅ BACKGROUND BLUR (behind modal) */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setCreateReviewModal(false)}
    ></div>

    {/* ✅ MODAL (NO BLUR HERE) */}
    <div className="relative w-[50%] border border-richblack-700 h-fit rounded-md bg-richblack-900 z-50">

      {/* Modal Header */}
      <div className='bg-richblack-800 flex justify-between p-3 rounded-md px-4'>
        <h2 className='text-xl'>Add Review</h2>
        <button onClick={() => setCreateReviewModal(false)}>
          <IoCloseSharp/>
        </button>
      </div>  

      {/* Modal Body */}
      <div className='flex gap-x-2 items-center w-[30%] mx-auto mt-5'>
        <img src={user?.image} className='w-[50px] aspect-square rounded-full object-cover'/>
        <div className='flex flex-col'>
          <h2 className='text-[1.2rem]'>{user?.firstName} {user?.lastName}</h2>
          <p className='text-richblack-100'>Posting Publicly</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onsubmit)} className='w-[90%] mx-auto'>

        <div className='w-full flex justify-center '>
          <ReactStars 
            count={5}
            onChange={ratingChanged}
            size={26}
            activeColor="#ffd700"
          />
        </div>

        <div className='flex flex-col gap-1 mb-4'>
          <label>Add Your Experience <sup className="text-pink-200">*</sup></label>
          <textarea 
            className='rounded-md p-2'
            placeholder='Add Your Experience Here'
            rows={5}
            {...register('courseExperience',{required:true})}
          />
        </div>

        <div className='flex gap-x-2 justify-end mb-4'>
          <button
            type="button"
            className='text-black p-2 px-4 font-semibold rounded-md bg-richblack-400'
            onClick={() => setCreateReviewModal(false)}
          >
            Cancel
          </button>

          <GenericBtn 
            text={'Save'}
            customClasses={'bg-yellow-50 p-2 px-4 font-semibold rounded-md text-black'}
          />
        </div>
      </form>

    </div>
  </div>
)

}

export default CourseReviewModal