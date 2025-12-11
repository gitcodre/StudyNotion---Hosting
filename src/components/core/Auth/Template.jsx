import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frameImg from '../../../assets/Images/frame.png'
import Spinner from '../../common/Spinner'
import { useSelector } from 'react-redux'

const Template = ({title,desc1,desc2,image,formType}) => {
    const { loading } = useSelector((state) => state.auth);

  return (
    <div className='bg-richblack-900'>
        {
            (loading) ? <Spinner/> :
            <div className='mt-14 w-11/12 flex justify-between max-w-maxContent mx-auto py-12 gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12'>

                {/* Left Side */}
                <div className='w-11/12 max-w-[450px] mx-auto'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        {title}
                    </h1>
                    <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                        <span className="text-richblack-100">{desc1}</span>{" "}
                        <span className="font-edu-sa font-bold italic text-blue-100">{desc2}</span>
                    </p>
                    {formType === 'signup' ? <SignupForm/> : <LoginForm/>}
                </div>

                {/* Right Side */}
                
                <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <img
                    src={frameImg}
                    alt="Pattern"
                    width={558}
                    height={504}
                    loading="lazy"
                    />
                    <img
                    src={image}
                    alt="Students"
                    width={558}
                    height={504}
                    loading="lazy"
                    className="absolute -top-4 right-4 z-10"
                    />
                </div>

            </div>   
               
        }
    </div>
  )
}

export default Template