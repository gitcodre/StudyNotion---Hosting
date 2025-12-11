import React from 'react'
import { useSelector } from 'react-redux'
import { TiTick } from "react-icons/ti";
import CourseInformationForm from './CourseInformationForm/CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm';
import PublishCourse from './PublishCourseField/PublishCourse';
const RenderSteps = () => {
    const{step} = useSelector((state) => state.course);
    const stepsdata = [
        {
            id:1,
            title:'Course Information',
        },
        {
            id:2,
            title:'Course Builder',
        },
        {
            id:3,
            title:'Publish'
        }
    ] 
  return (
    <div>
        <div className='flex justify-between w-[100%] pl-6'>
            {/* That 1,2,3 wala chiz  */}
            {
                stepsdata.map((element,index) => (
                    <div key={element.id} className='w-full flex items-center relative'>

                        {/* Circle and Title */}
                        <div className='flex flex-col gap-5 items-center'>
                            {/* Circle */}
                            <div 
                                className={`${step === element.id? ('bg-yellow-900 border border-yellow-50 text-yellow-50 px-4') : ('bg-richblack-800 border border-richblack-700 text-richblack-300 px-4')}
                                ${step > element.id && "bg-yellow-50 rounded-full"}
                                rounded-full py-2 z-20
                                `}
                            >
                                {
                                    step > element.id ? 
                                    (<div className='text-black'> 
                                        <TiTick fontSize={20} />
                                    </div>) : (
                                        <div className='font-semibold'>
                                            {element.id}
                                        </div>
                                    )
                                }
                            </div>
                            {/* Title */}
                            <div>   
                                <p className={`${step === element.id ? "text-richblack-5" : "text-richblack-500"}`}>
                                    {
                                        element.title
                                    }
                                </p>
                            </div>
                        </div>
                        
                        {/* Dashed Line */}
                        {
                            index < stepsdata.length-1 && (
                                <div
                                    className={`absolute top-4 left-[5.2rem] w-[70%] h-0 
                                    border-t-2 border-dashed
                                    ${step > element.id ? "border-yellow-300" : "border-richblack-500"}
                                    `}
                                >
                                </div>
                            )
                        }
                    </div>
            
                ))
            }
        </div>

        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/>}
        
    </div>
  )
}

export default RenderSteps