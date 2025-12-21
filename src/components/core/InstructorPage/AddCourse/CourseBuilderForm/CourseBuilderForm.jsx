import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import GenericBtn from '../../../../common/GenericBtn';
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowRight , MdKeyboardArrowLeft } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from '../../../../../slice/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/section_api';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  const{
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  }=useForm();

  const {course} = useSelector((state) => state.course);
  // editSectionName mei section ki id hogi 
  const [editSectionName,setEditSectionName] = useState(null);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName','');
  }
  
  // Back Button Logic
  const backHandler = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }
  
  // Next Button Logic
  const nextHandler = () => {
    // Perform Some Validations then you can move to next step
    // Validation 1 : kya mere mei koi section present hai ki nhi 
    if(course?.courseContent?.length === 0)
    {
      toast.error('You have to add at least one Section');
      return;
    }
    if(course?.courseContent.some((section) => section.subSection.length === 0))
      {
        toast.error('Please add at least one lecture in each section');
        return;
      }
    dispatch(setStep(3));

  }
  
  const handleChangeEditSectionName = (sectionId,sectionName) => {
    // But ek baar aur edit button pe click hua to edit cancel ho jana chaiye
    if(editSectionName === sectionId)
    {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue('sectionName',sectionName);
  }
    
  const onsubmit = async(data) => { 
        
    setLoading(true);
    let result;

    // Button cliked is Edit Section Name so it will contain section Id
    if(editSectionName)
    {
      // Section ko Edit karna hai 
      result = await updateSection({
        sectionName:data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      })
      // console.log('Updated Section Result : ', result);

    }
    // Button cliked is Create Section so it will not any contain section Id
    else
    {
      // Create New Section
      result = await createSection({
        courseId:course._id,
        sectionName:data.sectionName,
      })
      // console.log('Add Section Result : ',result);
    }

    if(result)
    {
      // console.log('Course Before Update : ',course);
      dispatch(setCourse(result));  
      setEditSectionName(null);
      setValue('sectionName',"");
    }

    setLoading(false);
  }

  // useEffect(() => {  
  //   console.log('Course After Update : ',course); 
  //   console.log('Section Length : ',course?.courseContent?.length)
  // },[course]);  

  return (
    <div className='lg:m-10 my-10 md:w-[95%] bg-richblack-800 border border-richblack-700 rounded-md pb-10'>

      <h2 className='md:p-5 py-5 px-3 text-2xl'>Course Builder</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='md:pl-5 pl-2 md:pr-5 pb-5 w-full flex flex-col gap-2'>
          <label htmlFor='section'>Section Name <sup className="text-pink-200">*</sup></label>
          <input 
            type='text'
            id='section'
            name='sectionName'
            className='bg-richblack-700 rounded-lg p-3 w-full '
            placeholder='Add a section to build your course'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register('sectionName', {
              required:{value:true,message:"Course Section is required"},
            })}
          />
          {
            errors.sectionName && 
            <span className='text-pink-200 text-sm '>{errors.sectionName.message}</span>
          }
          <div className='flex gap-4 items-center'>
            {/* Edit Section Name or Create Section Button */}
            <GenericBtn 
              type={'Submit'}
              text={editSectionName ? "Edit Section Name" : "Create Section"}
              customClasses={'border flex flex-row-reverse items-center md:gap-2 gap-1 border-yellow-50 text-yellow-50 w-fit mt-4 rounded-md md:p-2 md:px-3 p-1 px-1'}
            >
              <MdOutlineAddCircleOutline fontSize={23}/>
            </GenericBtn>

            {/* Cancel/Edit Button */}
            {
              editSectionName && (
                <button
                  className='text-richblack-300 underline text-sm pt-4'
                  onClick={cancelEdit}
                >
                  Cancel/Edit
                </button>
              )
            }
            
          </div>
        </div>
      </form>
      
      {
        course?.courseContent?.length > 0 && (
          // Render NestedView
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex md:justify-end md:pr-5 md:pl-0 pl-2 md:gap-x-4 gap-x-2'>
        {/* Back Button */}
        <button className='flex items-center bg-richblack-800 md:p-2 md:px-4 p-1 px-2 rounded-md border border-richblack-300'
          onClick={backHandler}
        >
          <MdKeyboardArrowLeft/>
          Back
        </button>
        {/* Next Button */}
        <GenericBtn
          text={'Next'}
          customClasses={'bg-yellow-50 md:p-2 md:px-4 p-1 px-2 rounded-md flex items-center text-richblack-900'}
          onclick={nextHandler}

        >
          <MdOutlineKeyboardArrowRight/>
        </GenericBtn>
      </div>
      
    </div>
  )
}

export default CourseBuilderForm