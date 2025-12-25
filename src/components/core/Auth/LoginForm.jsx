import React, { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/auth_api';

// Component
//    ↓
// dispatch(login(email, password, navigate))
//    ↓
// login(...) returns a function
//    ↓
// Thunk middleware sees a function → calls it
//    ↓
// Your async code runs inside
//    ↓
// You call dispatch(setToken(...))
//    ↓
// Redux reducers update state
//    ↓
// UI re-renders with new state

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name] : e.target.value,
    }))
  }
  const {email,password} = formData;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password,navigate));
  }

  return (
      <form onSubmit={submitHandler}
        className='text-richblack-5 pt-20'>
          {/* Email Address */}
          <label className='w-[100%]'>
            <p>Email Address <sup className="text-pink-200">*</sup></p>
            <input
              className='bg-richblack-800 mt-2 mb-4 w-full p-2 rounded-md outline-none'
              required
              type='email'
              name='email'
              value={email}
              placeholder='Enter email address'
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              onChange={changeHandler}/>
          </label>
          {/* Password */}
          <label className='w-[100%] relative'>
            <p>Password <sup className="text-pink-200">*</sup></p>
            <input
              className=' w-full bg-richblack-800 mt-2 p-2 rounded-md outline-none'
              required
              type={(showPassword) ? 'text' : 'password'}
              name='password'
              value={password}
              placeholder='Enter Password'
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              onChange={changeHandler}/>

            <span className='absolute top-[5.2rem] -left-[2rem]' onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <IoMdEye fontSize={24}/> : 
              <FaEyeSlash fontSize={24}/>}
            </span>

            <Link to='/forgot-password'> 
              <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>Forgot password</p>
            </Link>

          </label>

          {/* SignIn  */}
          <button
            type="submit"
            className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
            Sign In
          </button>
      </form>
    
  )
}

export default LoginForm