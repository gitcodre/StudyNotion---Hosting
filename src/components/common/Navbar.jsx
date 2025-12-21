import React, { useEffect, useRef, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../utils/constant'
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { getCategory } from '../../services/operations/auth_api'
import { MdKeyboardArrowDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Navbar = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state => state.profile));
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();
    const [subLinks,setSubLinks] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the menu is open and the click is NOT inside the menuRef
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);
    // Close menu when location changes (navigating to a new page)
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    const fetchSubLinks = async() =>
    {
        const response = await getCategory();
        if(response.length > 0){
            setSubLinks(response);
        }
        console.log('Response : ',response);
    }
    useEffect(() => {
        fetchSubLinks();
    },[] );
    

    return (
        <div className='w-full h-14 border-b-[1px] border-richblack-600 bg-richblack-800'>

        <div className='w-11/12 h-14 mx-auto max-w-maxContent flex justify-between items-center'>

            {/* Section 1 */}
            <Link to="/">
                <img src={logo} width={160} height={42} alt='StudyNotionLogo' loading='lazy'/>
            </Link>

            {/* Section 2 */}
            <nav className='hidden md:block'>
                <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                    <div className='relative flex items-center group z-10'>
                                        <p>{link.title}</p>
                                     <p><MdKeyboardArrowDown/></p>

                                        <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[30%] flex flex-col rounded-md bg-richblack-800 p-4 text-richblack-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                            
                                            <div className=' absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-800'></div>

                                            {
                                                subLinks.length ? (
                                                        subLinks.map((link,index) => (
                                                            <Link to={`/catalog/${link.name.split(" ").join('-').toLowerCase()}`} key={index}>
                                                                <p className='py-3 px-2 rounded-md hover:shadow-lg hover:shadow-richblack-800 hover:bg-richblack-500'>
                                                                    {link.name}
                                                                </p>
                                                            </Link>
                                                        ))
                                                ) : (<div></div>) 
                                            }

                                        </div>
                                    </div>

                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>  
                                    </Link>
                                )
                            }
                        </li> 
                    ) )
                }
                </ul>
            </nav>

            {/* Section 3 Login Signup Dashboard*/}
            <div className='text-white flex items-center'>
                <div className='flex gap-x-5 items-center'>
                    {/* For Cart */}
                    <div>
                        {
                            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                                <Link to='/dashboard/cart' className='relative'>
                                    <FaShoppingCart width={30} className='relative'/>
                                    {
                                        totalItems > 0 && (
                                            <span className='absolute bottom-1 right-5 bg-caribbeangreen-100 rounded-full w-6 h-6 text-center text-richblack-900
                                            animate-bounce
                                            '>
                                                {totalItems}
                                            </span>
                                        )
                                    }
                                </Link>
                            )
                        }
                    </div>
                    {/* DropDown Icon */}
                    <div>
                        {
                            token !== null && <ProfileDropDown/>
                        }
                    </div>

                </div>

                <div className='hidden md:flex gap-5 '>
                    {/* For Login */}   
                    {
                        token === null && (
                            <Link to='/login'>
                                <button className='border border-richblack-600 bg-richblack-800 px-[15px] py-[6px] text-richblack-50 rounded-md transition-all duration-200 hover:scale-95'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {/* For Signup */}
                    {
                        token === null && (
                            <Link to='/signup'>
                                <button className='border border-richblack-600 bg-richblack-800 px-[15px] py-[6px] text-richblack-50 rounded-md transition-all duration-200 hover:scale-95'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                </div>

                <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <GiHamburgerMenu fontSize={24} fill="#AFB2BF"/>
                </button>

            </div>

        </div>

        {isMenuOpen && (
            <div ref={menuRef} className='absolute right-4 top-14 z-[1000] w-[200px] rounded-md border border-richblack-700 bg-richblack-800 p-4 shadow-2xl md:hidden'>
                <ul className='flex flex-col gap-y-3 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                    <div className='relative flex items-center group z-10'>
                                        <p>{link.title}</p>
                                        <p><MdOutlineKeyboardArrowLeft/></p>

                                        <div className='invisible absolute -left-[85%] top-[20%] flex flex-col rounded-md bg-richblack-800 p-4 text-richblack-5 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                            
                                            <div className=' absolute left-[80%] top-3 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-800'></div>

                                            {
                                                subLinks.length ? (
                                                        subLinks.map((link,index) => (
                                                            <Link to={`/catalog/${link.name.split(" ").join('-').toLowerCase()}`} key={index}>
                                                                <p className='py-3 px-2 rounded-md hover:shadow-lg hover:shadow-richblack-800 hover:bg-richblack-500'>
                                                                    {link.name}
                                                                </p>
                                                            </Link>
                                                        ))
                                                ) : (<div></div>) 
                                            }

                                        </div>
                                    </div>

                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>  
                                    </Link>
                                )
                            }
                        </li> 
                    ) )
                }
                </ul>

                {/* Login / Signup buttons inside dropdown for mobile */}
                {token === null && (
                    <div className='flex flex-col gap-y-4 mt-5'>
                        <Link to='/login' onClick={() => setIsMenuOpen(false)}>
                            <button className='w-full border border-richblack-600 bg-richblack-700 py-[6px] text-richblack-50 rounded-md'>
                                Log in
                            </button>
                        </Link>
                        <Link to='/signup' onClick={() => setIsMenuOpen(false)}>
                            <button className='w-full border border-richblack-600 bg-richblack-700 py-[6px] text-richblack-50 rounded-md'>
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}

            </div>
        )}

    </div>
  )
}

export default Navbar


