import React from 'react'
import Spanner from '../components/core/HomePage/Spanner'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import ColourfulText from '../components/core/AboutPage/ColourfulText'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import FeedbackForm from '../components/core/AboutPage/FeedbackForm'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'
const AboutUs = () => {
  return (
    <div className='text-richblack-5'>


        <section className='relative bg-richblack-800'>

            {/* Section 1 */}
            <section className='w-11/12 max-w-max-content mx-auto flex flex-col justify-center items-center pb-52'>
                <p className='mt-16 mb-6 text-richblack-200'>About us</p>
                <h2 className='text-center text-3xl md:w-[45%] w-full'>Driving Innovation in Online Education for a 
                    <Spanner text={' Brighter Future'}/>
                </h2>

                <p className='text-center md:w-[55%] w-full text-richblack-300 pt-4 md:pb-6 md:mb-0 -mb-[15rem]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

                <div className='flex flex-col md:flex-row gap-5 md:absolute lg:bottom-[40rem] md:bottom-[30rem]md:translate-y-0 translate-y-[20rem]'>
                    <img src={aboutus1} alt='aboutus1Img' className="md:w-[280px] lg:w-auto w-full"></img>
                    <img src={aboutus2} alt='aboutus2Img' className="md:w-[280px] lg:w-auto w-full"></img>
                    <img src={aboutus3} alt='aboutus3Img' className="md:w-[280px] lg:w-auto w-full"></img>
                </div>
            </section>

            {/* Section 2 */}
            <section className='bg-richblack-900 pb-36 '>
                <ColourfulText/>
            </section>

        </section>

        {/* Horizontal Rule */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] mb-10 -translate-y-10">  
        </div>

        {/* Section 3 */}
        <section>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-20 pb-20'>
                {/* Top */}
                <div className='md:flex gap-10'>

                    {/* Left Side */}
                    <div className='flex flex-col gap-3 md:w-[50%] md:pl-[4rem]'>
                        <h2 className='text-3xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent '>Our Founding Story</h2>
                        <p className='text-richblack-300 w-[80%]'>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='text-richblack-300 w-[80%]'>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>
                    {/* Right Side */}
                    <div>
                        <img src={FoundingStory} alt='foundingStoryImg' className='mt-10'></img>
                    </div>

                </div>

                {/* Bottom */}
                <div className='md:flex gap-14'>
                    {/* Left Side */}
                    <div className='flex flex-col gap-5 md:w-[50%] md:pl-[4rem] md:mb-0 mb-[2rem]'>

                        <h2 className='text-3xl bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'>Our Vision</h2>

                        <p className='text-richblack-300 md:w-[80%]'>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>

                    </div>
                    {/* Right Side */}
                    <div className='flex flex-col gap-5 md:w-[50%] '>

                        <h2 className='text-3xl bg-gradient-to-r from-[#1FA2FF]
                        via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>
                            Our Mission
                        </h2>

                        <p className='text-richblack-300 w-[80%]'>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 4 */}
        <section>
            <StatsComponent/>
        </section>

        {/* Section 5 */}
        <section>
            <LearningGrid/>
            <FeedbackForm/>
        </section>

        {/* Section 6 */}
        <section className='mt-16 w-10/12 mx-auto pb-10 mb-10'>
            <div className='text-center text-4xl pb-14'>
                Reviews from other learners
            </div>
            {/* <ReviewSlider/> */}
            <ReviewSlider />
        </section>

        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default AboutUs