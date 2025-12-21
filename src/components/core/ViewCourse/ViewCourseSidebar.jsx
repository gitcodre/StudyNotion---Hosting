import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaAngleUp } from "react-icons/fa";
import { apiConnector } from '../../../services/apiConnector';
import { course } from '../../../services/api_url';


const ViewCourseSidebar = ({setCreateReviewModal,markedLectures,setMarkedLectures}) => {

    // Kaun sa Section Active hai
    const [activeStatus,setActiveStatus] = useState('');
    // Kaun sa Lecture Actice hai
    const [videobarActive,setVideoBarActive] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); 
    const {sectionId,subSectionId} = useParams();

    const {courseSectionData,courseEntireData,totalNoOfLectures} = useSelector((state) => state.viewCourse);

    const {FETCHCOURSEPROGRESS_API} = course

    useEffect(() => {
        if (!courseSectionData?.length) return;

        const currentsectionIndex = courseSectionData.findIndex((data) => (
            data._id === sectionId
        ))

        if (currentsectionIndex === -1) return;

        const currentsubSectionIndex = courseSectionData?.[currentsectionIndex]?.subSection.findIndex((data) => (
            data._id === subSectionId
        ));
            
        const sectionIndexId = courseSectionData?.[currentsectionIndex]?._id;

        const subSectionIndexId = courseSectionData?.[currentsectionIndex]?.subSection?.[currentsubSectionIndex]?._id 

        setActiveStatus(sectionIndexId);
        setVideoBarActive(subSectionIndexId);

    },[courseEntireData,courseSectionData,location.pathname])

    useEffect(() => {
        if (!courseEntireData?._id) return;
        const fetchCourseProgress = async () => {
            const courseId = courseEntireData?._id;
            const response = await apiConnector('POST',FETCHCOURSEPROGRESS_API,{courseId});
            console.log("Fetch CourseProgress Api Response : ",response);

            const completed = response?.data?.data?.completedVideos || [];

            // Extract only _id values
            const ids = completed.map(item => item._id);

            console.log("Completed Lecture IDs:", ids);
            setMarkedLectures(ids);
        }

        fetchCourseProgress();

    },[courseEntireData])

  return (
    <div className='text-richblack-5 mt-10 w-full'>

        {/* For Back and review Button */}
        <div className='w-full flex justify-between items-center md:pr-0 pr-2'>

            <div className='bg-richblack-300 w-[30px] h-[30px] md:mt-0 mt-2 text-black rounded-full ml-2 flex justify-center items-center cursor-pointer'
                onClick={() => navigate(-1)}
            >
                <MdKeyboardArrowLeft fontSize={30}/>
            </div>

            <button onClick={() => setCreateReviewModal(true)} className='bg-yellow-100 md:mt-0 mt-3 md:ml-0 ml-2 md:p-2 p-1 px-2 rounded-md md:px-3 text-black md:mr-6 font-semibold'>Add Review</button>

        </div>
        
        {/* For Heading and completedLecture part */}
        <div className='md:ml-5 ml-2 mt-5'>
            <p className='md:text-xl mb-1'>{courseEntireData?.courseName}</p>
            <p className='text-richblack-300 font-semibold'>{markedLectures?.length} / {totalNoOfLectures}</p>
        </div>

        {/* For Underline Part */}
        <div className='md:w-[85%] mt-5 border-b border-richblack-400 md:ml-5 ml-2'></div>

        {/* For Section and SubSections */}
        <div>
            {
                courseSectionData.map((section,index) => (
                    // Section/SubSection Data
                    <div key={index} onClick={() => setActiveStatus(section._id)} >

                        {/* Section Data */}
                        <div className='bg-richblack-600 w-full text-sm flex flex-col mt-2 md:p-3 py-2'>
                            <div className='w-[92%] mx-auto flex justify-between items-center'>
                                <p>{section?.sectionName}</p>
                                <i
                                    className={
                                        activeStatus.includes(section._id) ? 'rotate-180' : 'rotate-0'
                                    }
                                >
                                    <FaAngleUp/>
                                </i>

                            </div>
                        </div>

                        <div>
                            {/* Mujhe wahi subSection dikhane hai jo currently meo section pr hu */}
                            {
                                activeStatus === section._id && (
                                    <div>
                                        {
                                            section.subSection.map((subSec,index) => (
                                                <div key={index} className={`${videobarActive === subSec._id ? 'bg-yellow-300 text-black' : 'bg-richblack-900 text-richblack-5'}`}
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSec?._id}`
                                                    )
                                                    setVideoBarActive(subSec?._id);
                                                }}
                                                
                                                >

                                                    <div className='w-[90%] md:p-2 py-2 flex items-center gap-x-2 mx-auto'>
                                                        <input 
                                                            type='checkbox'
                                                            checked={markedLectures?.includes(subSec?._id)}
                                                            onChange={() => {}}
                                                        />
                                                        <span className='text-sm'>{subSec.title}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>


                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default ViewCourseSidebar