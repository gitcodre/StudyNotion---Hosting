import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { NavLink, useLocation } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetPassword } from '../services/operations/auth_api';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const[formData,setFormData] = useState({
        password:'',
        confirmPassword:'',
    }) 
    const{loading} = useSelector((state) => state.auth);

    const changeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    const{password,confirmPassword} = formData;
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }
  return (
    <div>
        {
            loading ? <Spinner/> : (
                <div className='text-richblack-5 md:translate-x-[8rem] md:w-[40%] md:ml-auto ml-[2rem] flex flex-col mx-auto md:mt-[13rem] mt-[5rem] max-w-maxContent'>
                    <h1 className='text-2xl'>Choose new password</h1>
                    <p className='text-richblack-100 my-2 md:w-[60%]'>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={resetPasswordHandler}>
                        {/* New Password */}
                        <label>
                            <p>New password <sup className="text-pink-200">*</sup></p>
                            <input
                                className='md:w-[80%] bg-richblack-800 p-2 rounded-md my-3'
                                required
                                type='password'
                                name='password'
                                value={password}
                                placeholder='Enter your password'    
                                onChange={changeHandler}
                            />

                        </label>
                        {/* Confirm New Password */}
                        <label>
                            <p>Confirm new password <sup className="text-pink-200">*</sup></p>
                            <input
                                className='md:w-[80%] bg-richblack-800 p-2 rounded-md  my-2'
                                required
                                type='password'
                                name='confirmPassword'
                                value={confirmPassword}
                                placeholder='Enter your password'    
                                onChange={changeHandler}
                            />
                        </label>
                        {/* Reset Password Button */}
                        <div>
                            <button className='bg-yellow-50 text-richblack-900 w-[80%] p-2 rounded-md mt-5 mb-3' type='submit'>
                                Reset Password
                            </button>
                        </div>

                    </form>

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

export default UpdatePassword