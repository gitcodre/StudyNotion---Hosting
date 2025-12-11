import React from 'react'
import Spanner from './Spanner'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'
const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-2 mt-36'>
      <p className='text-3xl font-semibold text-center'>Your swiss knife for <Spanner text={'learning any language'}/></p>
      <p className='text-richblack-600 font-medium w-[55%] text-base mx-auto text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

      <div className='flex items-center justify-center translate-x-10 '>
        <img className='object-contain -mr-32' src={knowYourProgress}></img>
        <img className='object-contain' src={compareWithOthers}></img>
        <img className='object-contain -ml-36' src={planYourLessons}></img>
      </div>

      <div className='w-fit mx-auto'>
        <Button active={true} linkto={'/signup'}>
          <p className='font-bold'>Learn More</p>
        </Button>
      </div>

    </div>
  )
}

export default LearningLanguageSection