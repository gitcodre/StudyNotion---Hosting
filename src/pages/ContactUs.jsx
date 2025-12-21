import React from 'react'
import { IoIosChatboxes } from "react-icons/io";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import ContactusForm from '../components/core/ContactusPage/ContactusForm';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

const ContactUs = () => {
  return (
    <div>
        <div className='w-11/12 max-w-maxContent mx-auto mt-20 md:flex justify-between'>

            <div className='bg-richblack-800 md:w-[35%] flex flex-col gap-10 md:mb-0 mb-[5rem] text-richblack-5 p-8 rounded-md pr-[8rem] h-fit'>

                {/* Chat on us */}
                <div className='flex gap-4'>
                    <IoIosChatboxes className='text-richblack-100 text-2xl'/>
                    <div>
                        <p className='text-[1rem] leading-1'>Chat on us</p>
                        <p className='text-richblack-200'>Our friendly team is here to help.</p>
                        <p className='text-richblack-200'>@mail address</p>
                    </div>
                </div>
                {/* Visit us */}
                <div className='flex gap-4'>
                    <FaEarthAfrica className='text-richblack-100 text-2xl'/>
                    <div>
                        <p className='text-[1rem] leading-1'>Visit us</p>
                        <p className='text-richblack-200'>Come and say hello at our office HQ.</p>
                        <p className='text-richblack-200'>Here is the location/ address</p>
                    </div>
                </div>
                {/* Call us */}
                <div className='flex gap-4'>
                    <IoCall className='text-richblack-100 text-2xl'/>
                    <div>
                        <p className='text-[1rem] leading-1'>Call us</p>
                        <p className='text-richblack-200'>Mon - Fri From 8am to 5pm</p>
                        <p className='text-richblack-200'>+123 456 7890</p>
                    </div>
                </div>

            </div>

            <div className='lg:w-[58%] md:w-[60%] flex flex-col md:p-10 p-5 gap-2 text-richblack-5 border border-richblack-600'>
                <h2 className='text-3xl md:w-[80%] '>Got a Idea? We’ve got the skills. Let’s team up</h2>
                <p className='text-richblack-300 mb-4'>
                    Tall us more about yourself and what you’re got in mind.
                </p>
                <ContactusForm/>
            </div>
         
        </div>

        <section className='w-10/12 mx-auto mt-16 pb-20'>
            <div className='text-center text-richblack-5 text-4xl mb-14'>
                Reviews from other learners
                {/* <ReviewSlider/> */}
            </div>
            <ReviewSlider/>
        </section>

        {/* Footer */}
        <Footer/>

    </div>
  )
}

export default ContactUs