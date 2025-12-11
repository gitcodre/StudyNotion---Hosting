import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/auth_api';
import { IoMdTimer } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

const VerifyEmail = () => {
    const {loading,signupData} = useSelector((state) => state.auth);
    const[otp,setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData)
        {
            navigate('/signup');
        }
    })
    
    const handleOnSubmit = (e) => {
        e.preventDefault();

        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
        } = signupData;

        dispatch(signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate));
    }
  return (
    <div>
        {
            loading ? <Spinner/> : (
                <div className='text-richblack-5 w-[508px] h-[448px]  mt-28  mx-auto flex flex-col justify-center gap-y-2'> 

                    <h2 className='text-2xl pl-1'>Verify Email</h2>

                    <p className='text-richblack-100 pl-2 my-2 text-sm pr-[10rem]'>A verification code has been sent to you. Enter the code below</p>

                    <form onSubmit={handleOnSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} 
                            className='bg-richblack-700 w-[10%] px-5 py-3 mx-3 rounded-md 
                            text-richblack-5 text-center'
                            style={{ color: "#F1F2FF" }}
                            />}
                            
                        />
                        <button type='submit' className='bg-yellow-50 text-richblack-900 
                        w-[92%] p-2 rounded-md mt-5 mb-3'>
                            Verify email
                        </button>
                    </form>

                    <div className='flex justify-between '>
                        <NavLink to={'/login'}>
                            <div className='flex gap-x-2 items-center'>
                                <FaArrowLeftLong/>
                                <span className='text-richblack-5'>
                                    Back to login
                                </span>
                            </div>
                        </NavLink>
                        
                        <button className='flex items-center gap-2 pr-10' onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
                            <IoMdTimer/>
                            Resend it
                        </button>
                    </div>

                </div>

            )
        }
    </div>
  )
}

export default VerifyEmail