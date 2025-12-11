import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constant';
import Tab from '../../common/Tab';
import { setSignUpData } from '../../../slice/authSlice';
import { sendOtp } from '../../../services/operations/auth_api';
import {toast} from 'react-hot-toast'
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // student or instructor
  const[accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const[showPassword,setShowPassword] = useState(false);
  const[showConfirmPassword,setShowConfirmPassword] = useState(false);
  const[formData,setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name] : e.target.value,
    }))
  }

  const{
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = formData;

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignUpData(signupData));
    dispatch(sendOtp(formData.email,navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={submitHandler} className='text-richblack-5'>
          <div className='flex gap-x-4'>
            <label className='w-[100%]'>
              <p>First Name <sup className="text-pink-200">*</sup></p>
              <input
                className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                required
                type='text'
                placeholder='Enter first name'
                name='firstName'
                value={firstName}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                onChange={changeHandler}
              /> 
            </label>

            <label className='w-[100%]'>
              <p>Last Name <sup className="text-pink-200">*</sup></p>
              <input
                className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                required
                type='text'
                placeholder='Enter last name'
                name='lastName'
                value={lastName}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                onChange={changeHandler}
              /> 
            </label>
          </div>
          
          <label>
              <p>Email Address <sup className="text-pink-200">*</sup></p>
              <input
                className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                required
                type='email'
                placeholder='Enter email address'
                name='email'
                value={email}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                onChange={changeHandler}
              /> 
          </label>

          <div className='flex gap-x-4'>

            <label className='relative'>
              <p>Create Password <sup className="text-pink-200">*</sup></p>
              <input
                required
                className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter Password'
                name='password'
                value={password}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                onChange={changeHandler}
              /> 

              <span className='absolute top-[2.5rem] -translate-x-8' onClick={() => setShowPassword
                ((prev) => !prev)}>
                          {showPassword ? <IoMdEye fontSize={24}/> : 
                          <FaEyeSlash fontSize={24}/>}
              </span>

            </label>

            <label className='relative'>
              <p>Confirm Password <sup className="text-pink-200">*</sup></p>
              <input
                required
                className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm Password'
                name='confirmPassword'
                value={confirmPassword}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                onChange={changeHandler}
              /> 

              <span className='absolute top-[2.5rem] -translate-x-8' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                          {showConfirmPassword ? <IoMdEye fontSize={24}/> : 
                          <FaEyeSlash fontSize={24}/>}
              </span>

            </label>

          </div>

          <button
            type="submit"
            className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
            Create Account
          </button>

      </form>
    </div>
  )
}

export default SignupForm