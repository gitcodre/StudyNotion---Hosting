import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading)
    {
        return(<Spinner/>);
    }
  return (
    <div className='flex gap-10 min-h-screen'>
        <Sidebar/>
        {/* “Render the child route here.” */}
        <Outlet/>
    </div>
  )
}

export default Dashboard