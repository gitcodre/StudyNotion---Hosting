import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course,Height}) => {
    // Jo bhi stars aayenge na rating mei uska average nikal ke dega so ye caluclation karega to ye utils wale folder mei logic rahega iska
    const [avgRatingCount,setAvgRatingCount] = useState(0);
    useEffect(() => {
        // course?.ratingAndReview mei saare review ke id present honge array ki form mei 
        const count = GetAvgRating(course?.ratingAndReview);
        setAvgRatingCount(count);
    },[course])

  return (
    <div className='text-richblack-5'>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className='mb-5'>
                    <img
                        src={course?.thumbnail}
                        alt='Course Thumbnail'
                        className={`${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>{course?.courseName}</h2>
                    <p className='text-sm text-richblack-200'>Instructor : {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex gap-x-2'>
                        <p>{avgRatingCount || 0}</p>
                        <RatingStars Review_Count={avgRatingCount}/>
                        <p>{course?.ratingAndReview.length} Ratings</p>
                    </div>
                    {/* Price */}
                    <p>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card