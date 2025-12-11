import React from 'react'
import ContactusForm from '../ContactusPage/ContactusForm'

const FeedbackForm = () => {
  return (
    <div className='pt-10 text-richblack-5 w-[11/12] max-w-maxContent mx-auto flex flex-col justify-center items-center'>
        <h2 className='text-3xl pb-2'>Get in Touch</h2>
        <p className='text-richblack-300 pb-10'>We’d love to here for you, Please fill out this form.</p>
        <ContactusForm/>
    </div>
  )
}

export default FeedbackForm