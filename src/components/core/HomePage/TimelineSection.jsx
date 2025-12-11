import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'
const timeline = [
    {
        logo:Logo1,
        heading:'Leadership',
        subHead:'Fully committed to the success company',
    },
    {
        logo:Logo2,
        heading:'Responsibility',
        subHead:'Students will always be our top priority',
    },
    {
        logo:Logo3,
        heading:'Flexibility',
        subHead:'The ability to switch is an important skills',
    },
    {
        logo:Logo4,
        heading:'Solve the problem',
        subHead:'Code your way to a solution',
    },
]
const TimelineSection = () => {
  return (
    <div className='flex gap-15 pt-[2rem]'>

        {/* Left Section */}
        {/* H.W To add dotted lines */}
        <div className='w-[40%] flex flex-col gap-12 pt-20'>
            {
                timeline.map((element,index) => {
                    return(
                        <div className='pl-4 flex gap-3' key={index}>
                            {/* Logo and title 1 only for other map will do */}
                            <div className='w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center'>
                                <img src={element.logo}></img>
                            </div>
                            <div>
                                <p className='font-semibold'>{element.heading}</p>
                                <p>{element.subHead}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        {/* Right Section */}
        <div className='w-[55%] relative'>
            <img src={TimelineImage} className='z-10 relative shadow-[15px_15px_0_#ffffff]'></img>
            <div className='left-24 z-20 -bottom-12 flex items-center uppercase absolute w-[70%] h-[20%] text-white bg-caribbeangreen-700 gap-12'>
                <div className='flex w-[50%] gap-4 border-r-2 pl-10 pr-20 border-caribbeangreen-500'>
                    <p className='text-3xl font-semibold'>10</p>
                    <p className=' text-sm text-caribbeangreen-300'>Years Experiences</p>
                </div>
                <div className='flex w-[50%] gap-4'>
                    <p className='text-3xl font-semibold'>250</p>
                    <p className='text-sm text-caribbeangreen-300'>Types of Courses</p>
                </div>
                
            </div>
            <div className='absolute w-[700px] z-0 top-48 left-0 h-[260px] bg-gradient-ellipse-3'></div>
        </div>

    </div>
  )
}

export default TimelineSection