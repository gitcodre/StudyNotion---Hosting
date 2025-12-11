import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children , active , linkto}) => {
  return (
    <Link to={linkto}>

        <div className={`mb-7 py-2 px-4 font-medium rounded-md 
        ${active ? 'bg-yellow-50 text-richblack-800':'bg-richblack-800 text-white'} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>

    </Link>
  )
}

export default Button