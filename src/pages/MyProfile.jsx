import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { LiaEdit } from "react-icons/lia";
import GenericBtn from '../components/common/GenericBtn';
const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const [showImage, setShowImage] = useState(false);
    const navigate = useNavigate();
    
    console.log('User Gender : ',user.additionalDetails);
  return (
    <div className='min-h-screen md:w-7/12 w-[65%] max-w-maxContent text-richblack-5 flex flex-col mx-auto mt-12'>
        <h2 className='mb-12 text-3xl'>My Profile</h2>
        {/* Profile */}
        <div className='bg-richblack-800 border border-transparent rounded-md md:flex justify-between p-5 md:py-10  items-center mb-[4rem]'>
            {/* Left Side */} 
            <div className='md:flex gap-x-3 items-center'>

                <img src={user?.image} alt={`user image : ${user?.firstName}`}
                onClick={() => setShowImage(true)}
                className='w-[78px] mx-auto md:mb-0 mb-5 aspect-square rounded-full object-cover cursor-pointer'/>

                <div className='md:mb-0 mb-5 md:text-start text-center'>
                    <p>
                        {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className='text-richblack-300'>{user?.email}</p>
                </div>

            </div>
            {/* Right Side */}
            <GenericBtn 
                text={'Edit'}
                onclick={() => {navigate('/dashboard/settings')}}
                customClasses={'flex gap-2 items-center bg-yellow-50 text-richblack-900 h-[2rem] p-2 rounded-md text-bold md:mx-0 mx-auto'}
            >
                <LiaEdit/>
            </GenericBtn>

        </div>
        {/* About */}
        <div className='bg-richblack-800 border border-transparent rounded-md md:flex justify-between p-5 md:py-10 items-center mb-[4rem]'>
            {/* Left Side */}
            <div className='md:flex flex-col gap-4 pl-3 md:mb-0 mb-[3rem]'>
                <p className='mb-6 md:text-start text-center'>About</p>
                <p className='text-richblack-200 md:text-base text-center'>
                    {user?.additionalDetails?.about ?? 'Write Something About Yourself'}
                </p>
            </div>
            {/* Right Side */}
            <button onClick={() => {navigate('/dashboard/settings')}}
                className='flex gap-2 items-center bg-yellow-50 text-richblack-900 h-[2rem] p-2 rounded-md text-bold -translate-y-[2rem] md:mx-0 mx-auto'    
            >
                Edit
                <span><LiaEdit/></span>
            </button>
        </div>
        {/* Personal Details */}
        <div className='bg-richblack-800 border border-transparent rounded-md md:flex justify-between p-5 md:py-10 items-center mb-[4rem]'>
            {/* Left Side */}
            <div className='flex flex-col gap-4 pl-3 pb-4'>
                <p className='font-bold mb-6'>Personal Details</p>

                <div className='md:flex md:mb-0 mb-[2rem] gap-28'>
                    {/* Left Part */}
                    <div className='flex flex-col gap-y-6 md:mb-0 mb-5'>
                        <div className='flex flex-col gap-y-1'>
                            <p className='text-richblack-300'>First Name</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <p className='text-richblack-300'>Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <p className='text-richblack-300'>Gender</p>
                            <p>{user?.additionalDetails?.gender ?? 'Add Gender'}</p>
                        </div>      
                    </div>

                    {/* Right Part */}
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-1'>
                            <p className='text-richblack-300'>Last Name</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <p className='text-richblack-300'>Phone Number</p>
                            <p>{user?.additionalDetails?.contactNumber ?? 'Add Contact Number'}</p>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <p className='text-richblack-300'>Date of Birth</p>
                            <p>{user?.additionalDetails?.dateOfBirth ?? 'Add your DoB'}</p>
                        </div>
                    </div>

                </div>

            </div>
            {/* Right Side */}
            <button onClick={() => {navigate('/dashboard/settings')}}
                className='flex gap-2 items-center bg-yellow-50 text-richblack-900 h-[2rem] p-2 rounded-md text-bold md:-translate-y-[8rem] md:ml-0 ml-[0.8rem]'
            >
                Edit
                <span><LiaEdit/></span>
            </button>

        </div>

        {/* After Cliking Image modal open */}

        {showImage && (
            // Fixed creates a overlay or glass of the document which is mainly used for creating modal and all inset-0 means top bottom left right all 0 and z-1000 tells that overlay will be top of all 
            // Whatever inside this fixed will behave like a overlay
            <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000]"
                onClick={() => setShowImage(false)}
            >

            <div
                className="relative"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                src={user?.image}
                className="max-w-[60vw] max-h-[60vh] rounded-xl object-contain"
                />

                <button
                onClick={() => setShowImage(false)}
                className="absolute -top-4 -right-4 bg-white text-black w-8 h-8 rounded-full font-bold flex items-center justify-center"
                >
                ✕
                </button>

            </div>

            </div>
        )}

    </div>
  )
}

export default MyProfile