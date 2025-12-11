import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../common/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../services/operations/auth_api'
import SidebarLinks from './SidebarLinks'
import {VscSignOut} from 'react-icons/vsc'
import Confirmationmodal from '../../common/Confirmationmodal'
const Sidebar = () => {
    const {user,loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);
    if(authLoading || profileLoading)
    {
        return(<Spinner/>);
    }
  return (
    <div className='bg-richblack-800 text-richblack-5 w-[15%] min-h-screen flex flex-col border-r-[1px] border-r-richblack-700 py-10 '>
        {
            sidebarLinks.map((link) => {
               if(link.type && link.type !== user.accountType) return null;
               return(
                    <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
               )
            })
        }

        {/* Underline */}
        <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>

        {/* Setting and Logout */}
        <div className='flex flex-col '>

            <SidebarLinks 
                link={{name:'Settings',path:'/dashboard/settings'}}
                iconName='VscSettingsGear'
            />

            {/* Logout */}
            <button
                className='pl-4 mt-2 text-richblack-300'
                onClick={() => {setConfirmationModal({
                    text1:'Are you sure?',
                    text2:'You will be logged out of your account',
                    btntext1:'Logout',
                    btntext2:'Cancel',
                    btn1Handler: () => {dispatch(logout(navigate))},
                    btn2Handler: () =>{setConfirmationModal(null)},
                })}}
            >
                <div className='flex items-center gap-x-2'>
                    <VscSignOut />
                    <span>Logout</span>
                </div>
            </button>

        </div>

        {confirmationModal && <Confirmationmodal modalData={confirmationModal}/> }
    </div>
  )
}

export default Sidebar