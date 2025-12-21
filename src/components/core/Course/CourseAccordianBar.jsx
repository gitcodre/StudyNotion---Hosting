import React, { useEffect, useState, useRef } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import CourseSubSectionAccordion from './CourseSubSectionAccordion';


const CourseAccordianBar = ({course,isActive,handleActive}) => {
    const contentEl = useRef(null);
    // Accordian State
    const [active, setActive] = useState(false)
    useEffect(() => {
        setActive(isActive?.includes(course._id))
    }, [isActive])

    const [sectionHeight, setSectionHeight] = useState(0)
    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0)
    }, [active])

  return (
    <div className='mt-10 overflow-hidden border border-solid border-richblack-600 bg-richblack-700 lg:w-[60%] md:w-[80%] text-richblack-5'>
        <div>

            <div className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]'
                onClick={() => handleActive(course._id)}
            >
                {/* Left Side */}
                <div className='flex items-center gap-x-2'>
                    <i
                        className={
                            isActive.includes(course._id) ? 'rotate-0' : 'rotate-180'
                        }
                    >
                        <IoIosArrowUp/>
                    </i>
                    {course?.sectionName}
                </div>
                {/* Right Side */}
                <div className="space-x-4">
                    <span className="text-yellow-25">
                        {`${course.subSection.length || 0} lecture(s)`}
                    </span>
                </div>

            </div>

            <div
                ref={contentEl}
                className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                style={{
                height: sectionHeight,
            }}
            >
                <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
                    {
                        course?.subSection.map((subSec, i) => {
                            return <CourseSubSectionAccordion subSec={subSec} key={i}/>
                        })
                    }
                </div>
            </div>

        </div>
    </div>
  )
}

export default CourseAccordianBar