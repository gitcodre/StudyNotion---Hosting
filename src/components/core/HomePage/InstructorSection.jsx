import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Instructor from '../../../assets/Images/Instructor.png'
import Spanner from './Spanner'
import Button from './Button'
const InstructorSection = () => {
  return (
    <div className='md:flex gap-48 items-center'>
        {/* Left image Section */}
        <div className='md:w-[50%] w-[80%]'>
            <img src={Instructor}
            className='md:ml-20 ml-10 md:mb-0 mb-10 shadow-[-15px_-15px_0px_#ffffff]'></img>
        </div>
        {/* Right Text Section */}
        <div className='md:w-[50%] w-full'>

            <p className='text-3xl md:w-[30%] pb-3 md:ml-0 ml-10'>Become an <Spanner text={'Instructor'}/></p>

            <p className='w-[70%] text-pure-greys-100 text-sm md:ml-0 ml-10'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            
            {/* Button */}
            <div className='w-fit md:pt-16 pt-10 md:ml-0 ml-20'>
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