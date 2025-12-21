import React from 'react'
import { HiMiniUsers } from "react-icons/hi2";
import { TiFlowMerge } from "react-icons/ti";
const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  const isActive = cardData.heading === currentCard;

  return (
    <div
    onClick={() => setCurrentCard(cardData.heading)}
    className={`md:w-[70%] w-[90%] mx-auto ${(isActive)? 
    'bg-white text-richblack-900 shadow-[10px_10px_0px_0px_#FFD60A]' : 
    'bg-richblack-800 text-richblack-5 '} cursor-pointer lg:pt-8 md:pt-4 pt-2 lg:translate-x-0 md:-translate-x-10 flex flex-col md:mb-0 mb-10 
    justify-between hover:scale-105 transition-all duration-200`}>


      <div>
        <h2 className='pl-8 font-semibold text-xl pb-4'>{cardData.heading}</h2>
        <p className='w-[90%] pl-8 text-richblack-500 '>{cardData.description}</p>
      </div>
      
      <div className='lg:pt-20 '>
        <div className="w-full border-t-2 border-dashed border-pure-greys-100 opacity-50 mx-auto mt-6 mb-3"></div>

        <div className={`flex pb-4 justify-between items-center ${(isActive)? 
        'text-blue-500':'text-richblack-200'}`
        }>
          <div className='flex items-center gap-2 pl-8 font-inter hover:scale-105 transition-all duration-200'>
            {/* Icon */}
            <HiMiniUsers/>
            <p>{cardData.level}</p>
          </div>
          <div className='flex items-center gap-2 pr-10 font-inter hover:scale-105 transition-all duration-200'>
            {/* Icon */}
            <TiFlowMerge/>
            <p>{cardData.lessionNumber} Lessons</p>
          </div>
          
        </div>
      </div>

      
    </div>
  )
}

export default CourseCard