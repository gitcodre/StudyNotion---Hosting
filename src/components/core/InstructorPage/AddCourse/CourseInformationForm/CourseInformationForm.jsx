import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../../../../services/operations/auth_api';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import RequirementField from './RequirementField';
import MyTag from './MyTag';
import GenericBtn from '../../../../common/GenericBtn';
import { setCourse, setStep } from '../../../../../slice/courseSlice';
import toast from 'react-hot-toast';
import { addCourseDetails, editCourseDetails } from '../../../../../services/operations/course_api';
import { COURSE_STATUS } from '../../../../../utils/constant';
import Upload from '../Upload'


// Comments important to understand about editCourse 
// editCourse: false means:
// “User is creating a NEW course, not editing an existing one.”

// This button behaves differently depending on editCourse.
// CASE A — When creating a new course:
// editCourse = false
// Button says: “Next”
// Functionality:
// Validate fields
// Save form data to Redux
// Move to next step

// CASE B — When editing a course:
// editCourse = true
// Button says: “Save Changes”
// Functionality:
// Only if isFormUpdated = true ➜ make update API call
// Save updated fields
// Move to next step
// If isFormUpdated = false →
// It warns:
// “Nothing changed bro. Why save?”

// Button 1: Continue Without Saving
// Meaning:
// "I know I made edits, but I DON'T want to save them. Move ahead anyway."

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    }=useForm();

    const dispatch = useDispatch();
    const {course,editCourse,step} = useSelector((state) => state.course);
    const [loading,setLoading] = useState(false);
    const [category,setCategory] = useState([]);

    const fetchCategory = async() => {
        setLoading(true);
        const response = await getCategory();
        if(response.length > 0){
            setCategory(response);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCategory();    
        // gives id name description
        const currentValues = getValues();
        // console.log('Current Category Id : ',currentValues?.courseCategory);
        // console.log('Api Category Id : ',course?.category[0]?._id);
        console.log('Current Course Tags', currentValues?.courseTags);
        console.log('Api Course Tags : ', course?.tag);

        if(editCourse)
        {
            setValue('courseTitle',course.courseName);
            setValue('courseShortDesc',course.courseDescription);
            setValue('coursePrice',course.price);
            setValue('courseTags',course.tag);//string
            setValue('courseBenefits',course.whatYouWillLearn);
            // setValue('courseCategory',course.category[0]._id);//Array
            setValue('courseRequirements',course.instructions);//string
            setValue('courseImage',course.thumbnail);
        }
    },[]);   

    useEffect(() => {
        console.log('Category : ',category);
        if(editCourse && category.length > 0) {
            setValue('courseCategory', course.category[0]._id);
        }
    }, [category, editCourse]); 

    const isFormUpdated = () => {
        // CurrentValues jo form mei details bharne ya set krne ke bdd milti hai  
        // jaha bhi humne register daala hai usme by default setValue call ho jata hai value set ho jata hai
        const currentValues = getValues();

        if(currentValues.courseTitle !== course.courseName || 
            currentValues.courseShortDesc !== course.courseDescription || 
            currentValues.coursePrice !== course.price || 
            currentValues.courseTags.toString() !== course.tag.toString() || 
            currentValues.courseBenefits !== course.whatYouWillLearn || 
            currentValues.courseCategory !== course.category[0]._id || 
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        )
        {
            return true;
        }
        return false;
    }

    // handles next button click
    const onSubmit = async(data) => {
        // Ye Save Changes Wala Button hai 
        console.log('Form ka Data : ',data);
        if(editCourse)
        {
            // it will check kya sach mei mere form mei koi changes ya edit hua bhi hai kya
            if(isFormUpdated())
            {
                // Changes ya edits hue hai 
                const currentValues = getValues();
                // New object bana diya isme saare edited data jaayenge
                const formData = new FormData();
                
                formData.append("courseId", course._id)
                // Check kro kaun kaun se fields change ya edit kiye gye hai
                if(currentValues.courseTitle !== course.courseName)
                {
                    // Edit hua hai 
                    formData.append('courseName',data.courseTitle);
                }
                if(currentValues.courseShortDesc !== course.courseDescription)
                {
                    // Edit hua hai 
                    formData.append('courseDescription',data.courseShortDesc);
                }
                if(currentValues.coursePrice !== course.price)
                {
                    // Edit hua hai 
                    formData.append('price',data.coursePrice);
                }
                if(currentValues.courseTags.toString() !== course.tag.toString())
                {
                    // Edit hua hai 
                    formData.append('tag',JSON.stringify(data.courseTags));
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn)
                {
                    // Edit hua hai 
                    formData.append('whatYouWillLearn',data.courseBenefits);
                }
                if(currentValues.courseCategory !== course.category[0]._id)
                {
                    // Edit hua hai 
                    formData.append('category',data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString())
                {
                    // Edit hua hai 
                    formData.append('instructions',JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                // Edit hone ke bdd formData ke andar kuch aa jaayega to use save krdo api call marke    update kro
                console.log('Edit wala FormData : ',formData);

                setLoading(true);
                let result = await editCourseDetails(formData);
                console.log('Printing result : ',result);
                setLoading(false);
                if(result)
                {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else
            {
                toast.error('No Changes have been made');
            }
            return;
        }
        else
        {
            // New course hai edit wala nhi 
            const formData = new FormData();
            // course ka saara details register ke setValue mei hoga 
            formData.append('courseName', data.courseTitle);
            formData.append('courseDescription', data.courseShortDesc);
            formData.append('price', data.coursePrice);
            formData.append('whatYouWillLearn', data.courseBenefits);
            // Here in Category id will get stored
            formData.append('category', data.courseCategory);
            formData.append('instructions', JSON.stringify(data.courseRequirements));
            formData.append('tag', JSON.stringify(data.courseTags));
            formData.append('status', COURSE_STATUS.DRAFT);
            formData.append("thumbnailImage", data.courseImage)

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            setLoading(true);
            const result = await addCourseDetails(formData);

            if(result)
            {
                console.log('Printing result inside : ',result);
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }
    }

  return (
    <div className='mt-10 md:p-5 py-5 px-2 w-full border border-richblack-700 bg-richblack-800 rounded-md'>
       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            {/* Course Title */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='title'>Course Title <sup className="text-pink-200">*</sup></label>
                <input 
                    type='text'
                    id='title'
                    className='bg-richblack-700 rounded-lg p-3'
                    placeholder='Enter Course Title'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    {...register('courseTitle', {
                        required:{value:true,message:"Course title is required"},
                    })}
                />
                {errors.courseTitle && <span className='text-pink-200 text-sm'>{errors.courseTitle.message}</span>}
            </div>

            {/* Course Description */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='desc'>Course Short Description<sup className="text-pink-200">*</sup></label>
                <textarea 
                    id='desc'
                    rows={5}
                    className='bg-richblack-700 rounded-lg p-3'
                    placeholder='Enter Description'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    {...register('courseShortDesc', {
                        required:{value:true,message:"Course Description is required"},
                    })}
                />
                {errors.courseShortDesc && <span className='text-pink-200 text-sm'>{errors.courseShortDesc.message}</span>}
            </div>

            {/* Course Price */}
            <div className='flex flex-col gap-2 relative'>
                <label htmlFor='paisa'>Price<sup className="text-pink-200">*</sup></label>
                <input 
                    type='text'
                    id='paisa'
                    className='bg-richblack-700 rounded-lg p-3 pl-10'
                    placeholder='Enter Price'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    {...register('coursePrice', {
                        required:{value:true,message:"You have to Add Price Here"},
                    })}
                />
                <div className='absolute top-[55%] left-2 text-richblack-500'>
                    <RiMoneyRupeeCircleLine fontSize={24}/>
                </div>
            </div>
            {errors.coursePrice && <span className='text-pink-200 text-sm -mt-2'>{errors.coursePrice.message}</span>}

            {/* Category */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='CategoryDetail' className='text'>Category<sup className="text-pink-200">*</sup></label>
                <select 
                    id='CategoryDetail'
                    className='bg-richblack-700 rounded-lg p-3 '
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    {...register('courseCategory' , {
                        required:'Category field is required'
                    })}
                >
                    <option value=''>Choose a Category</option>
                    {
                        !loading && category.map((cat,index) => (
                            <option key={index} value={cat?._id}>
                                {cat?.name}
                            </option>
                        ))
                    }
                </select>
                {errors.courseCategory && <span className='text-pink-200 text-sm'>{errors.courseCategory.message}</span>}

            </div>

            {/* Tags -- For which you have to make a custom component */}
            <MyTag 
                name='courseTags'
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                label='Tags'
                editCourse={editCourse}
                course={course}
            />

            {/* Thumbnail -- You have to make an another component */}
            {/* 1. User selects image */}
            {/* 2. You show a preview */}
            {/* 3. You send that image in FormData to backend */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            {/* course Benefits */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='benefits'>Benefits of the course<sup className="text-pink-200">*</sup></label>
                <textarea 
                    id='benefits'
                    rows={5}
                    className='bg-richblack-700 rounded-lg p-3'
                    placeholder='Enter Benefits of the course'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    {...register('courseBenefits', {
                        required:{value:true,message:"Course Benefits is required"},
                    })}
                />
                {errors.courseBenefits && <span className='text-pink-200 text-sm'>{errors.courseBenefits.message}</span>}
            </div>

            {/* Requirments/Instructions */}
            <RequirementField 
                name='courseRequirements'
                label='Requirements/Instructions'
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Buttons */}
            {/* Ye button uss case mei kaam aayega jb hume edit krna ho form ko mtlb update krna ho course ko */}
            <div className='flex justify-end items-center gap-2'>
                {
                    editCourse && (
                        <button
                            className='md:text-base text-sm bg-richblack-300 w-fit p-1 rounded-md px-3 text-richblack-900 font-bold'
                            onClick={() => dispatch(setStep(2))}
                        >
                            Continue Without Saving
                        </button>
                    )
                }
            {/* Save Changes jb edit krna ho form ko tbhi use karna hoga mtlb yani agar details update ki hongi form mei to uss course ko update kro aur wo checking ki form update hui ya nahi wo isFormUpdated dekhega  */}
                <GenericBtn 
                    text={!editCourse ? "Next" : "Save Changes"}
                    customClasses={'bg-yellow-50 text-richblack-900 py-1 px-4 rounded-md md:text-base text-sm'}
                />
            </div>

       </form>
    </div>
  )
}

export default CourseInformationForm