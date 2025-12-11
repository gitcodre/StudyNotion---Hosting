import React from 'react'
import {useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
  const {totalItems,totalAmount} = useSelector((state) => state.cart);
  return (
    <div className='w-[75%]'>
      <h1 className='text-richblack-5 mt-[4.5rem] text-3xl'>My Wishlist</h1>
      <p className='text-richblack-400 text-sm mt-[2.5rem]'>
        {totalItems } Courses in Wishlist
      </p>
      <div className='border-b border-richblack-500 border-dotted my-2'></div>
      <div className='w-full'>
        {
          totalAmount > 0 ? (
            <div className='flex gap-x-20 justify-between'>
              <div className='w-[70%]'>
                <RenderCartCourses/>
              </div>
              <div className='w-[30%]'>
                <RenderTotalAmount/>
              </div>
            </div>
          ) : (
            <div className='text-richblack-5 w-full min-h-screen -mt-[10rem] flex justify-center items-center'>
              <p className='text-4xl bg-gradient-to-r from-blue-50 to-blue-300 bg-clip-text text-transparent'>Your Cart is Empty</p>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Cart

