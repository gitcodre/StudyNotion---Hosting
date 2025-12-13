import React, { useEffect, useState } from 'react'
import ViewCourseSidebar from '../components/core/ViewCourse/ViewCourseSidebar'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { useDispatch } from 'react-redux';
import { getStudentFullCourseDetails } from '../services/operations/course_api';
import { setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slice/viewCourseSlice';

const ViewCourse = () => {
    const [createReviewModal,setCreateReviewModal] = useState(false);
    const {courseId} = useParams();
    const dispatch = useDispatch(); 
    const [markedLectures,setMarkedLectures] = useState([]);

    const getFullCourseDetails = async () => {
        const courseData = await getStudentFullCourseDetails(courseId);
        // console.log('Course Data API Response : ', courseData);
        // console.log('Course Details API Response : ', courseData?.courseDetails);
        // console.log('Course Section Details API Response : ', courseData?.courseDetails?.courseContent);
        // console.log('Course CompletedVideo Details API Response : ', courseData?.completedVideos);

        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));

        let lecture = 0;
        courseData?.courseDetails?.courseContent.forEach((sec) => {
            lecture += sec.subSection?.length || 0
        })
        dispatch(setTotalNoOfLectures(lecture));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    useEffect(() => {
        getFullCourseDetails();
    },[])
  return (
    <div>
        <div className='flex '>
            <div className='w-[20%] bg-richblack-800 min-h-screen '>
                <ViewCourseSidebar setCreateReviewModal={setCreateReviewModal} markedLectures={markedLectures} setMarkedLectures={setMarkedLectures}/>
            </div>

            <div className='w-[80%]'>
                <Outlet context={{ markedLectures, setMarkedLectures }}/>
            </div>
        </div>
        {/* Review Modal */}
        {
            createReviewModal && <CourseReviewModal setCreateReviewModal={setCreateReviewModal}/>
        }
    </div>
  )
}

export default ViewCourse