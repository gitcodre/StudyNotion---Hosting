import React, { useEffect } from 'react'
import { FaRegStar,FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeToCart } from '../../../../slice/cartSlice';
const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const removeFromCart = (course) => {
        console.log('Course : ',course);
        dispatch(removeToCart(course));
    }
    return (
        <div className='text-richblack-5 mt-4 flex flex-col gap-y-4'>
            {
                cart.map((course,index) => (
                    <div key={index}>
                        <div className='flex justify-between mb-4'>
                            {/* Left Part */}
                            <div className='flex gap-x-4'>
                                <img src={course?.thumbnail} alt='thumbnailimg'
                                    className='w-[12rem] rounded-md'
                                />
                                <div>
                                    <p>{course?.courseName}</p>
                                    <p className='text-richblack-400'>Instructor : {course?.instructor?.firstName} {course?.instructor?.lastName}</p>                     
                                    <p>Category : {course?.category[0]?.name}</p>
                                    <div className='flex gap-x-2 items-center'>
                                        <span>4.8</span>
                                        <ReactStars 
                                            count={5}
                                            size={20}
                                            edit={false}
                                            color2='#ffd700'
                                            emptyIcon={<FaRegStar/>}
                                            fullIcon={<FaStar/>}
                                        />
                                        <span>{course?.ratingAndReview?.length} Ratings</span>
                                    </div>
                                </div>
                            </div>
                            {/* Right Part */}
                            <div className='flex flex-col gap-y-4'>

                                <button 
                                    className='flex gap-x-2 text-pink-200 bg-richblack-800 border border-richblack-700 rounded-md p-2 px-3'
                                    onClick={() => removeFromCart(course)}
                                >
                                    <RiDeleteBin6Line fontSize={25}/>
                                    <span className='text-red'>Remove</span>
                                </button>

                                <div className='text-3xl text-yellow-50'>
                                    <span>Rs. {course?.price}</span>
                                </div>
                            </div>
                        </div>
                        {
                            index !== cart.length-1  &&
                            <div className=' border-b border-richblack-500 border-dotted my-2'></div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses;
