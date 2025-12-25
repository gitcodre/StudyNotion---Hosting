import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Button from './Button'
import Spanner from './Spanner'
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex ${position} md:mx-0 mx-[1rem] my-20 justify-between lg:gap-20 gap-10`}>
      
      {/* {Section 1} */}
      <div className='w-[50%] flex flex-col gap-2'>
        {/* Heading */}
        <div className='text-[2.1rem] pr-10'>
          {heading}
        </div>
        {/* SubHeading */}
        <div className='pr-[4.5rem] text-pure-greys-200'>
          {subheading}
        </div>
        {/* Buttons */}
        <div className='flex text-white gap-5 mt-12'>
          <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
            {/* This is children in Button Component */}
            <div className='flex gap-2 text-black font-medium items-center'>
              {ctabtn1.text}
              <FaArrowRightLong/>
            </div>
          </Button>

          <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
                {ctabtn2.text}
          </Button>

        </div>
      </div>

      {/* Section 2 */}
      <div className='lg:w-[50%] w-full flex bg-gradient-to-br from-[#0E1A2D] to-[#111E32] relative'>
        <div className={`absolute w-[400px] h-[260px] -top-10 -left-10 ${backgroundGradient}`}></div>

        {/* Numbering */}
        <div className='lg:pl-6 pl-2 flex flex-col items-center w-[10%] text-richblack-400 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Code Create */}
        <div className={`flex flex-col lg:w-[90%] font-bold font-mono ${codeColor}`}>

          <TypeAnimation
            sequence={[codeblock,3000,'']}
            repeat={Infinity}
            cursor={true}
            style={
              {
                whiteSpace: 'pre-line',
                display:'block'
              }
            }
            omitDeletionAnimation={true}
          />


        </div>
      </div>

    </div>
  )
}

export default CodeBlocks