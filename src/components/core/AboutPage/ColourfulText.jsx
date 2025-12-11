import React from 'react'
import Spanner from '../HomePage/Spanner'

const ColourfulText = () => {
  return (
    <div className='flex items-center justify-center pt-60 w-[50%] text-center mx-auto text-richblack-100'>
        <span className='text-2xl'>
            <span className='text-richblack-600 text-4xl'>" </span>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <Spanner text={' combines technology'}/> 
            ,<span className='bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent'>expertise</span>, and community to create an 
            <span className='bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'> unparalleled educational experience.<span className='text-richblack-600 text-4xl'> "</span></span>
        </span>
         
    </div>
  )
}

export default ColourfulText