import React, { useEffect } from 'react'
import Course_Card from './Course_Card'
import { Swiper,SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules';

const CourseSlider = ({Courses}) => {
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={25}
                    centeredSlides={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination]}
                    // breakpoints={{
                    //     1024:{slidesPerView:1}
                    // }}
                    className="mySwiper"
                >
                    {
                        Courses?.map((course,index) => (
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={'h-[350px]'}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ):(
                <div className='text-richblack-5 flex justify-center mt-10 text-2xl'>
                    No Courses Found
                </div>
            )
        }
    </>
  )
}

export default CourseSlider