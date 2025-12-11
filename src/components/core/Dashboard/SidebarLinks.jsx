import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, NavLink, useLocation } from 'react-router-dom';
const SidebarLinks = ({link,iconName}) => {
    const Icon  = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) =>
    {
        return matchPath({path:route} , location.pathname);
    }

  return (
    <NavLink to={link?.path} className={`${matchRoute(link.path) ? 
    'bg-yellow-800 border-l-[0.2rem] border-yellow-50 text-yellow-50' : 'bg-richblack-800'} text-richblack-300 p-2`}>

        <div className='pl-2 flex gap-x-2 items-center'>
            <Icon className='text-lg'/>
            <span>{link.name}</span>
        </div>
        
    </NavLink>
  )
}

export default SidebarLinks