import React from 'react'
import Spanner from '../HomePage/Spanner';
import Button from '../HomePage/Button';
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
        "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: 'Rating "Auto-grading"',
    description:
        "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
        "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },

];

const LearningGrid = () => {
  return (
    <div className='bg-richblack-900  py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-4 w-11/12 max-w-maxContent mx-auto'>
            {
                LearningGridArray.map((card) => {
                    return (
                        <div key={card.order}
                            className={` ${card.order < 0 && 'col-span-2'}
                                ${(card.order & 1) === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                                ${card.order === 3 && 'col-start-2'}
                            `}
                        >
                            {
                                card.order < 0 ? (
                                    <div className='bg-richblack-900 lg:h-[250px] flex flex-col pl-5'>
                                        <h2 className='text-3xl'>{card.heading}</h2>

                                        <p className='text-3xl pb-2'><Spanner text={card.highlightText}/></p>

                                        <p className='text-richblack-300 w-[80%] pb-[3rem] leading-relaxed'>{card.description}</p>

                                        <div className='w-fit'>
                                            <Button active={true} linkto={card.BtnLink}>  
                                                {card.BtnText}
                                            </Button>
                                        </div>
                                    </div>
                                ) : 
                                (
                                    <div className='lg:h-[250px] flex flex-col p-7 gap-8 '>
                                        <h2 className='font-semibold text-[1.1rem] w-[72%]'>{card.heading}</h2>
                                        <p className='text-richblack-100 leading-relaxed'>{card.description}</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default LearningGrid