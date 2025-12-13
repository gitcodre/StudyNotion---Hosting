import React, { useEffect, useState } from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules';
import { apiConnector } from '../../services/apiConnector'
import { ratingEndpoints } from '../../services/api_url'
import toast from 'react-hot-toast'
import ReactStars from 'react-stars'
import { FaRegStar,FaStar } from "react-icons/fa";

const ReviewSlider = () => {
    const{GETALLRATING_API} = ratingEndpoints;
    const [reviews,setReviews] = useState([]);
    const [loading,setLoading] = useState(false);
    const fetchReview = async() => {
        setLoading(true);
        try{
            const response = await apiConnector('GET',GETALLRATING_API);
            console.log('Review Response :',response);
            if(!response.data.success)
            {
                throw new Error(response?.data?.message);
            }
            setReviews(response?.data?.allReviews);
        }
        catch(err)
        {
            console.error('Review not Fetched error : ',err);
            toast.error('Unable To Fetch Review');
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchReview();
    },[])
    useEffect(() => {
        console.log('Review : ',reviews);
    })

    if (loading) {
        return (
            <div className="text-center text-richblack-5 py-8">
                Loading Reviews...
            </div>
        );
    }
    
    // Check 1: If loading is false, check if the reviews array is empty
    if (reviews.length === 0) {
        return (
            <div className="text-center text-richblack-5 text-xl font-semibold py-8">
                No reviews found yet.
            </div>
        );
    }

  return (
    <div className='text-richblack-5'>
        <Swiper
            slidesPerView={4}
            loop={reviews.length > 3}
            spaceBetween={25}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            {
                reviews.map((review,index) => (
                    <SwiperSlide key={index}>
                        <div className='bg-richblack-800 p-2 rounded-md h-[12rem]'>
                            {/* User image and name */}
                            <div className='flex gap-x-2 items-center'>
                                <img 
                                    src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`} 
                                    alt='Profile Pic'
                                    className='w-12 h-12 rounded-full object-cover'/>
                                <div>
                                    <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                                    <p>{review?.course?.courseName}</p>
                                </div>
                            </div>
                            {/* Underline */}
                            <div className='mt-5 border-b border-richblack-300'></div>
                            
                            {/* Review */}
                            <div className='mt-4'>
                                {review?.review.split(' ').splice(0,15).join(' ')}
                            </div>

                            {/* Rating */}
                            <div className='flex items-center gap-x-3 mt-2'>
                                <p>{review?.rating.toFixed(1)}</p>
                                <ReactStars 
                                    count={5}
                                    value={review?.rating}
                                    size={24}
                                    edit={false}
                                    color2='#ffd700'
                                    emptyIcon={<FaRegStar/>}
                                    fullIcon={<FaStar/>}
                                />

                            </div>
                            
                        </div>

                    </SwiperSlide>
                ))
            }
        </Swiper>

    </div>
  )
}

export default ReviewSlider