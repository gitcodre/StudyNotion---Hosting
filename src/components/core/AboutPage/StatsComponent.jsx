import React from 'react'

const stats = [
    {
        id:1,
        number:'5K',
        text:'Active Students',
    },
    {
        id:2,
        number:'10+',
        text:'Mentors',
    },
    {
        id:3,
        number:'200+',
        text:'Courses',
    },
    {
        id:4,
        number:'50+',
        text:'Awards',
    }
]
const StatsComponent = () => {
  return (
    <div className='bg-richblack-700 pb-20'>
        <div className='w-11/12 max-w-maxContent mx-auto text-richblack-5 flex justify-evenly  items-center pt-20'>
            {
                stats.map((data) => (
                    <div className='flex flex-col items-center justify-center gap-2' key={data.id}>
                        <p className='text-3xl font-bold'>{data.number}</p>
                        <p className='text-richblack-300'>{data.text}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default StatsComponent