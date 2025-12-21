import React from 'react'
import { MdOutlineArrowRight } from "react-icons/md";
import { FaRegShareSquare } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constant';
import { addToCart } from '../../../slice/cartSlice';

const CourseDetailsCard = ({courseData,handleBuyCourse,setConfirmationModal}) => {

    
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShare = () => {
        copy(window.location.href);
        toast.success('Link Copied to Clipboard');
    }

    const handleAddToCart = () => {
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR)
        {
            toast.error('You are an Instructor You Cannot Add Course');
            return;
        }
        if(user)
        {
            dispatch(addToCart(courseData));
            return;
        }
        setConfirmationModal({
            text1:"Your not Logged in",
            text2:"Please Login to Add to Cart",
            btntext1:"login",
            btntext2:"cancel",
            btn1Handler:() => navigate('/login'),
            btn2Handler:() => setConfirmationModal(null)
        })
    }

  return (
    <div className='md:absolute top-10 right-10'>

        <div className='bg-richblack-600 rounded-md p-3'>

            <img
                src={courseData?.thumbnail}
                className='lg:max-h-[300px] md:max-h-[250px] min-h-[180px] md:w-[400px] rounded-xl'
            />
            <p className='my-2 font-semibold'>Rs. {courseData?.price}</p>

            <div>
                {/* Buy Now */}
                <button
                    onClick={
                        user && courseData?.studentEnrolled.includes(user?.id)
                        ? ()=> navigate('/dashboard/enrolled-courses')
                        : handleBuyCourse
                    }
                    className='bg-yellow-50 p-2 w-full rounded-md text-richblack-900'
                >
                    Buy Now
                </button>
                <button 
                    onClick={handleAddToCart}
                    className='bg-richblack-800 p-2 w-full rounded-md text-richblack-5 font-semibold mt-4'
                >
                    Add to Cart
                </button>
            </div>

            <p className='mt-4 text-center text-sm items-center font-semibold'>30-Day Money-Back Guarantee</p>
            <h2 className='mt-2 font-semibold'>This Course Includes : </h2>

            <div className='-ml-2 text-blue-100'>
                {
                    courseData?.instructions.map((item,index) => (
                        <div className='flex items-center'>
                            <MdOutlineArrowRight fontSize={30} />
                            <p key={index} className='flex gap-2'>
                                <span>{item}</span>
                            </p>
                        </div>
                    ))  
                }
            </div>
            
            <div className='text-yellow-50 flex gap-x-2 w-fit mx-auto mt-1 font-semibold items-center'>
                <FaRegShareSquare/>
                <button
                    onClick={handleShare}
                >
                    Share
                </button>
            </div>

        </div>
        
    </div>
  )
}

export default CourseDetailsCard