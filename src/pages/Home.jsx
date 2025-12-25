import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import Spanner from '../components/core/HomePage/Spanner';
import Button from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import HomeExplore from '../components/core/HomePage/HomeExplore';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <>
      <div className='flex flex-col text-white justify-between items-center w-full h-full'>
      
        {/* Section 1 */}
        <div className='w-full md:w-9/12 mx-auto mt-[6rem] '>
          {/* Become an Instructor */}
          <div className="flex justify-center mb-[3rem]">
            <Link
              to="/signup"
              className="group border-pure-greys-100 border-b-[0.8px] rounded-full px-6 py-2 bg-richblack-700 text-pure-greys-50 flex items-center gap-3 justify-center transition-all duration-200 hover:scale-95"
            >
              <p>Become an Instructor</p>
              <FaArrowRightLong />
            </Link>
          </div>

          <div className='text-center text-4xl'>
            <p>Empower Your Future with <Spanner text={'Coding Skills'}></Spanner></p>
          </div>

          <div className='w-full md:pl-[8rem] md:pr-[9rem] text-pure-greys-200 mt-3 text-center'>
            <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
          </div>

          <div className='flex justify-center items-center gap-7 mt-8 '>
            <Button active={true} linkto={'/signup'}>
              Learn More
            </Button>

            <Button active={false} linkto={'/login'}>
              Book a Demo
            </Button>
          </div>

          {/* Video */}
          <div className='mx-14 my-7 shadow-[15px_15px_0_#ffffff]'>
            <video
              muted
              loop
              autoPlay>
              <source src={Banner} type='video/mp4'></source>
            </video>
          </div>

            {/* Code Section 1 */}
          <div className='w-full lg:p-0 lg:pl-14'>
              <CodeBlocks
                backgroundGradient={'bg-gradient-ellipse-1'}
                position={"md:flex-row flex-col "}
                heading={
                  <div className='lg:w-full lg:text-[4xl] text-[2xl] w-[300px] font-semibold'>
                    Unlock your <Spanner text={'coding potential '}/>
                    with our online courses.
                  </div>
                }
                subheading={
                  <div className='lg:w-full w-[300px]'>
                    Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                  </div>
                }
                ctabtn1={
                  {
                    text: 'Try it Yourself',
                    linkto: '/signup',
                    active:true,
                  }
                }
                ctabtn2={
                  {
                    text: 'Learn More',
                    linkto: '/login',
                    active:false,
                  }
                }
                codeblock={
                  `<!DOCTYPE html> 
                  <html>  
                  head><title>Example</  
                  title><linkrel="stylesheet"href="styles.css">  
                  /head> 
                  body>  
                  h1><ahref="/">Header</a> 
                  /h1>                  
                  nav><ahref="one/">One</a><ahref="two/">Two</ 
                  a><ahref="three/">Three</a> 
                  /nav>`
                }
                codeColor={'text-yellow-25'}
              />
          </div>

          {/* Code Section 2 */}
          <div className='md:w-[100%] w-11/12 lg:p-0 lg:pl-14'>
              <CodeBlocks 
                backgroundGradient={'bg-gradient-ellipse-2'}
                position={"md:flex-row-reverse flex-col"}
                heading={
                  <div className='lg:w-full lg:text-[4xl] text-[2xl] w-[200px] font-semibold'>
                    Start <Spanner text={'coding in seconds'}/>
                  </div>
                }
                subheading={
                  <div className='lg:w-full w-[300px]'>
                    Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                  </div>
                }
                ctabtn1={
                  {
                    text: 'Continue Lesson',
                    linkto: '/signup',
                    active:true,
                  }
                }
                ctabtn2={
                  {
                    text: 'Learn More',
                    linkto: '/login',
                    active:false,
                  }
                }
                codeblock={
                  `<!DOCTYPE html> 
                  <html>  
                  head><title>Example</  
                  title><linkrel="stylesheet"href="styles.css">  
                  /head> 
                  body>  
                  h1><ahref="/">Header</a> 
                  /h1>                  
                  nav><ahref="one/">One</a><ahref="two/">Two</ 
                  a><ahref="three/">Three</a> 
                  /nav>`
                }
                codeColor={'text-yellow-25'}
              />
          </div> 

          {/* Tags Section */}
          <HomeExplore/>

        </div>


        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
          {/* Set Background white image */}
          <div className='homepage_bg h-[310px] w-screen'>

            <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>

              <div className='w-full flex justify-center items-center gap-5 py-[10rem]'>
                <Button active={true} linkto={'/signup'}>
                  <div className='flex items-center gap-2'>
                    <p className='font-semibold'>Explore Full Catalog</p>
                    <FaArrowRightLong/>
                  </div>
                </Button>

                <Button active={false} linkto={'/login'}>
                  Learn More
                </Button>
              </div>

            </div>

          </div>
          
          <div className='mb-20 w-11/12 max-w-maxContent mx-auto flex flex-col'>

            <div className='md:flex md:gap-5 pt-[5rem]'>

              {/* Left Section */}
              <div className='md:w-[50%] w-full'>
                <p className='text-4xl font-bold'>
                  Get the skills you need for a <Spanner text={'job that is in demand.'}/>
                </p>
              </div>
              {/* Right Section */}
              <div className='md:w-[50%] w-full'>
                <div className='flex flex-col gap-12 items-start'>
                  <p className='pr-14 font-medium'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
  
                  <Button active={true} linkto={'/login'}>
                      <p className='font-bold'>Learn More</p>
                  </Button>

                </div>
              </div>

            </div>

            <TimelineSection/>

            <LearningLanguageSection />

          </div>

        </div>

        {/* Section 3 */}
        <div className='py-20 w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900'>

          <InstructorSection/>

          <h2 className='text-4xl mt-10 text-center text-richblack-100 mb-5'>Reviews from other learners</h2>
          {/* Review Slider Here */}
          <ReviewSlider/>

        </div>

      </div>
      
      {/* Footer */}
      <Footer/>
    </>
  )
}

export default Home