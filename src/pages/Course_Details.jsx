import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/StudentFeaturesApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseDetails } from '../services/operations/course_api';
import GetAvgRating from '../utils/avgRating';
import { PiClubLight } from 'react-icons/pi';
import Spinner from '../components/common/Spinner';
import Confirmationmodal from '../components/common/Confirmationmodal';
import RatingStars from '../components/common/RatingStars';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { formatDate } from '../services/formatDate';
import { CiGlobe } from "react-icons/ci";
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import CourseAccordianBar from '../components/core/Course/CourseAccordianBar';



const Course_Details = () => {
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const {loading} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {paymentLoading} = useSelector((state) => state.course);
    const[courseData,setCourseData] = useState(null);
    const[averageRating,setAverageRating] = useState(0);
    const[totalNoOfLectures,setTotalNoOfLectures] = useState(0);
    const[confirmationModal,setConfirmationModal] = useState(null);

    const[isActive,setIsActive] = useState(Array(0));

    const handleActive = (id) => {
        console.log('Id : ',id);
        setIsActive(
            !isActive.includes(id) ? 
                isActive.concat([id]) : 
                isActive.filter((e) => e!= id)
        )
        
    }

    const fetchCourseDetails = async() => {
        try{
            const Course = await getCourseDetails(courseId); 
            if(Course)
            {
                setCourseData(Course);
            }
        }
        catch(err)
        {
            console.error('Error in fetching course : ',err);
        }
    }

    useEffect(() => {
        fetchCourseDetails();
    },[courseId]);

    useEffect(() => {
        const count = GetAvgRating(courseData?.ratingAndReview) || 0;
        setAverageRating(count);
    },[])

    useEffect(() => {
        let lectures = 0;
        courseData?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0;
        })
        setTotalNoOfLectures(lectures);
    },[courseData]);
    

    if(loading || !courseData)
    {
        return(
            <Spinner/>
        )
    }

    const handleBuyCourse = () => {
        if(token)
        {
            buyCourse([courseId],user,navigate,dispatch);
            return;
        }
        setConfirmationModal({
            text1:'Your are not Logged in ',
            text2:'Please Login to Purchase the Course',
            btntext1:'Login',
            btntext2:'Cancel',
            btn1Handler:() => {navigate('/login')},
            btn2Handler:() => {setConfirmationModal(null)},
        })
    }


  return (
    <div className='w-full text-richblack-5 pb-20'>

        <div className='bg-richblack-700'>

            <div className='lg:w-10/12 relative mx-auto'>

                <div className='py-20 pl-5 flex flex-col gap-y-2'>
                    
                    <h2 className='text-3xl font-semibold '>My Course</h2>
                    <p className='text-richblack-200'>
                        {
                            courseData?.courseDescription.length > 20 ? 
                            courseData.courseDescription.slice(0,30) : 
                            courseData?.courseDescription
                        }
                    </p>
                    <div className='flex gap-x-2 items-center'>
                        <p>{averageRating}</p>
                        <RatingStars Review_Count={averageRating}/>
                        <p className='md:text-base text-sm'>({courseData?.ratingAndReview.length || 0} reviews)</p>
                        <p className='md:text-base text-sm'>{courseData?.studentEnrolled.length || 0} students Enrolled</p>
                    </div>
                    <p>Created By {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}</p>
                    <p className='flex gap-x-2 items-center'>
                        <IoMdInformationCircleOutline/>
                        <div className='md:text-base text-sm'>Created at {formatDate(courseData?.createdAt)}</div>
                        <div className='flex items-center gap-x-2 md:text-base text-sm'>
                            <CiGlobe/> English
                        </div>
                    </p>

                </div>

                <div>
                    <CourseDetailsCard 
                        courseData={courseData} 
                        handleBuyCourse={handleBuyCourse} 
                        setConfirmationModal={setConfirmationModal}
                    />
                </div>

            </div>

        </div>

        <div className='w-10/12 lg:mx-auto lg:pl-0 pl-5'>

            <div className='md:w-[60%] py-10 flex flex-col gap-y-3 pl-5 mt-12 border border-blue-200 border-dotted'>
                <h2 className='text-3xl'>What you'll learn</h2>
                <p className='text-richblack-200'>
                {
                    courseData?.whatYouWillLearn.length > 30 ? 
                    courseData.whatYouWillLearn.slice(0,20) : 
                    courseData?.whatYouWillLearn
                }
                </p>
            </div>

            <div className='mt-10'>

                <h2 className='text-3xl md:mb-0 mb-5'>Course Content</h2>

                <div className='md:w-[60%] w-[450px] md:flex justify-between items-center'>
                    <div className='mt-2 flex gap-x-2 md:mb-0 mb-2'>
                        <p>{courseData?.courseContent.length} Sections</p>
                        <p>{totalNoOfLectures} lecture(s)</p>
                        <p>2h 18m total length</p>
                    </div>
                    <button className='text-yellow-100 w-fit '
                        onClick={() => setIsActive([])}
                    >
                        Collapse all sections
                    </button>
                </div>

                {/* Section Subsection */}
                <div>
                    {
                        courseData?.courseContent.map((course,index) => (
                            <CourseAccordianBar 
                                course={course}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))
                    }
                </div>

            </div>

        </div>



        {confirmationModal && <Confirmationmodal modalData={confirmationModal}/>}
    </div>
  )
}

export default Course_Details