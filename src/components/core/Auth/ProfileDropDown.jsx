import React, { useState,useRef,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { logout } from '../../../services/operations/auth_api';
import { TbLogout2 } from "react-icons/tb";


const ProfileDropDown = () => {
  const dropref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen,setIsOpen] = useState(false);
  const {user} = useSelector((state) => state.profile);

  const DropDownHandler = (e) => {
    e.stopPropagation(); // prevent bubbling up to document click
    setIsOpen(!isOpen);
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropref.current && !dropref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    // “Hey React, when I’m gone, please call this function.”
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className='relative flex items-center cursor-pointer gap-x-1 text-white z-10'>

      {/* Profile Image and DownArrow  */}
      <div
        onClick={DropDownHandler}
        className="flex items-center cursor-pointer gap-x-1"
      >
        <img src={user?.image}  alt='userImage' className='rounded-full w-[25px] aspect-square object-cover'></img>
        <MdKeyboardArrowDown/>
      </div>

        {/* DropDown Box When Clicked */}
      {
        (isOpen) && (
          <div 
            ref={dropref}
            
            className='lg:w-[16rem] absolute top-full -right-3 mt-6 bg-richblack-800 px-3 py-5 rounded-md shadow-lg border-2 border-transparent flex flex-col gap-2 text-richblack-5'>
               <div className=' absolute left-[68%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-800'></div>

              <Link className='flex items-center gap-3 transition-all duration-200 px-5 py-3 rounded-md hover:shadow-lg  hover:shadow-richblack-800 hover:bg-richblack-500' to='/dashboard/my-profile'>
                <MdOutlineDashboardCustomize />
                <p >My Dashboard</p>
              </Link>

              <button onClick={() => {dispatch(logout(navigate))}}
                    className="flex items-center gap-3 px-5 py-3 rounded-md hover:shadow-lg hover:shadow-richblack-800 hover:bg-richblack-500"
                >
                  <TbLogout2/>
                  Logout
              </button>

          </div>
        )
      }

    </div>
  )
}

export default ProfileDropDown

