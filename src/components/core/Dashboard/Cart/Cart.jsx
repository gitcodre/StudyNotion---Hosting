import React from 'react'
import {useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
  const {totalItems,totalAmount} = useSelector((state) => state.cart);
  return (
    <div className='md:w-[75%]'>
      <h1 className='text-richblack-5 mt-[4.5rem] text-3xl'>My Wishlist</h1>
      <p className='text-richblack-400 text-sm mt-[2.5rem]'>
        {totalItems } Courses in Wishlist
      </p>
      <div className='border-b border-richblack-500 border-dotted my-2'></div>
      <div className='w-full'>
        {
          totalAmount > 0 ? (
            <div className='md:flex lg:gap-x-20 md:gap-x-10'>
              <div className='md:w-[70%] w-[95%]'>
                <RenderCartCourses/>
              </div>
              <div className='md:w-[30%] w-[95%] md:mb-0 mb-10'>
                <RenderTotalAmount/>
              </div>
            </div>
          ) : (
            <div className='text-richblack-5 w-full min-h-screen -mt-[10rem] flex justify-center items-center'>
              <p className='md:text-4xl text-3xl bg-gradient-to-r from-blue-50 to-blue-300 bg-clip-text text-transparent'>Your Cart is Empty</p>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Cart

