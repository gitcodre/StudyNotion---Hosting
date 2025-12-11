import React from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { useState } from 'react'
import Spanner from './Spanner';
import CourseCard from './CourseCard';
const tabName = [
    'Free',
    'New to coding',
    'Most popular',
    'Skills paths',
    'Career paths'
];
// Or 
// const tabName = HomePageExplore.map(item => item.tag);
// ['Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths']


const HomeExplore = () => {
    const [currentTab,setCurrentTab] = useState(tabName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);

    // This is to show which course is selected so that to apply yellow shadow 
    const [courseCard,setCourseCard] = useState(HomePageExplore[0].courses[0].heading);

    // Now setTab function
    const setMyTab = (value) => {
        // Suppose naye tab pe click kiya to kya kya changes aayenge
        // value mei new tab diya rahega 
        setCurrentTab(value);
        // Ab mera tab change ho gya to course bhi change ho jana chaiye 
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCourseCard(result[0].courses[0].heading);
        // .find can also be used instead of filter the difference is that .filter will always return array as an answer whereas .find will directly give me answer not in array format so we dont have to index it for returning it in case of .find
        // const result = HomePageExplore.find(course => course.tag === value);
        // setCourses(result.courses);
        // setCourseCard(result.courses[0].heading);


        // Ab uska selected card first one aayega
 
    }
    return (
    <div className='relative w-full flex flex-col items-center mt-[10rem]'>

        <h2 className='font-bold text-4xl'>Unlock the <Spanner text={'Power of Code'} /></h2>
        <p className='text-richblack-50 pt-2 pb-5'>Learn to Build Anything You Can Imagine</p>
        
        {/* Tabs Ayyenge */}
        <div className='flex w-[60%] justify-between items-center  bg-richblack-800 border-richblack-100  rounded-full p-2 px-6'>
        {

            tabName.map((tab,index) => {
                return (
                    <div key={index} className={` text-[16px] ${(tab === currentTab) ? 
                    'bg-richblack-900 text-richblack-5 font-medium px-5' :'text-richblack-200 px-5'} rounded-full 
                    transition-all duration-200 cursor-pointer hover:bg-richblack-900 px-4 py-2`} 
                    onClick={() => setMyTab(tab)}
                    >
                        {tab}
                    </div>
                )
            })
        }
        </div>

        <div className='lg:h-[290px]'></div>
        <div className='absolute translate-y-44 pt-8 pb-28 flex gap-10 justify-between'>
            {
                courses.map((course,index) => {
                    return (
                        <CourseCard
                            key={index}
                            cardData={course}
                            currentCard={courseCard}
                            setCurrentCard={setCourseCard}

                        />
                    )
                })
            }
        </div>

    </div>
  )
}

export default HomeExplore