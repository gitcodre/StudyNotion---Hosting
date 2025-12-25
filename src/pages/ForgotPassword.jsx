import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { NavLink} from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { getPasswordResetToken } from '../services/operations/auth_api';
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const[emailPresent,setEmailPresent] = useState(false);
    const[email,setEmail] = useState('');
    const{loading} = useSelector((state) => state.auth);

    const changeHandler = (e) => {
        setEmail(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailPresent));
    }

  return (
    <div className='text-richblack-5'>
        {
            (loading) ? <Spinner/> : (
                <div className='md:w-[508px] md:h-[448px] md:pl-0 pl-10 mt-28 mx-auto flex flex-col justify-center gap-y-2 '>
                    
                    <h1 className='text-2xl'>
                        {!emailPresent? "Reset your password" : "Check email" }
                    </h1>

                    <p className='text-richblack-100 my-2 text-sm md:pr-[8rem] pr-[5rem]'>{!emailPresent ? "Have no fear. We’ll email you instructions to reset your password.If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}` }
                    </p>
                    
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailPresent && ( 
                                <label>
                                    <p className='text-richblack-5 text-sm'>Email Address 
                                        <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        className='w-[80%] bg-richblack-800 p-2 rounded-md my-2'
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={changeHandler}
                                        placeholder='Enter your email'
                                    />
                                </label>
                            )
                        }
                        <button className='bg-yellow-50 text-richblack-900 w-[80%] p-2 rounded-md mt-5 mb-3'
                            type='submit'   
                        >
                            {
                                !emailPresent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    
                    {/* Back to login */}
                    <NavLink to={'/login'}>
                        <div className='flex gap-x-2 items-center'>
                            <FaArrowLeftLong/>
                            <span className='text-richblack-5'>Back to login</span>
                        </div>
                    </NavLink>


                </div>
            )            
        }
    </div>
  )
}

export default ForgotPassword