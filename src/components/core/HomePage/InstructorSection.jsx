import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Instructor from '../../../assets/Images/Instructor.png'
import Spanner from './Spanner'
import Button from './Button'
const InstructorSection = () => {
  return (
    <div className='flex gap-48 items-center'>
        {/* Left image Section */}
        <div className='w-[50%]'>
            <img src={Instructor}
            className='ml-20 shadow-[-15px_-15px_0px_#ffffff]'></img>
        </div>
        {/* Right Text Section */}
        <div className='w-[50%]'>

            <p className='text-3xl w-[30%] pb-3'>Become an <Spanner text={'instructor'}/></p>

            <p className='w-[70%] text-pure-greys-100 text-sm'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            
            {/* Button */}
            <div className='w-fit pt-16'>
                <Button active={true} linkto={'/signup'}>
                    <div className='flex items-center gap-2 font-medium'>
                        <p>Start Teaching Today</p>
                        <FaArrowRightLong/>
                    </div>
                </Button>
            </div>

        </div>
    </div>
  )
}

export default InstructorSection