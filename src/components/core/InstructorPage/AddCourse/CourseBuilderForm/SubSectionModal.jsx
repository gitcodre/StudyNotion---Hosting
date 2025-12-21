import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { CreateSubSection, UpdateSubSection } from '../../../../../services/operations/section_api';
import { setCourse } from '../../../../../slice/courseSlice';
import { RxCross2 } from "react-icons/rx";
import GenericBtn from '../../../../common/GenericBtn';
import toast from 'react-hot-toast';
import Upload from '../Upload';


const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {

  const dispatch = useDispatch();
  const {course} = useSelector((state) => state.course);
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm();

  // Initialize kro value ko using setValue jb form render hoga tb setValue set ho jaayegi
  useEffect(() => {
    // Left side react ke form mei jo naam use hoga wo aur right side mei jb hum edit krenege tb jo data pass hoga wo modalData mei aayega to kbhi future mei hume view krna ho to humare pass recent data rehena chaiye to ye data yha initialize ho jaayega 
    if(view || edit)
    {
      setValue('lectureTitle',modalData.title);
      setValue('lectureDesc',modalData.description);
      setValue('TimeDuration',modalData.timeDuration);
      setValue('lectureVideo',modalData.videoUrl);
    }
  },[])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVideo !== modalData.videoUrl)
    {
      return true;
    }
    return false;
  }

  const handleEditSubSection = async() => {

    const currentValues = getValues();
    const formData = new FormData();

    // SubSection ID
    formData.append('subSectionId',modalData._id);
    formData.append('courseId',course._id);

    formData.append('sectionId',modalData.sectionId);
    // If this data change then only append
    if(currentValues.lectureTitle !== modalData.title)
    {
      // Changes happened
      // Left side : title - jo backend mei data ka naam hai wo likho
      // Right side : currentValues.lectureTitle jo form mei data present hai wo likho
      // To update hogya
      formData.append('title',currentValues.lectureTitle);
    }
    // TimeDuration : formData mei jo naam hai wo 
    // Right : timeDuration jo backend mei naam hai wo
    if(currentValues.TimeDuration !== modalData.timeDuration)
    {
      formData.append('timeDuration',currentValues.TimeDuration);
    }
    if(currentValues.lectureDesc !== modalData.description)
    {
      formData.append('description',currentValues.lectureDesc);
    }
    if(currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await UpdateSubSection(formData);
    console.log('Updated SubSection Result  : ', result);
    if(result)
    {
      console.log('Before Update SubSection Course : ',course);
      dispatch(setCourse(result));
      console.log('After Update Subsection Course : ',course);
    }
    setModalData(null);
    setLoading(false);
  }

  const onsubmit = async(data) => {
    if(view)
    {
      return;
    }
    if(edit)
    {
      if(!isFormUpdated())
      {
        // No update has been done
        toast.error('Please Update at least one Field Before Saving');
      }
      else
      {
        await handleEditSubSection();
        return;
      }
    }

    // Add Sub Section Logic
    // First add the data in an object then call the function
    const formData = new FormData();
    formData.append('courseId',course._id);
    formData.append('sectionId',modalData.sectionId);
    formData.append('title',data.lectureTitle);
    formData.append('description',data.lectureDesc);
    formData.append('timeDuration',data.TimeDuration);
    formData.append("videoFile", data.lectureVideo);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    setLoading(true);
    // Api Call
    const result = await CreateSubSection(formData);
    // console.log('Add SubSection Result : ',result);
    if(result)
    {
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  }



  return (
      <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-40 pointer-events-none"></div>
        <div className="bg-richblack-800 md:w-[600px] rounded-md relative z-50 pointer-events-auto">


          <div className='mb-5 flex justify-between bg-richblack-700 py-3 px-5 '>
            <p className='text-xl'>{view && 'Viewing'} {add && 'Adding'} {edit && 'Editing'} Lecture</p>
            <button onClick={() => (!loading && setModalData(null))}>
              <RxCross2 fontSize={20}/>
            </button>
          </div>

          <form onSubmit={handleSubmit(onsubmit)}>

            {/* Lecture Title */}
            <div className='p-5 flex flex-col gap-2'>
              <label htmlFor='title'>Lecture Title <sup className="text-pink-200">*</sup></label>
              <input 
                type='text'
                name='lectureTitle'
                id='title'
                className='bg-richblack-700 rounded-lg p-3 w-full'
                disabled={view}
                placeholder='Enter Lecture Title'
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register('lectureTitle',
                  {
                    required:{value:true,message:'Lecture Title is Required'}
                  }
                )}
              />
              {
                errors.lectureTitle && (
                  <span className='text-pink-200 text-sm '>{errors.lectureTitle.message}</span>  
                )
              }
            </div>

            {/* Lecture Video */}
            <div className='px-5'>
              <Upload
                name='lectureVideo'
                    label='Lecture Video'
                    register={register}
                    setValue={setValue}
                    video={true}
                    errors={errors}   
                    view={view} 
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
              />
            </div>

            {/* Video Playback Time */}

            {/* Lecture Description */}
            <div className='p-5 flex flex-col gap-2'>
              <label htmlFor='description'>Lecture Description <sup className="text-pink-200">*</sup></label>
              <textarea 
                name='lectureDesc'
                rows={5}
                id='description'
                className='bg-richblack-700 rounded-lg p-3 w-full'
                disabled={view}
                placeholder='Enter Lecture Description'
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register('lectureDesc',
                  {
                    required:{value:true,message:'Lecture Description is Required'}
                  }
                )}
              />
              {
                errors.lectureDesc && (
                  <span className='text-pink-200 text-sm '>
                    {errors.lectureDesc.message}
                  </span>  
                )
              }
            </div>

            {/* Buttons */}
            {
              !view && (
                <div className='flex justify-end p-5'>
                  <GenericBtn 
                    text={edit ? "Save Changes" : "Save"}
                    customClasses='bg-yellow-50 p-2 rounded-md text-richblack-900 px-4'
                  />
                </div>
              )
            }

          </form>
        </div>
      </div>  
  )
}

export default SubSectionModal