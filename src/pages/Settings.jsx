import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import CountryCode from '../data/countrycode.json'
import Spinner from '../components/common/Spinner';
import { changePassword, deleteProfile ,updateProfile} from '../services/operations/settings';
import GenericBtn from '../components/common/GenericBtn';
import ProfilePicture from '../components/core/Settings/ProfilePicture';


const Settings = () => {
  const [formData,setFormData] = useState({
    profession:'',
    dob:'',
    gender:'',
    phoneno:'',
    about:'',
    password:'',
    confirmPassword:'',
  });

  // It is used in cancel button
  const resetHandler = () => {
    setFormData({
    profession:'',
    dob:'',
    gender:'',
    phoneno:'',
    about:'',
  })}

  
  const[currentPassword,setCurrentPassword] = useState(false);
  const[newPassword,setNewPassword] = useState(false);
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile);
  
  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:e.target.value,
    }))
  }
  
  const{
    profession,
    dob,
    gender,
    phoneno,
    about,
    password,
    confirmPassword,
  } = formData;
  
  // use to delete the account
  async function deleteAccountHandler() {
    try {
      dispatch(deleteProfile(navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  // For Save button in form 
  async function formSubmitHandler(e){
    e.preventDefault();
    try{
      const { password, confirmPassword, dob, phoneno, ...rest } = formData;

      const updatedData = {
        ...rest,
        contactNumber: phoneno,
        dateOfBirth: dob,
      };
      dispatch(updateProfile(updatedData));
    }
    catch(err){
      console.log('Error : ',err.message);
    }
  }
  // For Save button in password 
  async function passwordChangeHandler(e){
    e.preventDefault();
    try {
      const pass = {
        oldPassword: password,
        newPassword: confirmPassword,
      }
      dispatch(changePassword(pass));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  // It is used so that data should stay even after refresh
  useEffect(() => {
  if (user) {
    setFormData({
      dob: user?.additionalDetails?.dateOfBirth?.split("T")[0] || "",
      about: user?.additionalDetails?.about || "",
      gender: user?.additionalDetails?.gender || "",
      phoneno: user?.additionalDetails?.contactNumber || "",
      profession: user?.additionalDetails?.profession || "",
    });
  }
}, [user]);
  
  return (
    <div className='w-full'>
      {/* Navigate Back */}
      <div>
        <button onClick={() => navigate(-1)}
          className='flex items-center mt-5 gap-x-1 text-richblack-300'  
        >
          <MdKeyboardArrowLeft/>
          Back
        </button>
        <h2 className='text-richblack-5 text-4xl mt-3'>Edit Profile</h2>
      </div>

      {/* Form Settings */}
      <div className='w-6/11 ml-20 '>

        {/* Profile Picture */}
        <div className=' w-[70%] bg-richblack-800 p-6 mt-10 rounded-md flex gap-x-4 items-center'>
          <ProfilePicture user={user}/>
        </div>
        

        {/* Profile Information */}
        <div className='w-[70%] bg-richblack-800 p-6 mt-10 rounded-md '>

          <p className='text-richblack-5'>Profile Information</p>

          <form onSubmit={formSubmitHandler}>
            <div className='flex flex-col'>
              {/* Name & Profession */}
              <div className='mt-5 flex gap-10'>

                <div className='flex flex-col w-[50%] text-richblack-5'>
                  <label htmlFor='name'>Display Name</label>
                  <input 
                    className='bg-richblack-700 text-richblack-200 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                    type='text'
                    name='name'
                    id='name'
                    value={`${user?.firstName || ""} ${user?.lastName || ""}`}
                    placeholder='Enter your name'
                    readOnly
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                  />
                </div>

                <div className='flex flex-col w-[50%] text-richblack-5'>
                  <label htmlFor='name'>Profession</label>
                  <input 
                    className='bg-richblack-700 text-richblack-200 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                    type='text'
                    name='profession'
                    id='profession'
                    value={profession}
                    placeholder='Your Profession'
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                  />
                </div>

              </div>

              <p className='text-richblack-500 -mt-2'>
                Name entered above will be used for all issued certifies.
              </p>
              
              {/* DOB & Gender */}
              <div className='mt-5 flex gap-10'>
                {/* DOB */}
                <div className='flex flex-col w-[50%] text-richblack-5'>
                  <label htmlFor='dob'>Date of Birth</label>
                  <input 
                    className='bg-richblack-700 mt-2 mb-4 w-full p-3 rounded-md outline-none text-richblack-200'
                    type='date'
                    name='dob'
                    value={dob || ''}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                  />
                </div>

                {/* Gender */}
                <div className='flex flex-col gap-x-3 w-[50%] text-richblack-5'>
                  <label htmlFor='gender'>
                    Gender <sup className="text-pink-200">*</sup>
                  </label>

                  <div className='flex justify-between bg-richblack-700 text-richblack-200 mt-2 mb-4 w-full p-3 rounded-md outline-none'>

                    <label className="flex items-center pl-2 gap-2 cursor-pointer">
                      <input
                        className='w-[15px] h-[15px]'
                        type='radio'
                        name='gender'
                        value='Male'
                        checked={gender === "Male"}
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        onChange={changeHandler}
                      />
                      <span className='text-[1.1rem] '>Male</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className='w-[15px] h-[15px]'
                        type='radio'
                        name='gender'
                        value='Female'
                        checked={gender === "Female"}
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        onChange={changeHandler}
                      />
                      <span className='text-[1.1rem]'>Female</span>
                    </label>


                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className='w-[15px] h-[15px]'
                        type='radio'
                        name='gender'
                        value='Other'
                        checked={gender === "Other"}
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        onChange={changeHandler}
                      />
                      <span className='text-[1.1rem] pr-3'>Other</span>
                    </label>

                  </div>

                </div>
                

              </div>

              {/* Phone no & About*/}
              <div className='mt-5 flex gap-10'>

                {/* Phone no */}
                <div className='text-richblack-5 w-[50%]'>
                  <label htmlFor='Phonenum'>Phone Number</label>
                  <br/>
                  <div className='flex gap-x-4'>

                    <select
                      className='bg-richblack-700 mt-2 mb-4 w-[20%] p-2 rounded-md outline-none text-richblack-200'
                      name='phoneno'
                      id='Phonenum'
                      defaultValue='+91'
                    >
                      {
                        CountryCode.map((element,index) => (
                          <option key={index} value={element.code}>
                            {element.code} -{element.country}
                          </option>
                        ))
                      }

                    </select>
                    {/* Phone no wali nput field */}
                    <input
                      type='text'
                      name='phoneno'
                      value={phoneno}
                      id='phonenumber'
                      placeholder='12345 67890'
                      maxLength={10}
                      onChange={(e) => {
                        // ✅ restricts user to only digits
                        const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
                        setFormData((prev) => ({
                          ...prev,
                          phoneno: digits,
                        }))
                      }}
                      className='bg-richblack-700 mt-2 mb-4 p-2 w-[80%] rounded-md outline-none text-richblack-200'
                    />
                  </div>
                  
                </div>

                {/* About */}
                <div className='flex flex-col w-[50%] text-richblack-5'>
                  <label htmlFor='aboutus'>About</label>
                  <input 
                    className='bg-richblack-700 text-richblack-200 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                    type='text'
                    name='about'
                    id='aboutus'
                    value={about}
                    placeholder='Enter Bio Details'
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    onChange={changeHandler}
                  />
                </div>
                

              </div>

            </div>  

              <div className='flex gap-x-3 mt-5 justify-end'>
                <GenericBtn text={'Cancel'} onclick={resetHandler} customClasses={'text-richblack-5 border-richblack-300 border-2 p-2 rounded-md'}/>
                <button type='submit' className='bg-yellow-200 p-2 px-4 border-richblack-5 border-1 rounded-md'>
                  Save
                </button>
              </div>

          </form>

        </div>

        
        {/* Password */}
        <div className='w-[70%] bg-richblack-800 p-6 my-10 rounded-md text-richblack-5'>

          <p className='mb-6 text-xl'>Password</p>

          <form onSubmit={passwordChangeHandler}>
            <div className='flex gap-x-4'>

                <label className='relative w-[50%]'>
                  <p>Current Password<sup className="text-pink-200">*</sup></p>
                    <input
                      required
                      className='bg-richblack-700 text-richblack-200 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                      type={currentPassword ? 'text' : 'password'}
                      placeholder='Enter Password'
                      name='password'
                      value={password}
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      onChange={changeHandler}
                    /> 
              
                    <span className='absolute top-[2.5rem] -translate-x-8' onClick={() => setCurrentPassword
                      ((prev) => !prev)}>
                        {currentPassword ? <IoMdEye fontSize={24}/> : 
                          <FaEyeSlash fontSize={24}/>}
                    </span>
              
                </label>

                <label className='relative  w-[50%]'>
                  <p>Change Password<sup className="text-pink-200">*</sup></p>
                    <input
                      required
                      className='bg-richblack-700 text-richblack-200 mt-2 mb-4 w-full p-2 rounded-md outline-none'
                      type={newPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      name='confirmPassword'
                      value={confirmPassword}
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      onChange={changeHandler}
                    /> 
              
                    <span className='absolute top-[2.5rem] -translate-x-8' onClick={() => setNewPassword((prev) => !prev)}>
                      {newPassword ? <IoMdEye fontSize={24}/> : 
                        <FaEyeSlash fontSize={24}/>}
                    </span>
              
                </label>
              
            </div>
            {/* Button */}
            <div className='flex gap-x-3 mt-5 justify-end'>
                <GenericBtn text={'Cancel'} onclick={() => resetHandler} customClasses={'text-richblack-5 border-richblack-300 border-2 p-2 rounded-md'}/>
                <button type='submit' className='bg-yellow-200 p-2 px-4 border-richblack-5 text-richblack-900 border-1 rounded-md'>
                  Change
                </button>
            </div>
          </form>

        </div>

        {/* Delete Account */}

        <div className='bg-pink-900 w-[70%] p-6 my-10 flex gap-x-4 rounded-md text-richblack-5'>
          <div className='w-10 h-10 rounded-full flex items-center justify-center bg-pink-700'>
            <RiDeleteBin6Line fontSize={25} color='red'/>
          </div>

          <div className='flex flex-col gap-2'>
            <p>Delete Account</p>
            <p className='text-pink-25 text-sm'>Would you like to delete account?</p>
            <p className='text-pink-25 text-sm w-[80%] -mt-2'>
              This account contains Paid Courses. Deleting your account will remove all the contain associated with it.
            </p>
            <div>
              {loading ? <Spinner /> : 
              <button onClick={deleteAccountHandler} className='text-pink-300'>
                I want to delete my account.
              </button>}
            </div>

          </div>

        </div>

      
      </div>

    </div>
  )
}

export default Settings